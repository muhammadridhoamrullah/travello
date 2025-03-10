"use client";
import { poppins } from "@/font";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import Swal from "sweetalert2";
import { z } from "zod";
const Cookies = require("js-cookie");

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();

  const cookiesAuth = Cookies.get("access_token");
  console.log(cookiesAuth, "ini cookies auth");

  if (cookiesAuth) {
    navigate.push("/");
  }

  function toogleShowPassword() {
    setShowPassword(!showPassword);
  }

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
        cache: "no-cache",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      Cookies.set("access_token", responseData.access_token);

      navigate.push("/");
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      } else if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;

        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${path} ${message}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Internal Server Error",
        });
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#295943]">
      <div className="w-[900px] h-[450px] bg-white  rounded-2xl flex justify-center overflow-hidden">
        <div className="bg-red-600 flex-2 relative">
          <img
            src={"/register.jpg"}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" flex-3 flex flex-col justify-center items-center gap-3 ">
          <div
            className={`${poppins.className} font-bold text-2xl text-[#295943]`}
          >
            Sign In
          </div>
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-3  w-full h-fit justify-center items-center"
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={changeHandler}
              value={formLogin.email}
              className=" w-80 h-10 p-2 border-2 border-[#295943] rounded-sm text-sm font-semibold text-[#295943]  focus:outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                onChange={changeHandler}
                value={formLogin.password}
                className=" w-80 h-10 p-2 border-2 border-[#295943] rounded-sm text-sm font-semibold text-[#295943]  focus:outline-none"
              />

              <button
                type="button"
                onClick={toogleShowPassword}
                className="absolute inset-y-0 right-3 text-[#295943] "
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <button
              type="submit"
              className={`${poppins.className} bg-green-800 w-80 h-12 mt-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-green-700 `}
            >
              LOGIN
            </button>
          </form>
          <div className={`${poppins.className} font-bold text-gray-500 `}>
            - OR -{" "}
          </div>
          <div className=" w-80 flex gap-2 justify-center">
            <div className="w-40 flex justify-center items-center border border-black  h-9 rounded-md hover:bg-gray-200 cursor-pointer">
              <FcGoogle className="w-8 h-6" />
              <div className="text-xs font-bold">Sign In with Google</div>
            </div>
            <div className="w-40 bg-[#483d8b] flex justify-center items-center h-9 rounded-md hover:bg-blue-700 cursor-pointer">
              <SiFacebook className="w-8 h-6 text-white" />
              <div className="text-[11px] text-white font-bold">
                Sign In with Facebook
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 font-bold">
            Dont have an account?{" "}
            <Link
              className="text-green-800 hover:text-green-600"
              href={"/register"}
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
