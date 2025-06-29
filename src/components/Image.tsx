'use client';

import NextImage from 'next/image';
import { chakra } from '@chakra-ui/react';
import type { ComponentProps } from 'react';

const forwardProps = [
  'src',
  'alt',
  'width',
  'height',
  'layout',
  'priority',
  'quality',
  'title',
  'onError',
  'loading',
  'fetchPriority',
] as const satisfies (keyof ComponentProps<typeof NextImage>)[];
type ForwardProp = (typeof forwardProps)[number];

export const Image = chakra(
  NextImage,
  {},
  {
    shouldForwardProp: props => forwardProps.includes(props as ForwardProp),
  }
);
