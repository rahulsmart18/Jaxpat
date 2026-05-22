import { PRIMARY_LOGO } from "@/lib/brand-logos";

/** Images prefetched during the intro (Glenn-style asset counter). */
export const LOADER_ASSETS = [PRIMARY_LOGO, "/light.jpg", "/technology.jpg"] as const;

export function preloadLoaderAssets(
  onAssetProgress: (ratio: number) => void,
): Promise<void> {
  const total = LOADER_ASSETS.length;
  let loaded = 0;

  const bump = () => {
    loaded += 1;
    onAssetProgress(loaded / total);
  };

  return Promise.all(
    LOADER_ASSETS.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          const finish = () => {
            bump();
            resolve();
          };
          img.onload = finish;
          img.onerror = finish;
          img.src = src;
        }),
    ),
  ).then(() => undefined);
}
