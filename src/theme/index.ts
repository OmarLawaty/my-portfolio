import { createSystem, defineConfig, defaultConfig, defineRecipe } from '@chakra-ui/react';

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
    },
  },
  theme: {
    recipes: {
      container: defineRecipe({
        base: { p: ['0.5rem 1.5rem', '1rem 3rem', null, '2rem 12.5rem'], flex: 1, display: 'flex', flexDir: 'column' },
      }),
    },
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
