import React from "react";
import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import FilesPage from "./pages/FilesPage";
import RetrievePage from "./pages/RetrievePage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/retrieve" element={<RetrievePage />} />
        </Routes>
      </main>
    </div>
  );
}
