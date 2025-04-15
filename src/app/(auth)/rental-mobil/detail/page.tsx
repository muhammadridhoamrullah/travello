"use client";
import { poppins } from "@/font";
import { RentalMobilModel } from "@/type";
import { LoaderCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { LuLuggage } from "react-icons/lu";
import { PiSeatFill } from "react-icons/pi";
import Swal from "sweetalert2";

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(new Date(date));
};

export default function DetailRentalMobil() {
  const [data, setData] = useState<RentalMobilModel>();
  console.log(data, "ini data detail rental mobil di detail rental mobil");

  const detailParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);

  async function fetchDetailRentalMobil() {
    try {
      setLoading(true);
      const _id = detailParams.get("_id");
      console.log(_id, "ini _id di detail rental mobil");

      if (!_id) {
        throw new Error("Invalid ID");
      }

      const url = `http://localhost:3000/api/rental-mobil/detail?${detailParams.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const responseData = await response.json();

      setData(responseData.detailResult);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
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

  useEffect(() => {
    fetchDetailRentalMobil();
  }, [detailParams]);

  const _id = detailParams.get("_id");
  const location = detailParams.get("location");
  const available_date = detailParams.get("available_date");
  const start_time = detailParams.get("start_time");
  const finish_date = detailParams.get("finish_date");
  const end_time = detailParams.get("end_time");
  const is_with_driver = detailParams.get("is_with_driver");

  return (
    <div
      className={`${poppins.className} w-full min-h-screen flex flex-col justify-start items-center gap-2 pb-5`}
    >
      {/* Awal Image Hero */}
      <div className="w-full h-64 relative">
        <img
          src={`/background_rental-mobil.jpg`}
          alt="Background Rental Mobil"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Akhir Image Hero */}

      <div className="w-[950px] bg-yellow-500 h-fit flex flex-col gap-4">
        {/* Awal Filter Summary */}
        <div className="bg-[#0194F3] p-3 flex flex-col gap-2 rounded-lg">
          <div className="flex gap-2 text-sm">
            <div>Rental</div>
            <div>/</div>
            <div className="font-bold">
              {is_with_driver === "true" ? "Dengan Sopir" : "Tanpa Sopir"}
            </div>
          </div>
          <div className=" flex flex-col">
            <div className="text-xl font-bold">
              {is_with_driver === "true"
                ? "Car Rental With Driver"
                : "Car Rental Without Driver"}
            </div>
            <div className="flex justify-start items-center gap-1 text-sm text-gray-200">
              <div>{location}</div>
              <div>•</div>
              <div>
                {available_date ? `${formatDate(available_date)},` : "N/A"}
              </div>
              <div>{start_time} WIB</div>
              <div>-</div>
              <div>{finish_date ? `${formatDate(finish_date)},` : "N/A"}</div>
              <div>{end_time} WIB</div>
            </div>
          </div>
        </div>
        {/* Akhir Filter Summary */}

        {/* Awal Detail Mobil */}
        {loading ? (
          <div className="flex justify-center items-center w-full h-40">
            <LoaderCircleIcon className="w-full h-full animate-spin text-blue-500" />
          </div>
        ) : data ? (
          <div className="flex flex-col gap-2 ">
            <div className="flex justify-between rounded-md bg-white w-full h-fit p-2">
              <div className="bg-blue-700 flex-1 w-full h-14 relative">
                <img
                  src={data.image_car}
                  alt={data.car_model}
                  className="w-full h-full absolute object-contain"
                />
              </div>
              <div
                className={`${poppins.className} bg-yellow-800 flex-2 flex flex-col gap-2`}
              >
                <div className="flex flex-col">
                  <div className="font-bold text-2xl">{data.car_model}</div>
                  <div className="text-[#B18576] text-sm">
                    Disediakan oleh {data.provider} {data.location}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <div className="flex gap-1">
                      <PiSeatFill className="w-5 h-5 text-blue-600" />
                      <div className="text-sm">{data.capacity} Kursi</div>
                    </div>
                    <div className="flex gap-1">
                      <LuLuggage className="w-5 h-5 text-blue-600" />
                      <div className="text-sm">{data.bags} Bagasi</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex gap-1">
                      <FaCar className="w-5 h-5 text-blue-600" />
                      <div className="text-sm">Tahun 2019 atau setelahnya</div>
                    </div>
                    <div className="flex gap-1">
                      <GiSteeringWheel className="w-5 h-5 text-blue-600" />
                      <div className="text-sm">{data.transmission}</div>
                    </div>
                  </div>
                </div>
                <div>Fitur</div>
              </div>
            </div>
            <div>Kebijakan Rental</div>
            <div>Informasi Penting</div>
            <div>Kantor Sewa Mobil</div>
            <div>Kebijakan Refund & Reschedule</div>
            <div>Lokasi Pengambilan</div>
            <div>Lokasi Pengembalian</div>
            <div>Durasi Rental</div>
            <div>Harga Total</div>
            <div>TOMBOL LANJUTKAN</div>
          </div>
        ) : null}
        {/* Akhir Detail Mobil */}
      </div>
    </div>
  );
}
