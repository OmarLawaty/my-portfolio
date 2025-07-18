import { Flex, Link, type FlexProps, type LinkProps } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

import { PersonalInfo } from '@/const';

export const ContactLinks = (props: FlexProps) => (
  <Flex gap='4' {...props}>
    <LinkIcon href={PersonalInfo.github} Icon={FaGithub} target='_blank' />

    <LinkIcon href={PersonalInfo.linkedIn} Icon={FaLinkedin} target='_blank' />

    <LinkIcon href={`mailto:${PersonalInfo.email}`} Icon={IoMail} />
  </Flex>
);

interface LinkIconProps extends LinkProps {
  Icon: IconType;
}

const LinkIcon = ({ Icon, ...props }: LinkIconProps) => (
  <Link
    transition='color 0.3s'
    _hover={{ color: 'purple.200' }}
    color='purple.300'
    fontSize={['1rem', null, '1.25rem']}
    title={props.href}
    {...props}
  >
    <Icon style={{ color: 'inherit' }} />
  </Link>
);
