import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

interface Props {
  searchParams: {
    error: string;
  };
}

export default function Register({ searchParams }: Props) {
  async function submitHandler(formData: FormData) {
    "use server";

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });
    console.log(response, "ini response register");

    const responseData = await response.json();

    console.log(responseData, "ini response data register");

    console.log(response.ok, "ini response ok register");

    if (!response.ok) {
      return redirect(
        `/register?error=${encodeURIComponent(responseData.message)}`
      );
    }

    return redirect("/login");
  }
  return (
    <form
      action={submitHandler}
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-red-600 to-blue-900"
    >
      <div className="w-[900px] h-[450px] border border-white rounded-2xl flex  justify-center overflow-hidden ">
        <div className="flex-2 h-full relative">
          <img
            src={"/register.jpg"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-3 bg-white flex gap-7 flex-col justify-center items-center  ">
          <div className="text-xl font-extrabold">Create Account</div>
          {searchParams.error && (
            <div className="bg-red-100 text-red-700 p-2 rounded-md">
              {searchParams.error}
            </div>
          )}
          <div className="flex gap-3">
            <div className="border border-black w-48 h-10 flex items-center justify-center rounded-lg gap-2 hover:bg-gray-200 cursor-pointer">
              <FcGoogle className=" w-8 h-6" />
              <div className="text-xs font-bold">Signup with Google</div>
            </div>
            <div className="bg-[#483d8b] w-48 h-10 flex justify-center items-center rounded-lg gap-2 hover:bg-blue-700 cursor-pointer">
              <SiFacebook className=" w-8 h-6 text-white" />
              <div className="text-xs font-bold text-white">
                Signup with Facebook
              </div>
            </div>
          </div>
          <div className=" text-xs text-gray-500">- OR -</div>
          <div className="flex flex-col gap-3 w-[390px] h-fit text-sm font-bold">
            <div className="flex  justify-between">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="w-[190px] h-8 p-2 border border-black rounded-sm"
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="w-[190px] h-8 p-2 border border-black rounded-sm"
              />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="w-full h-8 p-2 border border-black rounded-sm"
            />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone Number (081234567890)"
              inputMode="numeric"
              className="w-full h-8 p-2 border border-black rounded-sm"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full h-8 border p-2 border-black rounded-sm"
            />

            <button
              type="submit"
              className="w-full h-10 bg-green-800 rounded-sm text-white hover:bg-green-700 cursor-pointer"
            >
              Create Account
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Already have an account?
            <Link
              className="font-bold text-green-800 hover:text-green-700"
              href={"/login"}
            >
              {" "}
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
