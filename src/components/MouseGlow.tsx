'use client';

import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { isClient } from '@/utils/helpers';

export const MouseGlow = () => {
  const [hasMouseMoved, setHasMouseMoved] = useState(false);

  const mouseX = useMotionValue(isClient() ? window.innerWidth / 2 - 160 : 0);
  const mouseY = useMotionValue(isClient() ? window.innerHeight / 2 - 160 : 0);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 160);
      mouseY.set(e.clientY - 160);
      setHasMouseMoved(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <AnimatedBox
      display={['none', null, 'block']}
      position='fixed'
      top='0'
      left='0'
      w='20rem'
      aspectRatio='1'
      borderRadius='full'
      pointerEvents='none'
      bg='radial-gradient(circle,rgba(168, 85, 247, 0.4) 0%, rgba(0, 0, 0, 0) 70%)'
      zIndex='-1'
      initial={{ opacity: 0 }}
      animate={{ opacity: hasMouseMoved ? 1 : 0, scale: [0.9, 1.1, 0.9] }}
      transition={{
        opacity: { duration: 1 },
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
    />
  );
};

const AnimatedBox = motion.create(Box);
