'use client';

import type { ComponentProps } from 'react';
import NextLink from 'next/link';
import { Button, chakra } from '@chakra-ui/react';

import { getSearchParams } from '@/utils/helpers';

const forwardProps = ['href', 'prefetch', 'target', 'children'] as const satisfies (keyof NextLinkProps)[];
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

interface LinkProps extends Omit<ChakraNextLinkProps, ForwardProp>, Pick<NextLinkProps, ForwardProp> {
  keepSearchParams?: boolean;
  isDisabled?: boolean;
}

export const Link = ({ keepSearchParams, isDisabled, ...props }: LinkProps) => {
  const searchParams = getSearchParams();

  const href = keepSearchParams ? `${props.href}?${searchParams}` : props.href;

  if (isDisabled)
    return (
      <Button disabled bg='transparent' m='0' p='0' minH='auto' h='auto' minW='auto' w='auto' {...props}>
        {props.children}
      </Button>
    );

  return <ChakraNextLink {...props} href={href} />;
};
