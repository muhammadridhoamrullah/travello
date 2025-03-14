"use client";
import { poppins } from "@/font";
import Image from "next/image";
import { FaHotel } from "react-icons/fa";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { MdTrain } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import { FaTruckPlane } from "react-icons/fa6";
import { MdOutlineCarRental } from "react-icons/md";
import { MdAttractions } from "react-icons/md";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import HotelFormMenu from "../components/HotelFormMenu";
import TiketPesawatFormMenu from "../components/TiketPesawatFormMenu";
import TiketKeretaApiFormMenu from "../components/TiketKeretaApiFormMenu";
import TiketBusTravelFormMenu from "../components/TiketBusTravelFormMenu";
import AntarJemputBandaraFormMenu from "../components/AntarJemputBandaraFormMenu";
import RentalMobilFormMenu from "../components/RentalMobilFormMenu";
import AtraksiAktivitasFormMenu from "../components/AtraksiAktivitasFormMenu";
import LainnyaFormMenu from "../components/LainnyaFormMenu";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("rentalMobil");
  console.log(activeMenu, "ini active menu");

  function renderFormMenu() {
    if (activeMenu === "hotel") {
      return <HotelFormMenu />;
    } else if (activeMenu === "tiketPesawat") {
      return <TiketPesawatFormMenu />;
    } else if (activeMenu === "tiketKeretaApi") {
      return <TiketKeretaApiFormMenu />;
    } else if (activeMenu === "tiketBusTravel") {
      return <TiketBusTravelFormMenu />;
    } else if (activeMenu === "antarJemputBandara") {
      return <AntarJemputBandaraFormMenu />;
    } else if (activeMenu === "rentalMobil") {
      return <RentalMobilFormMenu />;
    } else if (activeMenu === "atraksiAktivitas") {
      return <AtraksiAktivitasFormMenu />;
    } else if (activeMenu === "lainnya") {
      return <LainnyaFormMenu />;
    }
  }

  function stylingMenu(menu: string) {
    return `flex flex-col gap-1 justify-center items-center px-4 py-2 rounded-lg cursor-pointer border ${
      activeMenu === menu
        ? "bg-white text-[#0194F3] border-white"
        : "border-transparent text-gray-300"
    } hover:${activeMenu === menu ? "" : "border-white hover:text-white"} `;
  }
  return (
    <div className="min-h-screen w-full relative">
      {/* Awal Background Hero */}
      <img
        src={"/background-hero.jpg"}
        alt=""
        className="w-full h-screen absolute object-cover top-0 left-0 z-0"
      />
      {/* Akhir Background Hero */}

      {/* Awal Konten Dalam Background Hero */}

      <div className="relative z-10 flex flex-col justify-center items-center pt-[150px] px-16 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Wujudkan Perjalananmu dengan Caramu
        </h1>

        {/* Awal Menu Andalan */}

        <div className=" w-full flex flex-col gap-4  h-fit  ">
          <div
            className={`${poppins.className} flex justify-center items-center gap-1  font-semibold`}
          >
            <div
              className={stylingMenu("hotel")}
              onClick={() => setActiveMenu("hotel")}
            >
              <FaHotel className="w-6 h-6" />
              <div>Hotel</div>
            </div>
            <div
              className={stylingMenu("tiketPesawat")}
              onClick={() => setActiveMenu("tiketPesawat")}
            >
              <BiSolidPlaneAlt className="w-6 h-6" />
              <div>Tiket Pesawat</div>
            </div>
            <div
              className={stylingMenu("tiketKeretaApi")}
              onClick={() => setActiveMenu("tiketKeretaApi")}
            >
              <MdTrain className="w-6 h-6" />
              <div>Tiket Kereta Api</div>
            </div>
            <div
              className={stylingMenu("tiketBusTravel")}
              onClick={() => setActiveMenu("tiketBusTravel")}
            >
              <FaBus className="w-5 h-6" />
              <div>Tiket Bus & Travel</div>
            </div>
            <div
              className={stylingMenu("antarJemputBandara")}
              onClick={() => setActiveMenu("antarJemputBandara")}
            >
              <FaTruckPlane className="w-6 h-6" />
              <div>Antar Jemput Bandara</div>
            </div>
            <div
              className={stylingMenu("rentalMobil")}
              onClick={() => setActiveMenu("rentalMobil")}
            >
              <MdOutlineCarRental className="w-6 h-6" />
              <div>Rental Mobil</div>
            </div>
            <div
              className={stylingMenu("atraksiAktivitas")}
              onClick={() => setActiveMenu("atraksiAktivitas")}
            >
              <MdAttractions className="w-6 h-6" />
              <div>Atraksi & Aktivitas</div>
            </div>
            <div
              className={stylingMenu("lainnya")}
              onClick={() => setActiveMenu("lainnya")}
            >
              <HiMiniSquares2X2 className="w-6 h-6" />
              <div>Lainnya</div>
            </div>
          </div>
          <div className="border-t w-full"></div>
        </div>

        {/* Akhir Menu Andalan */}

        {/* Awal Form Menu Andalan */}

        <div className="w-full  h-fit mt-2  ">{renderFormMenu()}</div>
        {/* Akhir Form Menu Andalan */}
      </div>

      {/* Akhir Konten Dalam Background Hero */}
    </div>
  );
}
