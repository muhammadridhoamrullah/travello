"use client";

import { poppins } from "@/font";
import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { GrMap, GrCalendar, GrClock } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";

export default function RentalMobilFormMenu() {
  const [formData, setFormData] = useState({
    tipeSopir: "tanpaSopir",
    location: "",
    available_date: "",
    start_time: "",
    finish_date: "",
    end_time: "",
  });

  console.log(formData.tipeSopir, "ini tipe sopir");

  const handleTipeSopir = (value: "tanpaSopir" | "denganSopir") => {
    setFormData({
      ...formData,
      tipeSopir: value,
    });
  };

  const daftarKota = [
    "Jakarta",
    "Surabaya",
    "Bandung",
    "Medan",
    "Semarang",
    "Makassar",
    "Palembang",
    "Yogyakarta",
    "Denpasar",
    "Malang",
  ];

  return (
    <form action="" className=" w-full h-fit flex flex-col gap-4">
      {/* Awal Sopir / Tanpa Sopir */}
      <div className={`flex  gap-2 ${poppins.className}`}>
        <div
          className={`flex justify-center items-center gap-2 px-3 py-2 rounded-full ${
            formData.tipeSopir === "tanpaSopir" ? "bg-[#0194F3]" : "bg-black/40"
          }  cursor-pointer`}
          onClick={() => {
            handleTipeSopir("tanpaSopir");
          }}
        >
          <FaCar className="w-5 h-5" />
          <div className="text-sm font-semibold">Tanpa Sopir</div>
        </div>
        <div
          className={`flex justify-center items-center gap-2 px-3 py-2 rounded-full ${
            formData.tipeSopir === "denganSopir"
              ? "bg-[#0194F3]"
              : "bg-black/40 "
          } cursor-pointer`}
          onClick={() => {
            handleTipeSopir("denganSopir");
          }}
        >
          <FaPersonCircleCheck className="w-5 h-5" />
          <div className="text-sm font-semibold">Dengan Sopir</div>
        </div>
      </div>
      {/* Akhir Sopir / Tanpa Sopir */}

      {/* Awal Form Rental Mobil */}
      <div className={`flex flex-col gap-2  ${poppins.className} text-sm`}>
        <div className=" py-2 flex justify-between items-center gap-2">
          <div className=" flex-1">Lokasi Rental Anda</div>
          <div className=" flex-1">Tanggal Mulai Rental</div>
          <div className=" flex-1">Waktu Mulai</div>
          <div className=" flex-1">Tanggal Selesai</div>
          <div className=" flex-1">Waktu Selesai</div>
        </div>
        <div className="  flex justify-between items-center gap-2">
          <div className=" flex-1 flex justify-start items-center gap-2 border border-white rounded-lg pl-2 py-2 ">
            <GrMap className="w-7 h-7" />
            <select
              className="w-full mr-2 h-8 cursor-pointer"
              name="location"
              id="location"
            >
              <option disabled>Cari Kota atau Wilayah</option>
              {daftarKota.map((el, i) => {
                return (
                  <option
                    className="bg-white text-black px-2 font-semibold text-sm"
                    key={i}
                    value={el}
                  >
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex-1 flex justify-start items-center gap-2 border border-white rounded-lg pl-2 py-2">
            <GrCalendar className="w-7 h-7" />
            <input
              type="date"
              name="available_date"
              id="available_date"
              className="w-full mr-2 h-8 cursor-pointer pr-2 appearance-none bg-transparent [&::-webkit-calendar-picker-indicator]:invert-[1]  "
            />
          </div>
          <div className=" flex-1 flex justify-start items-center gap-2 border border-white rounded-lg py-2 pl-2">
            <LuClock4 className="w-7 h-7" />
            <input
              type="time"
              name="start_time"
              id="start_time"
              lang="id"
              className="w-full mr-2 h-8 cursor-pointer pr-2 appearance-none bg-transparent [&::-webkit-calendar-picker-indicator]:invert-[1]  "
            />
          </div>
          <div className="flex-1 flex justify-start items-center gap-2 border border-white rounded-lg pl-2 py-2">
            <GrCalendar className="w-7 h-7" />
            <input
              type="date"
              name="finish_date"
              id="finish_date"
              className="w-full mr-2 h-8 cursor-pointer pr-2 appearance-none bg-transparent [&::-webkit-calendar-picker-indicator]:invert-[1]  "
            />
          </div>
          <div className=" flex-1 flex justify-start items-center gap-2 border border-white rounded-lg py-2 pl-2">
            <LuClock4 className="w-7 h-7" />
            <input
              type="time"
              name="end_time"
              id="end_time"
              lang="id"
              className="w-full mr-2 h-8 cursor-pointer pr-2 appearance-none bg-transparent [&::-webkit-calendar-picker-indicator]:invert-[1]  "
            />
          </div>
        </div>
      </div>
      {/* Akhir Form Rental Mobil */}

      {/* Awal Trusted By */}
      <div>Trusted By</div>
      {/* Akhir Trusted By */}
    </form>
  );
}
