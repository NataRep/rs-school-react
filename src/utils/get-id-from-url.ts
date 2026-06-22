export function getItemId(url: string): string | undefined {
  const match = url.match(/([^/]+)\/?$/);
  return match?.[1];
}
