/** Signals PageEntrance to run the post-loader reveal (per page load only). */
export const LOADER_FIRST_REVEAL_KEY = "jaxpat_first_reveal";

/** Legacy keys — cleared so the intro always runs on each visit. */
const LEGACY_SESSION_KEY = "jaxpat_loader_seen";
const LEGACY_LOCAL_KEY = "jaxpat_loader_at";

export function clearLoaderSkipFlags(): void {
  try {
    sessionStorage.removeItem(LEGACY_SESSION_KEY);
    localStorage.removeItem(LEGACY_LOCAL_KEY);
  } catch {
    /* private mode / blocked storage */
  }
}

/** Call when the user dismisses the intro (Enter / Skip). */
export function markLoaderComplete(): void {
  clearLoaderSkipFlags();
  try {
    sessionStorage.setItem(LOADER_FIRST_REVEAL_KEY, "1");
  } catch {
    /* ignore */
  }
}

/** True once right after the intro finishes; clears the flag. */
export function consumeFirstReveal(): boolean {
  try {
    if (sessionStorage.getItem(LOADER_FIRST_REVEAL_KEY) === "1") {
      sessionStorage.removeItem(LOADER_FIRST_REVEAL_KEY);
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}
