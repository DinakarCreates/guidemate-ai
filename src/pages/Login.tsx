import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/10001309351.png";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    console.log("Login Successful!", data.user);

    nav("/");

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0A0F14] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="flex flex-col items-center mb-10">

          <img
            src={logo}
            alt="GuideMate"
            className="w-40 mb-5"
          />

          <h1 className="text-4xl font-bold text-white">
            GuideMate
          </h1>

          <p className="text-[#00E5B0] mt-2 font-medium">
            Your AI Mentor for Life
          </p>

        </div>

        {/* Heading */}

        <div className="text-center mb-8">

          <h2 className="text-2xl font-semibold text-white">
            Welcome Back
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            Continue your personalized learning journey.
          </p>

        </div>

        <div className="bg-[#12181F] rounded-3xl border border-gray-800 p-8 shadow-2xl">

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full bg-[#1A2129] rounded-2xl border border-gray-700 px-5 py-4 text-white placeholder-gray-500 focus:border-[#00E5B0] outline-none"
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full bg-[#1A2129] rounded-2xl border border-gray-700 px-5 py-4 text-white placeholder-gray-500 focus:border-[#00E5B0] outline-none"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-5 top-4 text-gray-400"
              >
                {showPassword
                  ? <EyeOff size={22}/>
                  : <Eye size={22}/>}
              </button>

            </div>
                        {error && (
              <div className="rounded-2xl border border-red-900 bg-red-950/40 py-3 px-4 text-center text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-2xl bg-[#00E5B0] py-4 font-semibold text-black transition hover:bg-[#00C99A] disabled:opacity-70"
            >
              {loading
                ? "Preparing your GuideMate..."
                : "Login"}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>

              <div className="relative flex justify-center">
                <span className="bg-[#12181F] px-4 text-xs text-gray-500">
                  OR
                </span>
              </div>
            </div>

            <button
              disabled
              className="w-full rounded-2xl border border-gray-700 py-4 text-gray-400 transition"
            >
              Continue with Google (Coming Soon)
            </button>

          </div>

          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#00E5B0] hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Welcome back. Let's continue building your future.
        </p>

      </div>

    </div>
  );
}