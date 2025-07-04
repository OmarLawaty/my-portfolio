'use client';

import { GoLinkExternal, GoRepo } from 'react-icons/go';
import { AnimatePresence, motion } from 'motion/react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { useLatestReposQuery, useSlider } from '@/hooks';

import { Image } from '../Image';
import { Link } from '../Link';

export const LatestProjects = () => {
  const latestReposQuery = useLatestReposQuery();

  const { scrollContainerRef, scrollIntoView, activeSlide: activeRepoIndex } = useSlider();

  if (!latestReposQuery.isSuccess) return null;

  const repos = latestReposQuery.data!.slice(0, 5);
  const activeRepo = repos[activeRepoIndex];

  return (
    <Flex flexDir='column' gap='16'>
      <Heading as='h3' textAlign='center' display='flex' flexDir='column' gap='4' fontSize='1.75rem'>
        Take a look at
        <Text
          fontSize='3rem'
          fontWeight='700'
          bg='linear-gradient(90deg,rgb(255, 82, 246), #5551ff)'
          lineHeight='normal'
          bgClip='text'
        >
          my most recent projects
        </Text>
      </Heading>

      <Flex flexDir='column' gap='8'>
        <Link target='_blank' href={activeRepo.homepageUrl} w='80%' mx='auto'>
          <AnimatePresence mode='wait'>
            <AnimatedImage
              key={activeRepo.name}
              src={previewImage(activeRepo.name)}
              alt={activeRepo.name}
              title={`See ${activeRepo.name} live`}
              quality={80}
              width={680}
              height={360}
              w='full'
              rounded='1.5rem'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
            />
          </AnimatePresence>
        </Link>

        <Flex
          pos='relative'
          _before={{
            content: '""',
            width: '40',
            position: 'absolute',
            inset: '0',
            insetEnd: 'unset',
            bg: `linear-gradient(to left, transparent, #0C0C0D)`,
            zIndex: 1,
            pointerEvents: 'none',
          }}
          _after={{
            content: '""',
            width: '40',
            position: 'absolute',
            inset: '0',
            insetStart: 'unset',
            bg: `linear-gradient(to right, transparent, #0C0C0D)`,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <Flex
            ref={scrollContainerRef}
            gap='16'
            scrollSnapType='inline mandatory'
            overflow='auto'
            scrollPaddingX='4'
            px='20rem'
            py='6'
            overscrollBehaviorInline='contain'
            scrollBehavior='smooth'
            pos='relative'
            scrollbar='hidden'
          >
            {repos.map((repo, i) => (
              <AnimatedFlex
                key={repo.name}
                flexDir='column'
                p='6'
                gap='2'
                maxW='27.5rem'
                minW='fit'
                flex='0 0 max-content'
                rounded='1rem'
                borderColor='#3d444d'
                borderWidth='1px'
                h='min'
                scrollSnapAlign='center'
                pos='relative'
                transformOrigin='center'
                animate={{
                  transform: i === activeRepoIndex ? 'scale(1.1)' : 'scale(0.9)',
                  boxShadow: i === activeRepoIndex ? '0 0 1rem 0.25rem rgba(179, 146, 255, 0.3)' : 'none',
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              >
                <Flex align='center' gap='2'>
                  <GoRepo size='1.125rem' />

                  <Link
                    href={repo.url}
                    target='_blank'
                    color='#4493f8'
                    fontWeight='600'
                    fontSize='1rem'
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {repo.name}
                  </Link>
                </Flex>

                <Text fontSize='0.875rem'>{repo.description}</Text>

                <Flex align='center' gap='2.5'>
                  <GoLinkExternal size='0.875rem' />

                  <Link href={repo.homepageUrl} target='_blank' fontSize='0.875rem' color='purple.200' fontWeight='600'>
                    Live Preview
                  </Link>
                </Flex>

                <Box
                  pos='absolute'
                  inset='0'
                  visibility={i === activeRepoIndex ? 'hidden' : 'visible'}
                  cursor='pointer'
                  onClick={() => scrollIntoView(i)}
                />
              </AnimatedFlex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const AnimatedFlex = motion.create(Flex);
const AnimatedImage = motion.create(Image);

const previewImage = (name: string) => `https://raw.githubusercontent.com/OmarLawaty/${name}/main/design/preview.png`;
