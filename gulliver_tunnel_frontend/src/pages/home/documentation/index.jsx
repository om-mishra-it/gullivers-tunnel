import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function Documentation() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "API Documentation";
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">API Documentation</h1>

            <p className="text-lg text-gray-700 mb-4">
                Welcome to the API documentation. This guide will help you integrate your API key into your application.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Getting Your API Key</h2>
            <p className="text-gray-700 mb-4">
                First, navigate to the <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/home/developer')}>Developer Access</span> page to generate an API Key.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. Using the API Key in Python</h2>
            <p className="text-gray-700 mb-2">
                Use the following Python script to make authenticated requests:
            </p>
            <div className="relative bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
                <button
                    className="absolute top-2 right-2 bg-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-600"
                    onClick={() => copyToClipboard('import requests\n\nAPI_KEY = "your_api_key_here"\nURL = "http://127.0.0.1:8000/api/v1/some-endpoint/"\nheaders = {"Api-Key": f"{API_KEY}"}\nresponse = requests.get(URL, headers=headers)\nprint(response.json())')}
                >
                    <Copy size={16} />
                </button>
                <pre>
                    {`import requests

API_KEY = "your_api_key_here"
URL = "http://127.0.0.1:8000/api/v1/some-endpoint/"
headers = {"Api-Key": f"{API_KEY}"}
response = requests.get(URL, headers=headers)
print(response.json())`}
                </pre>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. Revoking an API Key</h2>
            <p className="text-gray-700 mb-2">
                To revoke an API key, send a DELETE request to the API:
            </p>
            <div className="relative bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
                <button
                    className="absolute top-2 right-2 bg-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-600"
                    onClick={() => copyToClipboard('import requests\n\nAPI_KEY = "your_api_key_here"\nURL = "http://127.0.0.1:8000/api/v1/api-access/revoke_key/"\nheaders = {"Api-Key": f"{API_KEY}"}\nresponse = requests.delete(URL, headers=headers)\nprint(response.status_code)')}
                >
                    <Copy size={16} />
                </button>
                <pre>
                    {`import requests

API_KEY = "your_api_key_here"
URL = "http://127.0.0.1:8000/api/v1/api-access/revoke_key/"
headers = {"Api-Key": f"{API_KEY}"}
response = requests.delete(URL, headers=headers)
print(response.status_code)`}
                </pre>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. Handling API Errors</h2>
            <p className="text-gray-700 mb-2">
                Always handle API errors gracefully:
            </p>
            <div className="relative bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
                <button
                    className="absolute top-2 right-2 bg-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-600"
                    onClick={() => copyToClipboard('import requests\n\ntry:\n    response = requests.get(URL, headers=headers)\n    response.raise_for_status()  # Raises an error for bad responses\n    data = response.json()\n    print(data)\nexcept requests.exceptions.RequestException as e:\n    print("Error:", e)')}
                >
                    <Copy size={16} />
                </button>
                <pre>
                    {`import requests

try:
    response = requests.get(URL, headers=headers)
    response.raise_for_status()  # Raises an error for bad responses
    data = response.json()
    print(data)
except requests.exceptions.RequestException as e:
    print("Error:", e)`}
                </pre>
            </div>
        </div>
    );
}

