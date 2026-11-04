"use client";

/**
 * Diagnostic and Safe Mode utility.
 * Allows disabling specific subsystems via query parameters:
 *  - ?safe=1           -> Disables all animations, blurs, and dynamic background.
 *  - ?safe_gsap=1      -> Disables GSAP animations and ScrollTrigger.
 *  - ?safe_bg=1        -> Disables background decorative gradients.
 *  - ?safe_blur=1      -> Disables all backdrop-filters and blur effects.
 *  - ?safe_split=1     -> Disables SplitText DOM splitting and animation.
 */

export function getSafeModeParam(param: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("safe") === "1" || params.get("safe") === "true") return true;
    return params.get(param) === "1" || params.get(param) === "true";
  } catch {
    return false;
  }
}

export function isSafeGsap(): boolean {
  return getSafeModeParam("safe_gsap");
}

export function isSafeBg(): boolean {
  return getSafeModeParam("safe_bg");
}

export function isSafeBlur(): boolean {
  return getSafeModeParam("safe_blur");
}

export function isSafeSplit(): boolean {
  return getSafeModeParam("safe_split");
}

