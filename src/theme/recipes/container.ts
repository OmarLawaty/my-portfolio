import { defineRecipe } from '@chakra-ui/react';

export const container = defineRecipe({
  base: {
    py: ['0.5rem', '1rem', null, '2rem'],
    px: ['1.5rem', '3rem', null, '8rem'],
    m: '0',
    maxW: ['100%', '100%', null, '90rem'],
    flex: 1,
    display: 'flex',
    flexDir: 'column',
  },
});
