"use client";
import { poppins } from "@/font";
import { RentalMobilModel } from "@/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "./loading";
import CardRentalMobil from "@/app/components/CardRentalMobil";

export default function PageRentalMobil() {
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const [rentalMobil, setRentalMobil] = useState<RentalMobilModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchRentalMobil() {
    try {
      setLoading(true);

      const url = `http://localhost:3000/api/rental-mobil/search?${searchParams.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const responseData = await response.json();

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

  function handleBack() {
    navigate.back();
  }

  return (
    <div
      className={`${poppins.className} min-h-screen w-full flex flex-col  justify-start items-center gap-2 pb-5`}
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
          <div className="space-y-4 ">
            {Array.from({ length: 3 }).map((_, i) => (
              <Loading key={i} />
            ))}
          </div>
        ) : rentalMobil && rentalMobil.length > 0 ? (
          rentalMobil?.map((el: RentalMobilModel, i: number) => {
            return <CardRentalMobil key={i} data={el} i={i} />;
          })
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center ">
            <div>Tidak ada rental mobil tersedia</div>
            <div className="text-sm text-gray-500">
              Silakan coba lagi dengan kriteria pencarian yang berbeda
            </div>
            <button>
              <div
                className="bg-[#0194F3] text-white p-2 rounded-lg cursor-pointer"
                onClick={handleBack}
              >
                Kembali
              </div>
            </button>
          </div>
        )}
        {/* Akhir Card Rental Mobil */}
      </div>
    </div>
  );
}
