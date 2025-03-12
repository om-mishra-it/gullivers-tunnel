import { useState } from "react";
import { requestOtp, verifyOtp } from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const emailHandler = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    console.log("🚀 ~ emailHandler ~ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue):", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue))
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setError("");
    } else {
      setError("please provide valid email")
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
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6 p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={emailHandler}
              className="p-2 border rounded w-72 mb-2"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              onClick={handleRequestOtp}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
