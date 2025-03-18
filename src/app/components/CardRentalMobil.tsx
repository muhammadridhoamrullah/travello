"use client";
import { poppins } from "@/font";
import { RentalMobilModel } from "@/type";
import { GiSteeringWheel } from "react-icons/gi";
import { BsLuggage } from "react-icons/bs";
import { MdLuggage } from "react-icons/md";
import { PiSeatFill } from "react-icons/pi";
import { PiSeat } from "react-icons/pi";
import { useRouter } from "next/navigation";

interface Props {
  data: RentalMobilModel;
  i: number;
}

export default function CardRentalMobil({ data, i }: Props) {
  const navigate = useRouter();
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const searchParams = new URLSearchParams({
    _id: data._id.toString(),
    is_with_driver: data.is_with_driver.toString(),
    location: data.location,
    available_date: data.available_date,
    start_time: data.start_time,
    finish_date: data.finish_date,
    end_time: data.end_time,
  });
  console.log(searchParams, "ini searchParams card r");

  return (
    <div
      key={i}
      className=" w-full h-36 flex justify-between items-center shadow-lg rounded-lg "
    >
      {/* Awal Gambar dan Detail */}
      <div className=" w-full h-full flex justify-center items-center gap-2 ">
        <div className="flex-1 w-full h-full relative">
          <img
            src={data.image_car}
            alt={data.car_model}
            className="absolute w-full h-full object-contain"
          />
        </div>
        <div
          className={`${poppins.className} flex-2 w-full h-full flex flex-col justify-between items-start py-2`}
        >
          <div className="font-semibold">{data.car_model}</div>
          <div className="flex flex-col">
            <div className="flex  justify-start items-center  gap-1">
              <GiSteeringWheel className="w-4 h-4 text-blue-600" />
              <div className="text-sm uppercase">{data.transmission}</div>
            </div>
            <div className="flex justify-center  items-center  gap-2  ">
              <div className="flex justify-center items-center   gap-1">
                <MdLuggage className="w-4 h-4 text-blue-600" />
                <div className="text-[13px]">{data.bags} bagasi</div>
              </div>
              <div className="flex justify-center items-center  gap-1">
                <PiSeatFill className="w-4 h-4 text-blue-600" />
                <div className="text-[13px]">{data.capacity} kursi</div>
              </div>
            </div>
          </div>
          <div className="text-[13px] flex justify-center items-center gap-1">
            {data.is_with_driver ? "Dengan Sopir" : "Tanpa Sopir"}
            <div>-</div>
            <div className="font-semibold">{data.provider}</div>
          </div>
        </div>
      </div>
      {/* Akhir Gambar dan Detail */}

      {/* Awal Harga */}
      <div className=" w-full h-full flex flex-col justify-between items-end">
        <div className="flex flex-col gap-2">
          <div className="text-xs bg-[#FF6600] p-2 rounded-bl-lg rounded-tr-lg text-white">
            Gratis Jemput di Bandara
          </div>
          <div className=" flex flex-col justify-center items-end pr-2">
            <div className="text-xs text-gray-500">Dari</div>
            <div className="flex justify-center items-center gap-1 ">
              <div className="text-2xl font-bold text-[#FF6600]">
                {formatRupiah(data.price_per_day)}
              </div>
              <div className="text-xs text-gray-500">/hari</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            navigate.push(
              `/rental-mobil/detail?${searchParams.toString()}
              }`
            );
          }}
          className="bg-[#FF6600] mb-2 mr-4 py-2 px-16 rounded-lg hover:bg-[#DF440F] cursor-pointer text-white"
        >
          Lanjutkan
        </button>
      </div>
      {/* Akhir Harga */}
    </div>
  );
}
