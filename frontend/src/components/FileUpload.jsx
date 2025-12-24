import React, { useRef, useState } from "react";
import { uploadFile } from "../services/api";

export default function FileUpload() {
  const fileInputRef = useRef(null);
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
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Custom choose file button */}
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="w-full border-2 border-dashed border-gray-300 rounded-md py-4 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition"
      >
        {file ? `Selected: ${file.name}` : "Choose a file"}
      </button>

      {/* Password input */}
      <input
        type="password"
        placeholder="Set password"
        className="w-full border rounded-md px-3 py-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Upload File
      </button>

      {/* Result */}
      {result && (
        <div className="bg-gray-100 p-3 rounded text-sm break-all">
          <strong>Manifest CID:</strong>
          <div>{result.manifestCID}</div>
        </div>
      )}
    </div>
  );
}
