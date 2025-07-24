'use client';

import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import { useConfigQuery } from '@/hooks';
import { Image } from '../Image';
import { constructTechnologyIconURL } from '@/utils/helpers';

export const Skills = () => {
  const configQuery = useConfigQuery();

  if (!configQuery.isSuccess) return null;

  return (
    <Flex as='section' flexDir='column' gap={[16, 20, 24, 28]}>
      <Heading
        as='h3'
        color='gray.300'
        fontSize={['2rem', '2.75rem', '3.25rem']}
        fontWeight='400'
        lineHeight='normal'
        px='4'
        textAlign={['center', null, 'start']}
      >
        These are the <br />
        technologies I&apos;ve been using
      </Heading>

      <Box columnCount={[1, null, 2]} columnGap='16'>
        {configQuery.data.skills.map(({ category, skills }, i) => (
          <Flex
            key={category}
            flexDir='column'
            rounded='0.75rem'
            bgColor='gray.900'
            borderColor='#232323'
            borderWidth='1px'
            gap='6'
            px='8'
            py='6'
            minW='18rem'
            h='fit'
            mb={i < configQuery.data.skills.length ? '16' : '0'}
            breakInside='avoid'
            fontFamily="'Nunito', sans-serif"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: '0 0 2rem rgba(255, 255, 255, 0.2)',
            }}
            transition='transform 0.5s ease, box-shadow 0.2s ease'
          >
            <Heading as='h4' color='white' fontSize='1rem' fontWeight='400' lineHeight='normal'>
              {category}
            </Heading>

            <Grid templateColumns='repeat(auto-fill, minmax(10rem, 1fr))' gap='4'>
              {skills.map(skill => (
                <Flex key={skill} gap='3.5' alignItems='center'>
                  <Box p='2.5' rounded='full' bg='gray.700'>
                    <Image src={constructTechnologyIconURL(skill)} alt={skill} width={20} height={20} w='5' h='5' />
                  </Box>

                  <Text fontSize='1rem' fontWeight='400' color='white'>
                    {skill}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};
