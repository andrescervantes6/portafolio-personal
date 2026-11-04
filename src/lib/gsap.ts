"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Safe client-side plugin registration with mobile optimizations
if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(ScrollTrigger, useGSAP);

    // Optimize ScrollTrigger for mobile devices:
    // ignoreMobileResize: true prevents URL bar show/hide on mobile from thrashing CPU with repeated refresh() calls
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });
  } catch (err) {
    console.warn("GSAP ScrollTrigger registration warning:", err);
  }
}

export { gsap, ScrollTrigger, useGSAP };
