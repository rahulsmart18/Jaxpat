export const LOADER_COMPLETE_EVENT = "porto:loader-complete";

/** Set when the intro finishes — consumers can read this if they mount after the event fired. */
let loaderCompleteDispatched = false;

export function hasLoaderCompleteDispatched() {
  return loaderCompleteDispatched;
}

/** Call when a new full intro cycle starts (before `dispatchLoaderComplete`). */
export function resetLoaderCompleteDispatched() {
  loaderCompleteDispatched = false;
}

export function dispatchLoaderComplete() {
  if (typeof window === "undefined") return;
  loaderCompleteDispatched = true;
  window.dispatchEvent(new CustomEvent(LOADER_COMPLETE_EVENT));
}
