import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Shortened URLs</h2>
            {urls.length === 0 ? (
                <p>No URLs found.</p>
            ) : (
                <ul className="space-y-3">
                    {urls.map((url) => (
                        <li
                            key={url._id}
                            className="border rounded-lg p-3 shadow-sm bg-white"
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleExpand(url._id)}
                            >
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Original:{" "}
                                        <a
                                            href={url.originalURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {url.originalURL}
                                        </a>
                                    </p>
                                    <p className="text-sm">
                                        Short:{" "}
                                        <a
                                            href={`http://localhost:5555/${url.shortURL}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 underline"
                                        >
                                            {`http://localhost:5555/${url.shortURL}`}
                                        </a>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Expires:{" "}
                                        {new Date(url.expireAt).toLocaleString()} | Created:{" "}
                                        {new Date(url.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    {expanded[url._id] ? (
                                        <FaChevronDown className="text-gray-600" />
                                    ) : (
                                        <FaChevronRight className="text-gray-600" />
                                    )}
                                </div>
                            </div>

                            {expanded[url._id] && (
                                <div className="mt-3 pl-4 border-l text-sm text-gray-700 space-y-1">
                                    <p>
                                        <strong>Access Count:</strong>{" "}
                                        {url.accessCount || 0}
                                    </p>
                                    <div>
                                        <strong>Access Info:</strong>
                                        {url.accessInfo && url.accessInfo.length > 0 ? (
                                            <ul className="list-disc list-inside">
                                                {url.accessInfo.map((info, idx) => (
                                                    <li key={idx}>
                                                        {info.ipAddress} — {info.userAgent}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">No access logs yet.</p>
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
