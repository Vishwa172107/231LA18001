import { useLocation, Link } from "react-router-dom";

export const ShortenedResult = () => {
  const location = useLocation();
  const { newUrls } = location.state || { newUrls: [] };

  return (
    <div className="container">
      <h2>Freshly Shortened URLs</h2>
      {newUrls.length === 0 ? (
        <p>No URLs found. Please shorten some first.</p>
      ) : (
        <ul>
          {newUrls.map((url) => (
            <li key={url._id}>
              <strong>Original:</strong>{" "}
              <a href={url.originalURL} target="_blank" rel="noopener noreferrer">
                {url.originalURL}
              </a>
              <br />
              <strong>Shortened:</strong>{" "}
              <a
                href={`http://localhost:5555/${url.shortURL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`http://localhost:5555/${url.shortURL}`}
              </a>
              <br />
              <small>Expires at: {new Date(url.expireAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <hr />
      <Link to="/shortened">View All Links</Link>
    </div>
  );
};
