import { useState, useEffect } from "react";
import axios from "axios";
import { Copy, RefreshCw, Trash2, Eye } from "lucide-react";

export default function DeveloperAccess() {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApiKey();
  }, []);

  const fetchApiKey = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/api-access/get_key/", {
        headers: { Authorization: `Token ${token}` },
      });
      setApiKey(response.data.api_key);
    } catch (error) {
      setApiKey(null);
    }
  };

  const generateApiKey = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/api-access/generate_key/",
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      setApiKey(response.data.api_key);
    } catch (error) {
      console.error("Error generating API key:", error);
    }
    setLoading(false);
  };

  const revokeApiKey = async () => {
    setLoading(true);
    try {
      await axios.delete("http://127.0.0.1:8000/api/v1/api-access/revoke_key/", {
        headers: { Authorization: `Token ${token}` },
      });
      setApiKey(null);
    } catch (error) {
      console.error("Error revoking API key:", error);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-4xl font-bold text-gray-800">Developer API Access</h1>
      <p className="mt-2 text-gray-600">Manage your API key for programmatic access.</p>

      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full max-w-md text-center border">
        {apiKey ? (
          <>
            <p className="text-gray-700 font-medium">Your API Key:</p>
            <div className="relative flex items-center justify-between mt-2 bg-gray-100 p-2 rounded-md">
              <span
                className={`text-sm text-gray-800 truncate transition-all ${
                  showKey ? "blur-none" : "blur-sm hover:blur-none"
                }`}
              >
                {apiKey}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowKey(!showKey)} className="p-1 hover:bg-gray-200 rounded">
                  <Eye size={18} />
                </button>
                <button onClick={copyToClipboard} className="p-1 hover:bg-gray-200 rounded">
                  <Copy size={18} />
                </button>
              </div>
            </div>
            <button
              onClick={revokeApiKey}
              className="mt-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              disabled={loading}
            >
              <Trash2 size={18} /> Revoke API Key
            </button>
          </>
        ) : (
          <button
            onClick={generateApiKey}
            className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            <RefreshCw size={18} /> Generate API Key
          </button>
        )}
      </div>

      {/* Toast Notification */}
      {copied && (
        <div className="fixed bottom-10 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg transition-all animate-fadeInOut">
          API Key copied to clipboard!
        </div>
      )}
    </div>
  );
}
