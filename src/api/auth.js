const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { user, token, role }
}

export async function registerOfficer(data, token) {
  const res = await fetch(`${BASE_URL}/admin/register-officer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Officer registration failed");
  return res.json();
}
