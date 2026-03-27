const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!rawApiBaseUrl) {
    return normalizedPath;
  }

  return `${rawApiBaseUrl.replace(/\/+$/, "")}${normalizedPath}`;
}
