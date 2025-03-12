import { Outlet, Navigate } from 'react-router-dom'
import ProfileMenu from "../components/ProfileMenu";


export default function MainLayout() {
    const hasToken = !!localStorage.getItem('token');
    console.log("🚀 ~ MainLayout ~ hasToken:", hasToken)
    if(hasToken) {
        return (
            <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6'>
                <ProfileMenu />
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                    <Outlet />
                </div>
            </main>
        )
    }

    return <Navigate to='/auth/login' />
}