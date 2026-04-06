
const url = 'http://localhost:5001'
export async function fetchJSON(path, opts = {}) {
  const token = localStorage.getItem("asanaToken");
  const res = await fetch(url + path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...opts,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw error;
  }
  return res.json();
}
