import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/shortenedurlviewset/", {
        headers: { Authorization: `Token ${token}` },
      });
      setShortenedUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const handleCreateUrl = async () => {
    if (!originalUrl.trim()) return;
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/shortenedurlviewset/",
        { original_url: originalUrl },
        { headers: { Authorization: `Token ${token}` } }
      );
      setShortenedUrls([...shortenedUrls, response.data]);
      setOriginalUrl("");
    } catch (error) {
      console.error("Error creating shortened URL:", error);
    }
  };

  const handleDeleteUrl = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/v1/shortenedurlviewset/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    setShortenedUrls(shortenedUrls.filter((url) => url.id !== id));
  } catch (error) {
    console.error("Error deleting URL:", error);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-500">
        Create Your Shortened URL
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
        Paste your long URL below to get a short and shareable link.
      </p>

      {/* Input Field & Button */}
      <div className="mt-6 flex space-x-2">
        <input
          type="text"
          placeholder="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateUrl}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Shorten URL
        </button>
      </div>

      {/* Table for Shortened URLs */}
      <div className="mt-8 w-full max-w-2xl">
        {shortenedUrls.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Original URL</th>
                <th className="border p-2">Short URL</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shortenedUrls.map((url) => (
                <tr key={url.short_code} className="border-t">
                  <td className="border p-2 truncate max-w-xs">{url.original_url}</td>
                  <td className="border p-2">
                    <a
                      href={`http://127.0.0.1:8000/${url.short_code}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {`http://127.0.0.1:8000/${url.short_code}/`}
                    </a>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteUrl(url.short_code)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 mt-4">No shortened URLs yet.</p>
        )}
      </div>
    </div>
  );
}
