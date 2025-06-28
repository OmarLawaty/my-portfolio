import { Box, Flex, type FlexProps } from '@chakra-ui/react';

import { ContactLinks } from './ContactLinks';

export const Footer = (props: FlexProps) => (
  <Flex align='center' justify='space-between' w='full' bg='gray.800' py='5' px='12' rounded='10rem' my='4' {...props}>
    <Box color='gray.400' fontSize='1.25rem'>
      Contact me
    </Box>

    <ContactLinks />
  </Flex>
);
