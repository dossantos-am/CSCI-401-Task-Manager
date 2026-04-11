import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${apiBaseUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailAddress: email }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Forgot Password</h1>

        {submitted ? (
          <>
            <p className="text-gray-600 text-center mt-4">
              If an account exists for that email, a reset link has been sent.
            </p>
            <p className="text-sm text-center text-gray-500 mt-6">
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Back to Sign In
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-500 text-center mb-8">
              Enter your email and we'll send you a reset link.
            </p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
              >
                Send Reset Link
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
            <p className="text-sm text-center text-gray-500 mt-6">
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
