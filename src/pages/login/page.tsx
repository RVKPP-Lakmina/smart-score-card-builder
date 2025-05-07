import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { api } from "../../lib/util";
import { AuthFormProps, ShowPassword, FormData } from "../../types/auth";

type ScreenType = "login" | "signup";

const initialFormData: FormData = {
  name: "",
  password: "",
  confirmPassword: "",
};

const AuthForm: React.FC<AuthFormProps> = ({ setIsLoading }) => {
  const [screenType, setScreenType] = useState<ScreenType>("login");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    password: false,
    confirmPassword: false,
  });

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    const endpoint = screenType === "login" ? "/auth/login" : "/auth/register";
    setIsLoading(true);

    try {
      const payload =
        screenType === "signup"
          ? {
              name: formData.name,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }
          : {
              name: formData.name,
              password: formData.password,
            };

      const response = await api.post(endpoint, payload);

      if (response?.data?.status === 1 && "data" in response && response.data) {
        if (screenType === "login") {
          login(response.data.accessToken);
        } else {
          setScreenType("login");
        }
        setFormData(initialFormData);
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
          handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
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
              value={formData.password}
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
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
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
                setFormData(initialFormData);
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
                setFormData(initialFormData);
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
