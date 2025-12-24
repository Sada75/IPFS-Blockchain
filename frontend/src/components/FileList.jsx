import React, { useEffect, useState } from "react";
import { getFiles } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FileList() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFiles().then(setFiles);
  }, []);

  if (files.length === 0) {
    return <p className="text-gray-500">No files uploaded yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">File</th>
            <th className="text-left px-4 py-2">Uploaded</th>
            <th className="text-left px-4 py-2">CID</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-2">{file.fileName}</td>
              <td className="px-4 py-2 text-sm">
                {new Date(file.uploadedAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 text-xs break-all max-w-xs">
                {file.manifestCID}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() =>
                    navigate("/retrieve", {
                      state: { manifestCID: file.manifestCID }
                    })
                  }
                  className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
                >
                  Retrieve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
