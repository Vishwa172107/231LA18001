import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import '../styles/ShortenedUrls.css';

export const ShortenedUrls = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({});

    const fetchUrls = async () => {
        try {
            const response = await axios.get(api.GetAllURL);
            setUrls(response.data.urls || response.data);
        } catch (err) {
            setError("Error fetching URLs");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (loading) return <p className="loading-msg">Loading...</p>;
    if (error) return <p className="error-msg">{error}</p>;

    return (
        <div className="shortened-container">
            <h2 className="shortened-title">Shortened URLs</h2>
            {urls.length === 0 ? (
                <p className="no-data-msg">No URLs found.</p>
            ) : (
                <ul className="url-list">
                    {urls.map((url) => (
                        <li key={url._id} className="url-card">
                            <div
                                className="url-header"
                                onClick={() => toggleExpand(url._id)}
                            >
                                <div className="url-info">
                                    <p className="url-original">
                                        Original:{" "}
                                        <a
                                            href={url.originalURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {url.originalURL}
                                        </a>
                                    </p>
                                    <p className="url-short">
                                        Short:{" "}
                                        <a
                                            href={`http://localhost:5555/${url.shortURL}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {`http://localhost:5555/${url.shortURL}`}
                                        </a>
                                    </p>
                                    <p className="url-meta">
                                        Expires:{" "}
                                        {new Date(url.expireAt).toLocaleString()} | Created:{" "}
                                        {new Date(url.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="url-toggle">
                                    {expanded[url._id] ? (
                                        <FaChevronDown />
                                    ) : (
                                        <FaChevronRight />
                                    )}
                                </div>
                            </div>

                            {expanded[url._id] && (
                                <div className="url-details">
                                    <p>
                                        <strong>Access Count:</strong>{" "}
                                        {url.accessCount || 0}
                                    </p>
                                    <div>
                                        <strong>Access Info:</strong>
                                        {url.accessInfo && url.accessInfo.length > 0 ? (
                                            <ul className="access-list">
                                                {url.accessInfo.map((info, idx) => (
                                                    <li key={idx}>
                                                        {info.ipAddress} — {info.userAgent}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="no-logs">No access logs yet.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
