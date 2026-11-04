"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Safe client-side plugin registration with graceful error handling
if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  } catch (err) {
    console.warn("GSAP ScrollTrigger registration warning:", err);
  }
}

export { gsap, ScrollTrigger, useGSAP };
