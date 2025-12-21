import { useState } from "react";
import { retrieveFile } from "../services/api.js";

export default function FileRetrieve() {
  const [manifestCID, setManifestCID] = useState("");
  const [password, setPassword] = useState("");

  const handleRetrieve = async () => {
    try {
      const blob = await retrieveFile(manifestCID, password);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "recovered-file";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Wrong password or invalid CID");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Manifest CID"
        value={manifestCID}
        onChange={e => setManifestCID(e.target.value)}
        style={{ width: "400px" }}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleRetrieve}>Retrieve</button>
    </>
  );
}
