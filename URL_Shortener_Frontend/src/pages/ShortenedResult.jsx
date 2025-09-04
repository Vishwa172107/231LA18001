import { useLocation, Link } from "react-router-dom";
import "../Styles/ShortenedResult.css";

export const ShortenedResult = () => {
  const location = useLocation();
  const { newUrls } = location.state || { newUrls: [] };

  return (
    <div className="result-container">
      <h2 className="result-title">Freshly Shortened URLs</h2>

      {newUrls.length === 0 ? (
        <p className="no-data-msg">No URLs found. Please shorten some first.</p>
      ) : (
        <ul className="url-list">
          {newUrls.map((url) => (
            <li key={url._id} className="url-card">
              <p className="url-original">
                <strong>Original:</strong>{" "}
                <a href={url.originalURL} target="_blank" rel="noopener noreferrer">
                  {url.originalURL}
                </a>
              </p>
              <p className="url-short">
                <strong>Shortened:</strong>{" "}
                <a
                  href={`http://localhost:5555/${url.shortURL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`http://localhost:5555/${url.shortURL}`}
                </a>
              </p>
              <p className="url-meta">
                <small>Expires at: {new Date(url.expireAt).toLocaleString()}</small>
              </p>
            </li>
          ))}
        </ul>
      )}

      <hr className="divider" />

      <Link to="/shortened" className="view-all-link">
        View All Links
      </Link>
    </div>
  );
};
