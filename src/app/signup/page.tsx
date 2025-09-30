"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/utils/firebaseErrors";

interface SignupFormData {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();
  const router = useRouter();

  async function onSubmit(data: SignupFormData) {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.userName, // email field
          data.password
        );
      console.log("User signed up:", userCredential.user);
      router.push("/login"); // redirect to login
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      const friendlyMessage = getErrorMessage(error.code);
      alert(friendlyMessage);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F28D8C]">
      {/* Logo / Title */}
      <div className="absolute top-6 left-6 px-3 py-1.5 bg-white rounded-lg shadow text-xl font-bold text-[#F28D8C] tracking-wide cursor-pointer hover:scale-105 transition">
        My Calendar
      </div>

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-8 py-6 gap-4 rounded-2xl shadow-md w-[400px] bg-white"
      >
        <h2 className="text-center text-[#382819] text-3xl font-bold mb-2">
          Sign Up
        </h2>

        {/* First Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="firstName"
            className="text-base font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="border border-gray-400 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-[#F28D8C]"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName?.message && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.firstName.message)}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="lastName"
            className="text-base font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="border border-gray-400 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-[#F28D8C]"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName?.message && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.lastName.message)}
            </p>
          )}
        </div>

        {/* Username/Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="userName"
            className="text-base font-medium text-gray-700"
          >
            Username/Email
          </label>
          <input
            id="userName"
            type="email"
            className="border border-gray-400 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-[#F28D8C]"
            {...register("userName", {
              required: "Username/Email is required",
            })}
          />
          {errors.userName?.message && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.userName.message)}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-base font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="border border-gray-400 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-[#F28D8C]"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password?.message && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.password.message)}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-base font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="border border-gray-400 rounded-md p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-[#F28D8C]"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.confirmPassword.message)}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white py-2.5 px-5 rounded-xl hover:bg-gray-800 text-base font-medium transition"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <div className="text-center mt-1">
          <a
            href="/login"
            className="text-black hover:underline text-sm font-medium"
          >
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
}
