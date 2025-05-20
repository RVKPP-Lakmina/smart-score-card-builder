import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../../hooks/useAuth";
import { authLogin } from "../../../../services/services";
import React from "react";

// type NewPage = "login" | "signup";

export default React.memo(function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const signIn = async () => {
    setIsLoading(true);
    try {
      const response = await authLogin(username, password);

      if (!response) {
        return;
      }

      const { accessToken, user } = response;

      login(accessToken, user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f4f8",
        backgroundImage: 'url("/nutrien_login.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md z-10 p-8"
        >
          <div className="flex justify-center mb-6">
            <img
              src="/placeholder.svg?height=60&width=300"
              alt="Smart Scorecard Logo"
              className="h-12"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In to Smart Collect
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
});
