import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
        Upload
      </Link>
      <Link to="/retrieve" style={{ color: "#fff" }}>
        Retrieve
      </Link>
    </nav>
  );
}
