import { Link } from "react-router-dom";
import "../Styles/Home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome to URL Shortener</h1>
        <p className="home-subtitle">
          Easily shorten your long URLs and share them with a simple link.
        </p>
        <Link to="/new" className="home-button">
          Shorten Now
        </Link>
      </div>
    </div>
  );
};
