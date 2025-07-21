'use client';

import debounce from 'lodash.debounce';
import { useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export const useSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const SLIDE_WIDTH = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({ container: scrollContainerRef, layoutEffect: false });

  const scrollIntoView = (
    slideIndex: number,
    options: ScrollIntoViewOptions = {
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    }
  ) => scrollContainerRef.current?.children[slideIndex].scrollIntoView(options);

  useEffect(() => {
    if (!scrollContainerRef.current?.children.length) return;

    SLIDE_WIDTH.current = scrollContainerRef.current.children[0].getBoundingClientRect().width;
  }, []);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const debouncedSetActiveSlide = debounce(
      (totalScroll: number) =>
        setActiveSlide(
          Math.max(
            Math.min(
              Math.floor((totalScroll + SLIDE_WIDTH.current * 0.25) / SLIDE_WIDTH.current),
              (scrollContainerRef?.current?.children.length ?? 0) - 1
            ),
            0
          )
        ),
      0
    );
    const unsubscribe = scrollX.on('change', debouncedSetActiveSlide);

    return () => {
      unsubscribe();
      debouncedSetActiveSlide.cancel();
    };
  }, [scrollX]);

  return {
    scrollContainerRef,
    scrollIntoView,
    activeSlide,
    setActiveSlide,
  };
};
