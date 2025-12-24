import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <h1 className="text-white font-bold text-lg">
            BlockStore
          </h1>

          <div className="flex space-x-2">
            <Link to="/" className={linkClass("/")}>Upload</Link>
            <Link to="/files" className={linkClass("/files")}>My Files</Link>
            <Link to="/retrieve" className={linkClass("/retrieve")}>Retrieve</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
