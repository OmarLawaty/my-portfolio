'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { system } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>{children}</ChakraProvider>;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
