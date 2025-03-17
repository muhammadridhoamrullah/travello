"use client";
import { poppins } from "@/font";
import { RentalMobilModel } from "@/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "./loading";

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
      console.log(response, "ini response di page search");

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const responseData = await response.json();
      console.log(
        responseData.searchResult,
        "ini response data di page search"
      );

      setRentalMobil(responseData.searchResult);
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
    console.log("Use Effect");

    fetchRentalMobil();
    console.log("Use Effect berhasil");
  }, [searchParams]);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
    }).format(new Date(date));
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
      {/* Awal Image Hero */}
      <div className=" w-full h-64 relative">
        <img
          src={"/background_rental-mobil.jpg"}
          alt="Rental Mobil"
          className="absolute w-full h-full object-cover"
        />
      </div>
      {/* Akhir Image Hero */}

      <div className=" w-[950px] h-fit flex flex-col gap-4 ">
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

        {/* Awal Card Rental Mobil */}
        {loading ? (
          <Loading />
        ) : (
          rentalMobil?.map((el: RentalMobilModel, i: number) => {
            return (
              <div key={i} className="bg-red-900 w-full h-36">
                <img src={el.image_car} alt="" />
                <div>{el.car_model}</div>
              </div>
            );
          })
        )}
        {/* Akhir Card Rental Mobil */}
      </div>
    </div>
  );
}
