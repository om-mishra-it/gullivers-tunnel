import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/v1/userviewset/profile/", {
                    headers: { Authorization: `Token ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error("Failed to fetch profile");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen px-8 py-12 bg-white flex items-start justify-center">
            <div className="w-full max-w-5xl flex gap-10">
                {/* Left Section - Profile Avatar & Basic Info */}
                <div className="w-1/3 bg-gray-100 rounded-xl shadow-md p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700">
                            {user.email.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.email}</h2>
                        <p className="text-gray-500">{user.is_verified ? "✅ Verified" : "❌ Not Verified"}</p>
                    </div>
                </div>

                {/* Right Section - Detailed Info */}
                <div className="w-2/3 bg-white rounded-xl shadow-md p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Profile Information</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="text-lg font-medium text-gray-800">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Date of Birth</p>
                            <p className="text-lg font-medium text-gray-800">{user.date_of_birth || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Last Login</p>
                            <p className="text-lg font-medium text-gray-800">
                                {new Date(user.last_login).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Account Created</p>
                            <p className="text-lg font-medium text-gray-800">
                                {new Date(user.created_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
