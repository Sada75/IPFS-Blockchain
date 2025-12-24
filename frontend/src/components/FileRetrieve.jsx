import React, { useState } from "react";
import { retrieveFile } from "../services/api";
import { useLocation } from "react-router-dom";

export default function FileRetrieve() {
  const location = useLocation();
  const [manifestCID, setManifestCID] = useState(
    location.state?.manifestCID || ""
  );
  const [password, setPassword] = useState("");

  const handleRetrieve = async () => {
    try {
      const blob = await retrieveFile(manifestCID, password);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recovered-file";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Wrong password or invalid CID");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Manifest CID"
        className="w-full border rounded-md px-3 py-2"
        value={manifestCID}
        onChange={(e) => setManifestCID(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded-md px-3 py-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRetrieve}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Retrieve File
      </button>
    </div>
  );
}
