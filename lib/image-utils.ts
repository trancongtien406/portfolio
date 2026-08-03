export function isExternalImageUrl(value: string) {
  return /^https?:\/\//i.test(value);
}