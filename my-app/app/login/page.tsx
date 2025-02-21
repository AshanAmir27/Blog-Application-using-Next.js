"use client"; // Ensures it's a Client Component
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
    const { status } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ username: string; password: string }>({
        username: "",
        password: "",
    });

    // Redirect user to dashboard if authenticated
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    // Validate Form
    const validateForm = (): boolean => {
        let isValid = true;
        let newErrors = { username: "", password: "" };

        if (!username.trim()) {
            newErrors.username = "Username is required";
            isValid = false;
        }
        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle Form Submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log("Logging in with:", username, password);
        // Add authentication logic here if needed
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-6 md:p-8 rounded-lg w-full max-w-sm shadow-lg text-center">
                <h1 className="font-bold text-xl md:text-2xl mb-4">Login Page</h1>

                {/* Social Sign-In Buttons */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => signIn("google")}
                        className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
                    >
                        <FcGoogle className="text-xl" />
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => signIn("github")}
                        className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-900 transition"
                    >
                        <GrGithub className="text-xl" />
                        Sign in with GitHub
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-5 text-left">
                    {/* Username Input */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="p-2 w-full border rounded-md mt-1 focus:ring focus:ring-blue-300"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="mt-4 relative">
                        <div>
                            <label className="block text-gray-700 font-semibold">Password</label>
                            <button
                                type="button"
                                className="absolute right-3 top-0 text-gray-600 text-sm hover:text-blue-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                Forgot password ?
                            </button>

                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="p-2 w-full border rounded-md mt-1 pr-10 focus:ring focus:ring-blue-300"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-4 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-5 w-full text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-900 transition"
                    >
                        Sign In
                    </button>
                </form>

                {/* Register Link */}
                <hr className="mt-5" />
                <div className="flex justify-between mt-5 text-sm">
                    <p>Don't have an account?</p>
                    <Link href="/register" className="hover:text-blue-500">Get Registered</Link>
                </div>
            </div>
        </div>
    );
}
