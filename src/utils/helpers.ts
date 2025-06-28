export const isClient = () => typeof window !== 'undefined';

export const getSearchParams = () => {
  if (!isClient()) return new URLSearchParams();

  return new URLSearchParams(window.location.search);
};
