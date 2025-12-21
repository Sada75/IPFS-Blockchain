import { useState } from "react";
import { uploadFile } from "../services/api.js";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file || !password) {
      alert("File and password required");
      return;
    }

    const res = await uploadFile(file, password);
    setResult(res);
  };

  return (
    <>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <br /><br />

      <input
        type="password"
        placeholder="Set password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      {result && (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </>
  );
}
