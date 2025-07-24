import { Box, Container } from '@chakra-ui/react';

import { Footer, Header, MouseIndicator, Providers, AmbientGlowBackground } from '@/components';

import { fonts } from './fonts';

const fontClassNames = fonts.map(font => font.className).join(' ');

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
  <html lang='en' className={fontClassNames}>
    <body>
      <Providers>
        <Container gap={[20, 24, 28, 36]}>
          <Header />

          {children}

          <Footer />
        </Container>

        <Box display={['none', null, 'block']}>
          <MouseIndicator />
        </Box>

        <AmbientGlowBackground />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
