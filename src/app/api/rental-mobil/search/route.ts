import { SearchRentalMobil } from "@/db/model/rental-mobil";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Ambil params dari query string
    const searchedParams = request.nextUrl.searchParams;

    const is_with_driver = searchedParams.get("is_with_driver") === "true";
    const location = searchedParams.get("location");
    const available_date = searchedParams.get("available_date");
    const start_time = searchedParams.get("start_time");
    const finish_date = searchedParams.get("finish_date");
    const end_time = searchedParams.get("end_time");

    // Validasi input

    if (
      is_with_driver === undefined ||
      !location ||
      !available_date ||
      !start_time ||
      !finish_date ||
      !end_time
    ) {
      throw new Error("All fields must be filled");
    }

    const searchResult = await SearchRentalMobil({
      is_with_driver,
      location,
      available_date,
      start_time,
      finish_date,
      end_time,
    });

    return NextResponse.json(
      {
        searchResult,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
