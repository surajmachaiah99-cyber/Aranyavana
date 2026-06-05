'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;
    const dot = dotRef.current;
    if (!dot) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      dot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.classList.add('is-visible');
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.closest('a, button, input, textarea, select, [data-cursor="pointer"]') !==
        null;
      dot.classList.toggle('is-hover', isInteractive);
    };

    const onLeave = () => dot.classList.remove('is-visible');

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
