'use client';

import { Box } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, type ComponentProps } from 'react';

const AnimatedBox = motion(Box);

interface GlowBlobProps extends ComponentProps<typeof AnimatedBox> {
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const GlowBlob = ({
  size = 300,
  color = 'rgba(168, 85, 247, 0.9)',
  duration = 10,
  delay = 0,
  ...props
}: GlowBlobProps) => {
  const controls = useAnimation();
  const [initialPos] = useState({
    x: getRandom(0, window.innerWidth - size),
    y: getRandom(0, window.innerHeight - size),
  });

  const animate = () => {
    controls.start({
      left: getRandom(0, window.innerWidth - size),
      top: getRandom(0, window.innerHeight - size),
      scale: getRandom(0.9, 1.2),
      opacity: getRandom(0.7, 1),
      transition: {
        duration,
        ease: 'easeInOut',
      },
    });
  };

  useEffect(() => {
    const startDelay = setTimeout(() => {
      animate();
      const interval = setInterval(animate, duration * 1000);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedBox
      position='absolute'
      width={`${size}px`}
      height={`${size}px`}
      borderRadius='full'
      bg={`radial-gradient(circle, ${color} 0%, transparent 70%)`}
      filter='blur(80px)'
      pointerEvents='none'
      zIndex={-1}
      initial={{
        left: initialPos.x,
        top: initialPos.y,
        opacity: 0,
        scale: 1,
      }}
      animate={controls}
      style={{ willChange: 'transform, opacity, top, left' }}
      {...props}
    />
  );
};

export const AmbientGlowBackground = () => (
  <Box position='fixed' inset='0' zIndex={-1} overflow='hidden'>
    <GlowBlob delay={0} display={['none', null, 'block']} />
    <GlowBlob delay={0} size={200} display={['block', null, 'none']} />
  </Box>
);
