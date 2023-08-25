export const getAvatarFallback = (name?: string) => {
  const initials = name?.match(/\b\w/g) ?? [];

  const fallback = `${initials.shift()}${initials.pop()}`;

  return fallback.toUpperCase();
};

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}
