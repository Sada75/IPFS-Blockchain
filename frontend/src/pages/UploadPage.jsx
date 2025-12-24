import React from "react";
import FileUpload from "../components/FileUpload";

export default function UploadPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Upload File
        </h2>
        <FileUpload />
      </div>
    </div>
  );
}
