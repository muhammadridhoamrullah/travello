"use client";
import { RentalMobilModel } from "@/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function DetailRentalMobil() {
  const [data, setData] = useState<RentalMobilModel>();
  console.log(data, "ini data detail rental mobil");

  const detailParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);

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
    <div className="bg-red-900 w-full min-h-screen">
      <h1>Rental Cuy</h1>
    </div>
  );
}
