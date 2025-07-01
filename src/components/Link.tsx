'use client';

import type { ComponentProps } from 'react';
import NextLink from 'next/link';
import { Button, chakra, type ButtonProps } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { getSearchParams } from '@/utils/helpers';

const forwardProps = [
  'href',
  'prefetch',
  'target',
  'children',
  'download',
  'ref',
] as const satisfies (keyof NextLinkProps)[];
type ForwardProp = (typeof forwardProps)[number];

const ChakraNextLink = chakra(
  NextLink,
  {},
  {
    shouldForwardProp: prop => forwardProps.includes(prop as ForwardProp),
  }
);
type NextLinkProps = ComponentProps<typeof NextLink>;
type ChakraNextLinkProps = ComponentProps<typeof ChakraNextLink>;

type LinkProps = {
  keepSearchParams?: boolean;
  href: ChakraNextLinkProps['href'];
} & (
  | ({ isDisabled: true } & ButtonProps)
  | ({ isDisabled?: false } & Omit<ChakraNextLinkProps, ForwardProp> & Pick<NextLinkProps, ForwardProp>)
);

export const Link = ({ keepSearchParams, ...props }: LinkProps) => {
  if ('isDisabled' in props && props.isDisabled)
    return (
      <Button disabled bg='transparent' m='0' p='0' minH='auto' h='auto' minW='auto' w='auto' {...props}>
        {props.children}
      </Button>
    );

  const searchParams = getSearchParams();
  const href = keepSearchParams ? `${props.href}?${searchParams}` : props.href;

  return <ChakraNextLink {...props} href={href} />;
};

const AnimatedChakraNextLink = motion.create(Link);
type AnimatedChakraNextLinkProps = ComponentProps<typeof AnimatedChakraNextLink>;

export const AnimatedLink = (props: LinkProps & Omit<AnimatedChakraNextLinkProps, 'target'>) => (
  <AnimatedChakraNextLink {...props} />
);
