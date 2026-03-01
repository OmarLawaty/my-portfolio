'use client';

import { forwardRef, type ComponentProps } from 'react';
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
  },
);
type NextLinkProps = ComponentProps<typeof NextLink>;
type ChakraNextLinkProps = ComponentProps<typeof ChakraNextLink>;

type BaseLinkProps = {
  keepSearchParams?: boolean;
};

type EnabledLinkProps = BaseLinkProps & {
  isDisabled?: false;
  href: ChakraNextLinkProps['href'];
} & Omit<ChakraNextLinkProps, ForwardProp> &
  Pick<NextLinkProps, ForwardProp>;

type DisabledLinkProps = BaseLinkProps & {
  isDisabled: true;
  href?: ChakraNextLinkProps['href'];
} & ButtonProps;

type LinkProps = EnabledLinkProps | DisabledLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  if (props.isDisabled)
    return (
      <Button disabled bg='transparent' m='0' p='0' minH='auto' h='auto' minW='auto' w='auto' {...props}>
        {props.children}
      </Button>
    );

  const { keepSearchParams, ...linkProps } = props as EnabledLinkProps;
  const searchParams = getSearchParams();
  const href = keepSearchParams ? `${linkProps.href}?${searchParams}` : linkProps.href;

  return <ChakraNextLink {...linkProps} href={href} ref={ref} />;
});

const AnimatedChakraNextLink = motion.create(Link);
type AnimatedChakraNextLinkProps = ComponentProps<typeof AnimatedChakraNextLink>;

export type AnimatedLinkProps = LinkProps & Omit<AnimatedChakraNextLinkProps, 'target'>;

export const AnimatedLink = (props: AnimatedLinkProps) => <AnimatedChakraNextLink {...props} />;
