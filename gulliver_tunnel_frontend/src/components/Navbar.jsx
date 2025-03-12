import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, User, Home } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen((prev) => !prev);

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

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* Home Button (Top-Left) */}
            <div className="absolute top-4 left-6">
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 px-4 py-2 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition"
                >
                    <Home size={20} className="text-gray-700" />
                </button>
            </div>

            {/* Profile Menu (Top-Right) */}
            <div className="absolute top-4 right-6" ref={menuRef}>
                <button
                    onClick={toggleMenu}
                    className="flex items-center gap-2 px-4 py-2 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition"
                >
                    <User size={20} className="text-gray-700" />
                    <ChevronDown size={18} className="text-gray-600" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => navigate('/home/profile')}>
                            Profile
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                            API Key
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => navigate('/home/documentation')}>
                            Documentation
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
