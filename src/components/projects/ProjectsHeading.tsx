import { Flex, Heading as ChakraHeading, Text } from '@chakra-ui/react';

export const ProjectsHeading = () => (
  <Flex as='header' flexDir='column' gap='4' px='4' align='center'>
    <ChakraHeading
      as='h1'
      fontSize={['clamp(1.4rem, 7vw, 2rem)', null, '3rem']}
      fontWeight='700'
      bg='linear-gradient(270deg,rgb(255, 82, 246), #5551ff)'
      lineHeight='normal'
      bgClip='text'
      textAlign='center'
    >
      Ideas Brought to Life
    </ChakraHeading>

    <Text fontSize={['clamp(0.8rem, 4vw, 1rem)', null, '1.25rem']} textAlign='center'>
      From full-stack apps to fun side projects, here&apos;s what I&apos;ve been crafting.
    </Text>
  </Flex>
);
