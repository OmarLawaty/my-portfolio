import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

import { recipes } from './recipes';

const themeConfig = defineConfig({
  preflight: true,
  globalCss: {
    '*': {
      WebkitTapHighlightColor: 'transparent',
      scrollBehavior: 'smooth',
    },
    body: {
      backgroundColor: 'gray.900',
      color: 'gray.300',
      scrollbarGutter: 'stable',
      fontFamily: '"Raleway", sans-serif',
      minH: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: -2,
    },
  },
  theme: {
    recipes,
    tokens: {
      colors: {
        'gray.900': { value: '#0C0C0D' },
        'gray.800': { value: '#131313' },
        'gray.700': { value: '#272727' },
        'gray.400': { value: '#6F6F6F' },
        'gray.300': { value: '#C8C8C8' },
        'green.500': { value: '#5FB9B0' },
        'purple.300': { value: '#B292FF' },
        white: { value: '#FFFFFF' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, themeConfig);
