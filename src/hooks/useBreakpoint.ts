'use client';

import { useState, useEffect } from 'react';

interface Breakpoint {
  width: number;
  isPhone: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') {
    return { width: 1280, isPhone: false, isTablet: false, isMobile: false };
  }
  const w = window.innerWidth;
  return { width: w, isPhone: w < 768, isTablet: w >= 768 && w < 1100, isMobile: w < 1100 };
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    let raf: number | null = null;
    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setBp(getBreakpoint()));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return bp;
}
