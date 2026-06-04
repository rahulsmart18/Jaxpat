import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const lockPath = path.join(root, ".dev-server.lock");
const tracePath = path.join(root, ".next", "trace");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

async function devResponding(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/`, {
      signal: AbortSignal.timeout(3000),
    });
    return res.status > 0;
  } catch {
    return false;
  }
}

function unlockTraceIfStale() {
  try {
    if (!fs.existsSync(tracePath)) return;
    fs.accessSync(tracePath, fs.constants.W_OK);
  } catch {
    try {
      fs.rmSync(tracePath, { force: true });
    } catch {
      /* ignore */
    }
  }
}

async function acquireDevLock() {
  try {
    const fd = fs.openSync(lockPath, "wx");
    fs.writeFileSync(
      lockPath,
      JSON.stringify({
        wrapperPid: process.pid,
        startedAt: Date.now(),
      }),
    );
    fs.closeSync(fd);
    return true;
  } catch (e) {
    if (e?.code !== "EEXIST") throw e;
  }

  const port3000Up = await devResponding(3000);
  let lockMeta = null;
  try {
    lockMeta = JSON.parse(fs.readFileSync(lockPath, "utf8"));
  } catch {
    /* ignore */
  }

  const lockAgeMs = lockMeta?.startedAt
    ? Date.now() - lockMeta.startedAt
    : Number.POSITIVE_INFINITY;
  const lockFresh = lockAgeMs < 5 * 60 * 1000;

  if (port3000Up || lockFresh) {
    return false;
  }

  fs.rmSync(lockPath, { force: true });
  return acquireDevLock();
}

function releaseDevLock() {
  try {
    fs.rmSync(lockPath, { force: true });
  } catch {
    /* ignore */
  }
}

async function waitForPortDown(port) {
  while (await devResponding(port)) {
    await new Promise((r) => setTimeout(r, 1500));
  }
}

function printBlockedMessage() {
  console.error(
    "\n[dev] Dev server already running at http://localhost:3000.",
  );
  console.error(
    "[dev] Stop the other terminal (Ctrl+C) before npm run dev again.",
  );
  console.error(
    "[dev] Prevents port 3001+ and EPERM on .next\\trace.\n",
  );
}

async function main() {
  unlockTraceIfStale();

  const acquired = await acquireDevLock();
  if (!acquired) {
    printBlockedMessage();
    process.exitCode = 1;
    return;
  }

  const child = spawn(process.execPath, [nextBin, "dev"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", () => {
    /* Next CLI may exit while the dev server keeps running on Windows. */
  });

  child.on("error", (err) => {
    console.error("[dev] Failed to start Next.js:", err.message);
  });

  const stop = async () => {
    try {
      child.kill("SIGTERM");
    } catch {
      /* ignore */
    }
    await waitForPortDown(3000);
    releaseDevLock();
    process.exit(0);
  };

  process.on("SIGINT", () => {
    void stop();
  });
  process.on("SIGTERM", () => {
    void stop();
  });

  await new Promise(() => {});
}

main().catch((err) => {
  console.error("[dev]", err);
  process.exitCode = 1;
});
