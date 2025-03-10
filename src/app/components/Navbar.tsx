"use client";

import { poppins } from "@/font";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbDiscount } from "react-icons/tb";
import { FiHelpCircle } from "react-icons/fi";
import { RiCustomerService2Fill } from "react-icons/ri";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { LuTicketsPlane } from "react-icons/lu";
import { CgData } from "react-icons/cg";
import { PiWalletBold } from "react-icons/pi";
import { LiaBinocularsSolid } from "react-icons/lia";
import { GoGift } from "react-icons/go";
import { TbShip } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
const Cookies = require("js-cookie");

export default function Navbar() {
  const [showBantuanDropdown, setShowBantuanDropdown] = useState(false);
  const [showProdukLainnyaDropdown, setShowProdukLainnyaDropdown] =
    useState(false);

  const cookiesAuth = Cookies.get("access_token");

  return (
    <div className="fixed top-0 left-0 w-full  z-50 px-20 py-2 flex flex-col justify-center gap-2 ">
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
              <div className="bg-white border absolute top-full right-0 rounded-md shadow-md mt-1 py-2 min-w-36 z-10 flex flex-col gap-2">
                <div className="flex h-8 justify-center items-center gap-2 text-[#6B7479] text-sm hover:bg-gray-200">
                  <FiHelpCircle className="w-5 h-5" />
                  <Link href={"/pusat-bantuan"}>Pusat Bantuan</Link>
                </div>
                <div className="flex h-8 justify-center items-center gap-2 text-[#6B7479] text-sm hover:bg-gray-200">
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

          {cookiesAuth ? (
            <button className="py-2 px-4 border border-[#0194F3]  rounded-md text-[#0194F3] cursor-pointer hover:bg-[#007CE8] hover:text-white">
              Logout
            </button>
          ) : (
            <div className="flex gap-1 items-center">
              <button className="border border-blue-700 rounded-md p-2 flex justify-center items-center gap-2 hover:bg-gray-200 cursor-pointer">
                <FaUser className="w-3 h-4 text-[#0194F3]" />
                <Link href={"/login"} className="text-sm">
                  Log In
                </Link>
              </button>
              <button className="py-2 px-4 bg-[#0194F3] rounded-md text-white cursor-pointer hover:bg-[#007CE8]">
                <Link href={"/register"}>Daftar</Link>
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${poppins.className} flex justify-start gap-2 items-center text-sm text-black font-bold  `}
      >
        <Link
          className="w-fit h-8 flex items-center justify-center p-2 rounded-md hover:bg-gray-200"
          href={"/hotel"}
        >
          Hotel
        </Link>
        <Link
          className="w-fit h-8 flex justify-center items-center p-2 rounded-md hover:bg-gray-200"
          href={"/tiket-pesawat"}
        >
          Tiket Pesawat
        </Link>
        <Link
          className="w-fit h-8 flex justify-center items-center p-2 rounded-md hover:bg-gray-200"
          href={"/tiket-kereta-api"}
        >
          Tiket Kereta Api
        </Link>
        <Link
          className="w-fit h-8 flex justify-center items-center p-2 rounded-md hover:bg-gray-200"
          href={"/bus-and-shuttle"}
        >
          Tiket Bus & Travel
        </Link>
        <Link
          className="w-fit h-8 flex justify-center items-center p-2 rounded-md hover:bg-gray-200"
          href={"/airport-transfer"}
        >
          Antar Jemput Bandara
        </Link>
        <Link
          className="w-fit h-8 flex justify-center items-center p-2 rounded-md hover:bg-gray-200"
          href={"/car-rental"}
        >
          Rental Mobil
        </Link>
        <Link
          className="w-fit h-8 flex justify-center items-center p-2 rounded-md hover:bg-gray-200"
          href={"/activities"}
        >
          Atraksi & Aktivitas
        </Link>
        <div className="relative">
          <div
            className="flex justify-center items-center cursor-pointer w-fit h-8 p-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setShowProdukLainnyaDropdown(!showProdukLainnyaDropdown);
            }}
          >
            <span>Produk Lainnya</span>
            <IoMdArrowDropdown />
          </div>

          {showProdukLainnyaDropdown && (
            <div className="absolute bg-white border top-full right-0 rounded-md shadow-md mt-1 py-2 w-60 z-10 flex flex-col gap-2">
              <div className="flex justify-start items-center h-10 gap-2 text-[#6B7479] text-sm hover:bg-gray-200 px-2">
                <MdOutlineAirplaneTicket className="w-7 h-7" />
                <Link href={"/packages"}>Pesawat + Hotel</Link>
              </div>
              <div className="flex justify-start items-center h-10 gap-2 text-[#6B7479] text-sm hover:bg-gray-200 px-2">
                <LuTicketsPlane className="w-7 h-7" />
                <Link href={"/insurance"}>Asuransi Perjalanan</Link>
              </div>

              <div className="flex justify-start items-center gap-2 h-10 text-[#6B7479] text-sm hover:bg-gray-200 px-2">
                <CgData className="w-7 h-7" />
                <Link href={"/international-data"}>Internet Luar Negeri</Link>
              </div>
              <div className="flex justify-start items-center gap-2 h-10 text-[#6B7479] text-sm hover:bg-gray-200 px-2">
                <PiWalletBold className="w-7 h-7" />
                <Link href={"/traveloka-paylater"}>TPayLater</Link>
              </div>
              <div className="flex justify-start items-center gap-2 h-10 text-[#6B7479] text-sm hover:bg-gray-200 px-2">
                <LiaBinocularsSolid className="w-7 h-7" />
                <Link href={"/guides"}>Panduan Wisata</Link>
              </div>
              <div className="flex justify-start items-center gap-2 h-10 text-[#6B7479] text-sm hover:bg-gray-200 px-2">
                <GoGift className="w-7 h-7" />
                <Link href={"/gift-voucher"}>Gift Voucher</Link>
              </div>
              <div className="flex justify-start items-center gap-2 h-10 text-[#6B7479] text-sm hover:bg-gray-200 px-2">
                <TbShip className="w-7 h-7" />
                <Link href={"/cruise"}>Cruises</Link>
              </div>
              <div className="flex justify-start items-center gap-2 h-10 text-[#6B7479] text-sm hover:bg-gray-200 px-2">
                <FaRegAddressCard className="w-7 h-7" />
                <Link href={"/traveloka-mandiri-card"}>
                  Traveloka Mandiri Card
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
