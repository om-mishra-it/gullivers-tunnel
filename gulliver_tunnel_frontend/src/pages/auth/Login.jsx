import { useNavigate } from "react-router";
import { useState } from "react";
import { requestOtp, verifyOtp } from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailHandler = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    console.log("🚀 ~ emailHandler ~ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue):", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue))
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setError("");
    } else {
      setError("Provide a valid email address")
    }
    setEmail(emailValue);
  }

  const handleRequestOtp = async () => {
    if(error) return;
    try {
      await requestOtp(email);
      setStep(2);
    } catch (err) {
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(email, otp);
      localStorage.setItem("token", response.data.token);
//       alert("Login successful!");
      navigate("/home")
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6 p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col items-center">
        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={emailHandler}
              className="p-2 border rounded w-72 mb-5"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button onClick={handleRequestOtp}
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Request OTP
                </span>
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="p-2 border rounded w-72 mb-2"
            />
            <button onClick={handleVerifyOtp}
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Verify OTP
                </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
