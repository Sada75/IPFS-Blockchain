import { useEffect, useState } from "react";
import { getFiles } from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function FileList() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFiles() {
      const data = await getFiles();
      setFiles(data);
    }
    fetchFiles();
  }, []);

  if (files.length === 0) {
    return <p>No files uploaded yet.</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ marginTop: "15px" }}>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Uploaded At</th>
          <th>Manifest CID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => (
          <tr key={file._id}>
            <td>{file.fileName}</td>
            <td>{new Date(file.uploadedAt).toLocaleString()}</td>
            <td style={{ maxWidth: "200px", wordBreak: "break-all" }}>
              {file.manifestCID}
            </td>
            <td>
              <button
                onClick={() =>
                  navigate("/retrieve", {
                    state: { manifestCID: file.manifestCID }
                  })
                }
              >
                Retrieve
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
