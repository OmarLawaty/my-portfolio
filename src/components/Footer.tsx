import { Box, Flex, type FlexProps } from '@chakra-ui/react';

import { ContactLinks } from './ContactLinks';

export const Footer = (props: FlexProps) => (
  <Flex
    align='center'
    justify='space-between'
    w='full'
    bg='gray.800'
    py={[3, 4, 5]}
    px={[6, 8, 12]}
    rounded='10rem'
    my='4'
    mb={[16, 4]}
    {...props}
  >
    <Box color='gray.400' fontSize={['1rem', '1.125rem', '1.25rem']} fontFamily="'Nunito', sans-serif">
      Contact me
    </Box>

    <ContactLinks />
  </Flex>
);
