import React from "react";
import { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../../lib/util";
import {
  bubbleVariants,
  containerVariants,
  logoVariants,
  floatingTextVariants,
  itemVariants,
} from "../../../../utils/utility";
import { authSignUp } from "../../../../services/services";

type NewPage = "login" | "signup";

export default React.memo(
  function SignupPage({
    onPageChange,
  }: {
    onPageChange: (page: NewPage) => void;
  }) {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "password") {
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
      }

      if (
        name === "confirmPassword" ||
        (name === "password" && formData.confirmPassword)
      ) {
        const match =
          name === "confirmPassword"
            ? value === formData.password
            : formData.confirmPassword === value;
        setPasswordMatch(match);
      }
    };

    const calculatePasswordStrength = (password: string): number => {
      if (!password) return 0;

      let strength = 0;
      if (password.length >= 8) strength += 25;

      if (/[a-z]/.test(password)) strength += 25;

      if (/[A-Z]/.test(password)) strength += 25;

      if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;

      return strength;
    };

    const getStrengthColor = () => {
      if (passwordStrength < 50) return "bg-red-500";
      if (passwordStrength < 75) return "bg-yellow-500";
      return "bg-green-500";
    };

    const handleSubmit = async (): Promise<void> => {
      try {
        const payload = {
          name: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };

        await authSignUp(payload);

        onPageChange("login");

        setFormData({
          name: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert("Something went wrong. Please try again.");
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
                Smart Scorecard
              </motion.h1>
              <motion.p className="text-white/80 text-lg">
                Create and manage ScoreCard with template mappings
              </motion.p>
            </motion.div>

            {formData.name && (
              <motion.div
                className="mt-8 relative h-20"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {formData.name.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={floatingTextVariants}
                      className="text-white text-4xl font-bold mx-1"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="mt-8">
              <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm max-w-md mx-auto">
                <p className="text-white text-sm">
                  "Join thousands of financial professionals who trust ScoreCard
                  Pro for their risk assessment needs. Sign up today and
                  transform your decision-making process."
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
                  Create Account
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Join our community and start your journey
                </p>
              </motion.div>

              <motion.form
                variants={itemVariants}
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className={cn(
                      "block text-sm font-medium transition-colors duration-200",
                      focusedField === "name"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    Full Name
                  </label>
                  <div
                    className={cn(
                      "relative rounded-md shadow-sm",
                      focusedField === "name"
                        ? "ring-2 ring-blue-500 dark:ring-blue-400"
                        : "ring-1 ring-gray-300 dark:ring-gray-700"
                    )}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User
                        size={18}
                        className={
                          focusedField === "name"
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-gray-400 dark:text-gray-600"
                        }
                      />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="block w-full pl-10 pr-3 py-2 border-0 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className={cn(
                      "block text-sm font-medium transition-colors duration-200",
                      focusedField === "email"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    Email
                  </label>
                  <div
                    className={cn(
                      "relative rounded-md shadow-sm",
                      focusedField === "email"
                        ? "ring-2 ring-blue-500 dark:ring-blue-400"
                        : "ring-1 ring-gray-300 dark:ring-gray-700"
                    )}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail
                        size={18}
                        className={
                          focusedField === "email"
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-gray-400 dark:text-gray-600"
                        }
                      />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="block w-full pl-10 pr-3 py-2 border-0 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

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
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      className="block w-full pl-10 pr-3 py-2 border-0 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="Choose a username"
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className="block w-full pl-10 pr-10 py-2 border-0 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="Create a password"
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
                  {formData.password && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${getStrengthColor()}`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                        {passwordStrength < 50
                          ? "Weak password"
                          : passwordStrength < 75
                          ? "Medium password"
                          : "Strong password"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className={cn(
                      "block text-sm font-medium transition-colors duration-200",
                      focusedField === "confirmPassword"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    Confirm Password
                  </label>
                  <div
                    className={cn(
                      "relative rounded-md shadow-sm",
                      focusedField === "confirmPassword"
                        ? "ring-2 ring-blue-500 dark:ring-blue-400"
                        : "ring-1 ring-gray-300 dark:ring-gray-700"
                    )}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock
                        size={18}
                        className={
                          focusedField === "confirmPassword"
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-gray-400 dark:text-gray-600"
                        }
                      />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField(null)}
                      className="block w-full pl-10 pr-10 py-2 border-0 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  {formData.confirmPassword && (
                    <div className="flex items-center mt-1">
                      {passwordMatch ? (
                        <>
                          <CheckCircle
                            size={14}
                            className="text-green-500 mr-1"
                          />
                          <p className="text-xs text-green-500">
                            Passwords match
                          </p>
                        </>
                      ) : (
                        <>
                          <XCircle size={14} className="text-red-500 mr-1" />
                          <p className="text-xs text-red-500">
                            Passwords do not match
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Create Account
                </button>
              </motion.form>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      onPageChange("login");
                    }}
                    className=" cursor-pointer font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 inline-flex items-center"
                  >
                    Sign in <ArrowLeft size={16} className="ml-1" />
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
