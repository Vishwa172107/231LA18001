import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";

export const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/new", label: "New URL" },
    { path: "/shortened", label: "All URLs" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">URL Shortener</div>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`navbar-link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
