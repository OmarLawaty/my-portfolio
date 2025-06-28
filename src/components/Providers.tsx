'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { system } from '../theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => <ChakraProvider value={system}>{children}</ChakraProvider>;
