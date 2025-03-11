export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm space-y-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Create Account
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <a href="#" className="text-blue-600 dark:text-blue-400">Sign in</a>
        </p>
      </div>
    </div>
  );
}
