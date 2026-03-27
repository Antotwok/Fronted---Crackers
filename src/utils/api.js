const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "https://backend-crackers.onrender.com";

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!rawApiBaseUrl) {
    return normalizedPath;
  }

  return `${rawApiBaseUrl.replace(/\/+$/, "")}${normalizedPath}`;
}
