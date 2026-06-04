export const decode = (str: string): string => {
  try {
    return atob(str);
  } catch {
    return '';
  }
};
