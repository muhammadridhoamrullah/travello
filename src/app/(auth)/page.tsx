"use client";
import { poppins } from "@/font";
import Image from "next/image";
import { FaHotel } from "react-icons/fa";

export default function Home() {
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
            className={`${poppins.className} flex justify-center items-center gap-4 font-semibold`}
          >
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2 rounded-lg cursor-pointer text-gray-300  border border-transparent hover:border-white hover:text-white ">
              <FaHotel className="w-6 h-6" />
              <div>Hotel</div>
            </div>
            <div>Tiket Pesawat</div>
            <div>Tiket Kereta Api</div>
            <div>Tiket Bus & Travel</div>
            <div>Antar Jemput Bandara</div>
            <div>Rental Mobil</div>
            <div>Atraksi & Aktivitas</div>
            <div>Lainnya</div>
          </div>
          <div className="border-t w-full"></div>
        </div>

        {/* Akhir Menu Andalan */}
      </div>

      {/* Akhir Konten Dalam Background Hero */}
    </div>
  );
}
