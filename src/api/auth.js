const BASE_URL = "https://parking-app-13ns.onrender.com";
// const BASE_URL = "http://localhost:8000";

export async function adminLogin(email, password) {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json(); // token, role, etc.
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

export async function officerLogin(email, password) {
  const res = await fetch(`${BASE_URL}/officer/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}
