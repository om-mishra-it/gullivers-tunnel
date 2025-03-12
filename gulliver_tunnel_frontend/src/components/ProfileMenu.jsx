import { useState } from "react";
import { ChevronDown, User } from "lucide-react";

export default function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

   const handleLogout = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/logoutviewset/logout/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem("token");
                window.location.reload();
            } else {
                console.error("Logout failed", await response.json());
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="absolute top-4 right-6">
            <button
                onClick={toggleMenu}
                className="flex items-center gap-2 px-4 py-2 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition"
            >
                <User size={20} className="text-gray-700" />
                <ChevronDown size={18} className="text-gray-600" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={toggleMenu}>
                        API Key
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => window.open("/docs", "_blank")}>
                        Docs
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
