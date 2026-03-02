'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const MouseIndicator = () => {
  const backgroundColor = useMotionValue('transparent');
  const height = useMotionValue('1.5rem');
  const opacity = useMotionValue(0);
  const hasMovedRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawScale = useMotionValue(1);
  const scale = useSpring(rawScale, {
    stiffness: 260,
    damping: 26,
  });

  const frameRef = useRef<number | null>(null);
  const latestXRef = useRef(0);
  const latestYRef = useRef(0);

  useEffect(() => {
    const updatePosition = () => {
      mouseX.set(latestXRef.current - 12);
      mouseY.set(latestYRef.current - 12);
      frameRef.current = null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        opacity.set(1);
      }

      latestXRef.current = e.clientX;
      latestYRef.current = e.clientY;

      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updatePosition);
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const interactive = !!target.closest('a, button, [data-cursor="interactive"]');
      const scrollable = target.closest('[data-cursor="scrollable"]');
      const scrolling = target.closest('[data-cursor="scrolling"]');

      backgroundColor.set(interactive || scrollable || scrolling ? 'rgba(255, 255, 255, 0.3)' : 'transparent');
      height.set((scrollable || scrolling) && !interactive ? '1rem' : '1.5rem');
      rawScale.set(interactive || scrolling ? 1.5 : 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '1.5rem',
        height,
        borderRadius: '9999px',
        pointerEvents: 'none',
        zIndex: 99999,
        border: '2px solid white',
        backgroundColor,
        opacity,
        scale,
        x: mouseX,
        y: mouseY,
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  );
};
