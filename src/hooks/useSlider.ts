'use client';

import debounce from 'lodash.debounce';
import { useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface SliderProps {
  snapOffset?: number;
}

export const useSlider = ({ snapOffset = 0.5 }: SliderProps = {}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const SLIDE_WIDTH = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({ container: scrollContainerRef, layoutEffect: false });

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

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
              Math.floor((totalScroll + SLIDE_WIDTH.current * snapOffset) / SLIDE_WIDTH.current),
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
  }, [scrollX, snapOffset]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      scrollStart.current = container.scrollLeft;
      container.style.userSelect = 'none';
      container.setAttribute('data-cursor', 'scrolling');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      container.scrollLeft = scrollStart.current - dx;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      container.style.removeProperty('user-select');
      container.setAttribute('data-cursor', 'scrollable');
    };

    const handleMouseLeave = () => {
      if (isDragging.current) handleMouseUp();
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return {
    scrollContainerRef,
    scrollIntoView,
    activeSlide,
    setActiveSlide,
  };
};
