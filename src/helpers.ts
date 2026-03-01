export const getIsPageActive = (href: string, pathname: string, isBase?: boolean) => {
  if (isBase) return pathname === href;

  return pathname.startsWith(href);
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
