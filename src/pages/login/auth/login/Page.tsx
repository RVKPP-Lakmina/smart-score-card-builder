import { useState } from "react";
import { ArrowRight, User, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../../lib/util";
import useAuth from "../../../../hooks/useAuth";
import {
  bubbleVariants,
  containerVariants,
  itemVariants,
  logoVariants,
} from "../../../../utils/utility";
import { authLogin } from "../../../../services/services";
import React from "react";

type NewPage = "login" | "signup";

export default React.memo(
  function LoginPage({
    onPageChange,
  }: {
    onPageChange: (page: NewPage) => void;
    setIsLoading: (pram: boolean) => void;
  }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const { login } = useAuth();

    const signIn = async () => {
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
      }
    };

    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-green-500 dark:from-blue-800 dark:to-green-700 flex flex-col justify-center items-center p-8 relative overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              custom={i}
              variants={bubbleVariants}
              initial="initial"
              animate="animate"
            />
          ))}

          <motion.div
            className="z-10 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={logoVariants} className="mb-8">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-white"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <motion.h1 className="text-4xl font-bold text-white mb-2">
                Smart score card
              </motion.h1>
              <motion.p className="text-white/80 text-lg">
                Create and manage ScoreCard with template mappings
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm max-w-md mx-auto">
                <p className="text-white text-sm">
                  "Smart score card has revolutionized how we assess credit
                  risk. The intuitive interface and powerful analytics have
                  improved our decision-making process significantly."
                </p>
                <p className="text-white/80 text-sm mt-2">
                  - John Smith, Financial Analyst
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white dark:bg-gray-900">
          <div className="w-full max-w-md">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in to your account to continue your journey
                </p>
              </motion.div>

              <motion.form
                variants={itemVariants}
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className={cn(
                      "block text-sm font-medium transition-colors duration-200",
                      focusedField === "username"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    Username
                  </label>
                  <div
                    className={cn(
                      "relative rounded-md shadow-sm",
                      focusedField === "username"
                        ? "ring-2 ring-blue-500 dark:ring-blue-400"
                        : "ring-1 ring-gray-300 dark:ring-gray-700"
                    )}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User
                        size={18}
                        className={
                          focusedField === "username"
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-gray-400 dark:text-gray-600"
                        }
                      />
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      className="block w-full pl-10 pr-3 py-2 border-0 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className={cn(
                      "block text-sm font-medium transition-colors duration-200",
                      focusedField === "password"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    Password
                  </label>
                  <div
                    className={cn(
                      "relative rounded-md shadow-sm",
                      focusedField === "password"
                        ? "ring-2 ring-blue-500 dark:ring-blue-400"
                        : "ring-1 ring-gray-300 dark:ring-gray-700"
                    )}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock
                        size={18}
                        className={
                          focusedField === "password"
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-gray-400 dark:text-gray-600"
                        }
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className="block w-full pl-10 pr-10 py-2 border-0 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Sign in
                </button>
              </motion.form>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      onPageChange("signup");
                    }}
                    className=" cursor-pointer font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 inline-flex items-center"
                  >
                    Sign up <ArrowRight size={16} className="ml-1" />
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.onPageChange === nextProps.onPageChange;
  }
);
