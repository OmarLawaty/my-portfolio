import { Container } from '@chakra-ui/react';

import { Footer, Header, Providers } from '@/components';

import { fonts } from './fonts';

const fontClassNames = fonts.map(font => font.className).join(' ');

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
  <html lang='en' className={fontClassNames}>
    <body>
      <Providers>
        <Container gap='36'>
          <Header />

          {children}

          <Footer />
        </Container>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
