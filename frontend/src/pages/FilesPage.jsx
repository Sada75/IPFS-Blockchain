import React from "react";
import FileList from "../components/FileList";

export default function FilesPage() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">
        My Uploaded Files
      </h2>
      <FileList />
    </div>
  );
}
