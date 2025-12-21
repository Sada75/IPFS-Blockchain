import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage.jsx";
import RetrievePage from "./pages/RetrievePage.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/retrieve" element={<RetrievePage />} />
      </Routes>
    </>
  );
}
