import { Outlet, Navigate } from 'react-router-dom'

export default function MainLayout() {
    const hasToken = !!localStorage.getItem('token');
    console.log("🚀 ~ MainLayout ~ hasToken:", hasToken)
    if(hasToken) {
        return (
            <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8'>
                <Outlet />
            </main>
        )
    }

    return <Navigate to='/auth/login' />
}