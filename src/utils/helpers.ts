export const getInitials = (name: string | null | undefined): string => {
  if (!name || typeof name !== "string") return "";

  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase();

  const first = words[0][0].toUpperCase();
  const last = words[words.length - 1][0].toUpperCase();

  return first + last;
};
