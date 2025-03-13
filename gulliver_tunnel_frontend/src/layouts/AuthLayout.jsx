import { Outlet, Navigate } from 'react-router-dom';

export default function AuthLayout() {
    const hasToken = !!localStorage.getItem('token');

    if (!hasToken) {
        return (
            <div className="relative w-full min-h-screen">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                >
                    <source src="/gullivers_tunnel_bg" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
                    <main className="bg-white p-8 rounded-2xl shadow-xl z-10 max-w-md w-full">
                        <h1 className="text-4xl font-bold text-gray-800 text-center">Login</h1>
                        <Outlet />
                    </main>
                </div>
            </div>
        );
    }

    return <Navigate to='/auth/login' />;
}
