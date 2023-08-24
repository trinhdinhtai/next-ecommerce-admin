export const getAvatarFallback = (name?: string) => {
  const initials = name?.match(/\b\w/g) ?? [];

  const fallback = `${initials.shift()}${initials.pop()}`;

  return fallback.toUpperCase();
};
