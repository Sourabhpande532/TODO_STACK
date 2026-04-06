const BASE_URL = 'http://localhost:5001';

export async function fetchJSON2(path, { method = "GET", body = null, ...customOpts } = {}) {
  const token = localStorage.getItem("asanaToken");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customOpts.headers,
  };

  const config = {
    method,
    headers,
    ...customOpts,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, config);

  // Handle common "No Content" success (204) or failed requests
  if (res.status === 204) return null;
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw errorData;
  }

  return res.json();
}
