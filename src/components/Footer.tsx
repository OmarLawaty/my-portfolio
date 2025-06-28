import { Box, Flex, Link, type FlexProps, type LinkProps } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { IoMail } from 'react-icons/io5';

import { PersonalInfo } from '@/const';

export const Footer = (props: FlexProps) => (
  <Flex align='center' justify='space-between' w='full' bg='gray.800' py='5' px='12' rounded='10rem' my='4' {...props}>
    <Box color='gray.400' fontSize='1.25rem'>
      Contact me
    </Box>

    <Flex gap='4'>
      <LinkIcon href={PersonalInfo.github} Icon={FaGithub} target='_blank' />

      <LinkIcon href={PersonalInfo.linkedIn} Icon={FaLinkedin} target='_blank' />

      <LinkIcon href={`mailto:${PersonalInfo.email}`} Icon={IoMail} />
    </Flex>
  </Flex>
);

interface LinkIconProps extends LinkProps {
  Icon: IconType;
}

const LinkIcon = ({ Icon, ...props }: LinkIconProps) => (
  <Link transition='color 0.3s' _hover={{ color: 'purple.200' }} color='purple.300' title={props.href} {...props}>
    <Icon size='1.25rem' style={{ color: 'inherit' }} />
  </Link>
);
