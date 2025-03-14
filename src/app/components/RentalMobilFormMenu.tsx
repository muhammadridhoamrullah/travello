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

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form
      onSubmit={submitHandler}
      className=" w-full h-fit flex flex-col gap-4"
    >
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
        <div className=" py-2 flex justify-between items-center gap-2 ">
          <div className=" flex-1">Lokasi Rental Anda</div>
          <div className=" flex-1">Tanggal Mulai Rental</div>
          <div className=" flex-1">Waktu Mulai</div>
          <div className=" flex-1">Tanggal Selesai</div>
          <div className=" flex-1">Waktu Selesai</div>
          <div className=" w-9 "></div>
        </div>
        <div className="  flex justify-between items-center gap-2">
          <div className=" flex-1 flex justify-start items-center gap-2 border border-white rounded-lg pl-2 py-2 ">
            <GrMap className="w-7 h-7" />
            <select
              className="w-full mr-2 h-8 cursor-pointer"
              name="location"
              id="location"
              onChange={changeHandler}
              value={formData.location}
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
              onChange={changeHandler}
              value={formData.available_date}
              className="w-full mr-2 h-8 cursor-pointer pr-2 appearance-none bg-transparent [&::-webkit-calendar-picker-indicator]:invert-[1]  "
            />
          </div>
          <div className=" flex-1 flex justify-start items-center gap-2 border border-white rounded-lg py-2 pl-2">
            <LuClock4 className="w-7 h-7" />
            <input
              type="time"
              name="start_time"
              id="start_time"
              onChange={changeHandler}
              value={formData.start_time}
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
              onChange={changeHandler}
              value={formData.finish_date}
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
              onChange={changeHandler}
              value={formData.end_time}
              className="w-full mr-2 h-8 cursor-pointer pr-2 appearance-none bg-transparent [&::-webkit-calendar-picker-indicator]:invert-[1]  "
            />
          </div>

          <button
            type="submit"
            className="w-fit h-fit p-2 rounded-lg bg-green-800 hover:bg-green-700"
          >
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Akhir Form Rental Mobil */}

      {/* Awal Tombol Submit */}
      {/* <div className="w-full flex justify-center items-center ">
        <button className="w-fit h-fit p-2 rounded-lg bg-green-800">
          Submit
        </button>
      </div> */}
      {/* Akhir Tombol Submit */}

      {/* Awal Trusted By */}
      <div className=" flex justify-center items-center gap-2 w-full  ">
        <div
          className={`w-fit flex justify-center items-center bg-white/20 p-3 gap-2 rounded-lg text-black ${poppins.className}`}
        >
          <div className="italic  font-bold text-sm w-[105px]">Trusted By</div>
          <div className="flex justify-center items-center gap-2 w-full ">
            <img
              src={"/mandarin_hotel.png"}
              alt="Pullman Hotel"
              className="w-20 h-10"
            />
            <img
              src={"/fourszn_hotel.png"}
              alt="Four Season Hotel"
              className="w-20 h-10"
            />
            <img
              src={"/jwmarriott_hotel.png"}
              alt="JW Marriott Hotel"
              className="w-20 h-10"
            />
            <img
              src={"/ritzcarlton_hotel.png"}
              alt="Ritz Carlton Hotel"
              className="w-20 h-10"
            />
          </div>
        </div>
      </div>
      {/* Akhir Trusted By */}
    </form>
  );
}

// {
//   "tipeSopir": "tanpaSopir",
//   "location": "Surabaya",
//   "available_date": "2025-03-20",
//   "start_time": "14:58",
//   "finish_date": "2025-03-28",
//   "end_time": "17:01"
// }
