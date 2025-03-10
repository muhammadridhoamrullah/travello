"use client";

import { poppins } from "@/font";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbDiscount } from "react-icons/tb";
import { FiHelpCircle } from "react-icons/fi";
import { RiCustomerService2Fill } from "react-icons/ri";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [showBantuanDropdown, setShowBantuanDropdown] = useState(false);
  return (
    <div className=" px-20 py-2 flex flex-col justify-center ">
      <div className="flex justify-between">
        <div className="w-36 h-10 relative ">
          <Link href={"/"}>
            <img src={"/traveloka.png"} alt="" />
          </Link>
        </div>
        <div className=" flex items-center gap-4 font-semibold">
          <div className=" flex justify-center items-center gap-1 cursor-pointer  w-fit h-10 px-2 hover:bg-gray-200 rounded-md ">
            <img src={"/indonesia.png"} alt="" className="w-7 h-7" />
            <div className={`${poppins.className} text-sm `}>ID | IDR</div>
          </div>
          <div className="flex items-center justify-center  cursor-pointer w-fit h-10 px-2 rounded-md hover:bg-gray-200">
            <TbDiscount className="w-6 h-5" />
            <div className={`${poppins.className} text-sm `}>Promo</div>
          </div>
          <div className="relative">
            <div
              className="flex items-center cursor-pointer w-fit h-10 px-2 rounded-md hover:bg-gray-200"
              onClick={() => {
                setShowBantuanDropdown(!showBantuanDropdown);
              }}
            >
              <span>Bantuan</span>
              <IoMdArrowDropdown />
            </div>

            {showBantuanDropdown && (
              <div className="border border-black absolute top-full right-0 rounded-md shadow-md mt-1 py-2 min-w-36 z-10 flex flex-col gap-2">
                <div className="flex justify-center items-center gap-2 text-[#6B7479] text-sm">
                  <FiHelpCircle className="w-5 h-5" />
                  <Link href={"/pusat-bantuan"}>Pusat Bantuan</Link>
                </div>
                <div className="flex justify-center items-center gap-2 text-[#6B7479] text-sm">
                  <RiCustomerService2Fill className="w-5 h-5" />
                  <Link href={"/hubungi-kami"}>Hubungi Kami</Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center w-fit h-10 px-2 rounded-md hover:bg-gray-200 cursor-pointer">
            Jadi Mitra
          </div>
          <div className="w-fit h-10 px-2 rounded-md hover:bg-gray-200 flex justify-center items-center cursor-pointer">
            For Corporates
          </div>
          <div className="w-fit h-10 px-2 rounded-md hover:bg-gray-200 flex justify-center items-center cursor-pointer">
            Pesanan
          </div>
          <div className="flex gap-1 items-center">
            <button className="border border-blue-700 rounded-md p-2 flex justify-center items-center gap-2 hover:bg-gray-200 cursor-pointer">
              <FaUser className="w-3 h-4 text-[#0194F3]" />
              <div className="text-sm">Log In</div>
            </button>
            <button className="py-2 px-4 bg-[#0194F3] rounded-md text-white cursor-pointer hover:bg-[#007CE8]">
              Daftar
            </button>
          </div>
        </div>
      </div>
      <div>Tiket Pesawat dll</div>
    </div>
  );
}
