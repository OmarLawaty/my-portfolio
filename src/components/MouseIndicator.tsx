'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const MouseIndicator = () => {
  const backgroundColor = useMotionValue('transparent');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawScale = useMotionValue(1);
  const scale = useSpring(rawScale, {
    stiffness: 300,
    damping: 20,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = !!target.closest('a, button, [data-cursor="interactive"]');
      backgroundColor.set(interactive ? 'rgba(255, 255, 255, 0.3)' : 'transparent');
      rawScale.set(interactive ? 1.5 : 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
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
        aspectRatio: '1',
        borderRadius: '9999px',
        pointerEvents: 'none',
        zIndex: 99999,
        border: '2px solid white',
        mixBlendMode: 'difference',
        backgroundColor,
        scale,
        x: mouseX,
        y: mouseY,
        willChange: 'transform',
      }}
    />
  );
};
