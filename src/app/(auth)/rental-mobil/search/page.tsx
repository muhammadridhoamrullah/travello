"use client";
import { poppins } from "@/font";
import { RentalMobilModel } from "@/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function PageRentalMobil() {
  const searchParams = useSearchParams();

  const [rentalMobil, setRentalMobil] = useState<RentalMobilModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(rentalMobil, "ini rental mobil");

  async function fetchRentalMobil() {
    try {
      setLoading(true);

      const url = `http://localhost:3000/api/rental-mobil/search?${searchParams.toString()}`;
      console.log(url, "ini url");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const responseData = await response.json();

      setRentalMobil(responseData.data);
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
    fetchRentalMobil();
  }, [searchParams]);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const location = searchParams.get("location");
  const available_date = searchParams.get("available_date");
  const start_time = searchParams.get("start_time");
  const finish_date = searchParams.get("finish_date");
  const end_time = searchParams.get("end_time");
  const is_with_driver = searchParams.get("is_with_driver");
  console.log(is_with_driver, "ini is with driver");

  return (
    <div
      className={`${poppins.className} min-h-screen w-full flex flex-col  justify-start items-center gap-2`}
    >
      <div className="bg-red-600 w-full h-64 relative">
        <img
          src={"/background_rental-mobil.jpg"}
          alt="Rental Mobil"
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="bg-green-800 w-[950px] h-fit flex flex-col gap-4 ">
        <div className="bg-[#0194F3] p-3 flex flex-col gap-2">
          <div className="flex gap-2 text-sm">
            <div>Rental</div>
            <div>/</div>
            <div className="font-bold">
              {is_with_driver === "true" ? "Dengan Sopir" : "Tanpa Sopir"}
            </div>
          </div>
          <div className="bg-amber-700 flex flex-col">
            <div>
              {is_with_driver === "true"
                ? "Car Rental With Driver"
                : "Car Rental Without Driver"}
            </div>
            <div>Daerah Jadwal Dll</div>
          </div>
        </div>
        <div className="bg-red-900">Card Rental Mobil</div>
      </div>
    </div>
  );
}
