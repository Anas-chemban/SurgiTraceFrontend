import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/"); // redirect after login
        },
      }
    );
  };

  const handleGoogleLogin = () => {
    // ⚠️ Placeholder
    alert("Google login not implemented yet");
  };

  return (
    <div className="h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-teal-700 text-white flex-col justify-between p-10">
        <div>
          <h2 className="text-lg font-semibold mb-2">SVES</h2>
          <p className="text-sm opacity-80">
            Surgical Video Evidence System
          </p>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">
            Secure surgical video management & compliance
          </h1>
          <p className="opacity-80">
            Monitor procedures, ensure compliance, and maintain legal-grade
            evidence with role-based access control.
          </p>
        </div>

        <p className="text-sm opacity-60">
          © 2026 SVES. All rights reserved.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Sign in to your account
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access the system
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="username"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="you@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition mb-4 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4">
              Login failed. Check your credentials.
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;