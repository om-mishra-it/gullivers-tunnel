import { useState } from "react";
import { requestOtp, verifyOtp } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleRequestOtp = async () => {
    try {
      await requestOtp(email);
      setStep(2);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(email, otp);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-semibold mb-4">Login</h1>
      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded w-72 mb-2"
          />
          <button
            onClick={handleRequestOtp}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Request OTP
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
          <button
            onClick={handleVerifyOtp}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
