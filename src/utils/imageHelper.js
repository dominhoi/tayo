export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('/assets/')) {
    const relative = path.replace(/^\//, '');
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanBase}${relative}`;
  }
  return path;
}
