import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { api } from "../../lib/util";
const AuthForm = ({ setIsLoading }: any) => {
  const [screenType, setScreenType] = useState("login");
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { login } = useAuth();

  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (formData: any) => {
    const endpoint = screenType === "login" ? "/auth/login" : "/auth/register";
    setIsLoading(true);
    try {
      const response = await api.post(endpoint, formData as any);

      if (response?.data?.status === 1 && "data" in response && response.data) {
        setFormData({ name: "", password: "" });
        if (screenType === "login") {
          login(response.data.accessToken);
        } else {
          setScreenType("login");
        }
        return response.data;
      }
    } catch (error) {
      alert("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {screenType === "login" ? "Login to your account" : "Create an account"}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              required
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !prev.password,
                }))
              }
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
            >
              {showPassword.password ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {screenType === "signup" && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
                className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
              >
                {showPassword.confirmPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
        >
          {screenType === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
        {screenType === "login" ? (
          <>
            Don't have an account?{" "}
            <span
              onClick={() => {
                setScreenType("signup");
                setFormData({ name: "", password: "" });
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => {
                setScreenType("login");
                setFormData({ name: "", password: "" });
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
