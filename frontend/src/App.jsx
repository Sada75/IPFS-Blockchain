import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage.jsx";
import RetrievePage from "./pages/RetrievePage.jsx";
import FilesPage from "./pages/FilesPage.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/retrieve" element={<RetrievePage />} />
      </Routes>
    </>
  );
}
