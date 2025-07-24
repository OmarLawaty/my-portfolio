import { Container } from '@chakra-ui/react';

import { Footer, Header, MouseGlow, Providers } from '@/components';

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

        <AmbientGlowBackground />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
