import React from "react";
import FileRetrieve from "../components/FileRetrieve";

export default function RetrievePage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Retrieve File
        </h2>
        <FileRetrieve />
      </div>
    </div>
  );
}
