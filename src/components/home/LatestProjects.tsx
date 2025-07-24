'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Flex, Heading, Text } from '@chakra-ui/react';

import { useReposQuery, useSlider } from '@/hooks';

import { Image } from '../Image';
import { Link } from '../Link';
import { ProjectCard } from '../ProjectCard';

export const LatestProjects = () => {
  const reposQuery = useReposQuery();

  const { scrollContainerRef, scrollIntoView, activeSlide: activeRepoIndex } = useSlider({ snapOffset: 0.1 });

  if (!reposQuery.isSuccess) return null;

  const repos = reposQuery.data!.slice(0, 5);
  const activeRepo = repos[activeRepoIndex];

  return (
    <Flex flexDir='column' gap={[8, 12, 16]}>
      <Heading
        as='h3'
        textAlign='center'
        display='flex'
        flexDir='column'
        gap={[1, 2, 4]}
        fontSize={['1.25rem', '1.5rem', '1.75rem']}
      >
        Take a look at
        <Text
          fontSize={['1.75rem', '2.25rem', '3rem']}
          fontWeight='700'
          bg='linear-gradient(90deg,rgb(255, 82, 246), #5551ff)'
          lineHeight='normal'
          bgClip='text'
        >
          my most recent projects
        </Text>
      </Heading>

      <Flex flexDir='column' gap='8'>
        <Link target='_blank' href={activeRepo.homepageUrl} w={['full', null, '80%']} mx='auto'>
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
              rounded={['1rem', null, '1.5rem']}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
            />
          </AnimatePresence>
        </Link>

        <Flex
          ref={scrollContainerRef}
          gap={[8, 12, 16]}
          scrollSnapType='inline mandatory'
          overflow='auto'
          scrollPaddingX='4'
          px={['10vw', '5vw', '20rem']}
          py={[8, null, 6]}
          overscrollBehaviorInline='contain'
          scrollBehavior='smooth'
          pos='relative'
          scrollbar='hidden'
          css={{
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          {repos.map((repo, i) => (
            <ProjectCard
              key={repo.name}
              repo={repo}
              transformOrigin='center'
              scrollSnapAlign='center'
              minW={['60vw', null, '52vw', 'fit']}
              animate={{
                transform: i === activeRepoIndex ? 'scale(1.1)' : 'scale(0.9)',
                boxShadow: i === activeRepoIndex ? '0 0 1rem 0.25rem rgba(179, 146, 255, 0.3)' : 'none',
              }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              overlayProps={{
                visibility: i === activeRepoIndex ? 'hidden' : 'visible',
                onClick: () => scrollIntoView(i),
              }}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

const AnimatedImage = motion.create(Image);

const previewImage = (name: string) => `https://raw.githubusercontent.com/OmarLawaty/${name}/main/design/preview.png`;
