import { RentalMobilModel } from "@/type";
import { GetDB } from "../config";

const COLLECTION_NAME = "rental-mobil";

type InputFormSearchRentalMobil = Pick<
  RentalMobilModel,
  | "is_with_driver"
  | "location"
  | "available_date"
  | "start_time"
  | "finish_date"
  | "end_time"
>;

export async function SearchRentalMobil(inputUser: InputFormSearchRentalMobil) {
  const db = await GetDB();

  const checkTanggal = inputUser.finish_date < inputUser.available_date;

  if (checkTanggal) {
    throw new Error("Tanggal selesai harus setelah tanggal mulai");
  }

  const searchResult = await db
    .collection(COLLECTION_NAME)
    .find({
      is_with_driver: inputUser.is_with_driver,
      location: inputUser.location,
      available_date: { $lte: inputUser.available_date },
      start_time: { $lte: inputUser.start_time },
      finish_date: { $gte: inputUser.finish_date },
      end_time: { $gte: inputUser.end_time },
    })
    .toArray();

  return searchResult;
}
