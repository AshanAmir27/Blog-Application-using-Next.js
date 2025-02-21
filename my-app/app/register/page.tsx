"use client"; // Ensures it's a Client Component
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function SignupPage() {
    const { status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    // Redirect user if already authenticated
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Signup Data:", user);
        alert("Signup successful (Implement backend logic)");
        router.push("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[25%] shadow-lg text-center">
                <h1 className="font-bold text-xl sm:text-2xl mb-4">Signup Page</h1>

                {/* Social Signup */}
                <div className="mb-4">
                    <button
                        onClick={() => signIn("google")}
                        className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 w-full text-sm sm:text-base"
                    >
                        <FcGoogle className="text-lg sm:text-xl" />
                        Sign up with Google
                    </button>

                    <button
                        onClick={() => signIn("github")}
                        className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg w-full text-sm sm:text-base"
                    >
                        <GrGithub className="text-lg sm:text-xl" />
                        Sign up with GitHub
                    </button>
                </div>

                <hr className="my-4" />

                {/* Manual Signup Form */}
                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Username Input */}
                    <div className="text-left">
                        <label className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={user.username}
                            onChange={handleChange}
                            className="p-2 w-full border rounded-md mt-1 text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="text-left">
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={user.email}
                            onChange={handleChange}
                            className="p-2 w-full border rounded-md mt-1 text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Password Input with Visibility Toggle */}
                    <div className="text-left relative">
                        <label className="block text-gray-700 font-semibold">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="p-2 w-full border rounded-md mt-1 pr-10 text-sm sm:text-base"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-4 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Signup Button */}
                    <button type="submit" className="mt-5 w-full text-white bg-gray-800 px-4 py-2 rounded-md text-sm sm:text-base">
                        Sign Up
                    </button>
                </form>

                <hr className="mt-5" />

                {/* Redirect to Login */}
                <div className="flex justify-between mt-5 text-sm sm:text-base">
                    <p>Already have an account?</p>
                    <Link href="/login">
                        <button type="button" className="text-blue-500">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
