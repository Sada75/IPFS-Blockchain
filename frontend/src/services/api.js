const BASE_URL = "http://localhost:5000/api";

export async function uploadFile(file, password) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("password", password);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });

  return res.json();
}

export async function retrieveFile(manifestCID, password) {
  const res = await fetch(`${BASE_URL}/retrieve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ manifestCID, password })
  });

  if (!res.ok) {
    throw new Error("Decryption failed");
  }

  return res.blob();
}

// 🔹 NEW: fetch uploaded files metadata
export async function getFiles() {
  const res = await fetch(`${BASE_URL}/files`);
  return res.json();
}
