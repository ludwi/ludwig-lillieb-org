// Simple encoding/decoding to prevent bot scraping
export const encode = (str) => {
  return btoa(str);
};

export const decode = (str) => {
  try {
    return atob(str);
  } catch {
    return '';
  }
};

// Create mailto/tel link on click to avoid exposing in HTML
export const handleContactClick = (type, encoded) => {
  const decoded = decode(encoded);
  if (type === 'email') {
    window.location.href = `mailto:${decoded}`;
  } else if (type === 'phone') {
    window.location.href = `tel:${decoded.replace(/\s/g, '')}`;
  }
};
