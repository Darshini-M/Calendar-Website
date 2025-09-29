"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/utils/firebaseErrors";

interface LoginFormData {
  userName: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        data.userName,
        data.password
      );
      console.log("User logged in:", userCredential.user);
      router.push("/"); // redirect to home
    } catch (error: any) {
      const friendlyMessage = getErrorMessage(error.code);
      alert(friendlyMessage);
      console.error("Error logging in:", error.code, error.message);
    }
  }

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google sign-in successful:", user);
      router.push("/"); // redirect to home
    } catch (error: any) {
      console.error("Error with Google sign-in:", error.message);
      alert(error.message); // show error to user
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F28D8C]">
      {/* Logo / Title */}
      <div className="absolute top-6 left-8 px-4 py-2 bg-white rounded-xl shadow-md text-2xl font-extrabold text-[#F28D8C] tracking-wide cursor-pointer hover:scale-105 transition">
        My Calendar
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-10 py-7 gap-8 rounded-3xl shadow-lg w-[420px] bg-white"
      >
        <h2 className="text-center text-[#382819] text-4xl font-bold mb-4">
          Login
        </h2>

        {/* Username/Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="userName"
            className="text-lg font-medium text-gray-700"
          >
            Username/Email
          </label>
          <input
            id="userName"
            type="email"
            className="border border-gray-400 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#F28D8C]"
            {...register("userName", {
              required: "Username/Email is required",
            })}
          />
          {errors.userName?.message && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.userName.message)}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-lg font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="border border-gray-400 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#F28D8C]"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password?.message && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.password.message)}
            </p>
          )}
        </div>

        {/* Submit + Google */}
        <div className="flex flex-col gap-4 mt-2">
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-2xl hover:bg-gray-800 text-lg font-medium transition"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="bg-[#f7807e] text-white py-3 px-6 rounded-2xl hover:bg-[#f36d6b] text-lg font-medium transition"
          >
            Sign in with Google
          </button>
        </div>

        {/* Signup Link */}
        <div className="text-center mt-2">
          <a href="/signup" className="text-black hover:underline font-medium">
            Don't have an account? Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
