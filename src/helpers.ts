export const getIsPageActive = (href: string, pathname: string, isBase?: boolean) => {
  if (isBase) return pathname === href;

  return pathname.startsWith(href);
};
