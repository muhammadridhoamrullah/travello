import { DetailRentalMobil } from "@/db/model/rental-mobil";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchedParams = request.nextUrl.searchParams;

    const _id = searchedParams.get("_id");
    console.log(_id, "ini _id di API rental-mobil/detail");

    const is_with_driver = searchedParams.get("is_with_driver") === "true";
    console.log(
      is_with_driver,
      "ini is with driver di API rental-mobil/detail"
    );

    const location = searchedParams.get("location");
    console.log(location, "ini location di API rental-mobil/detail");

    const available_date = searchedParams.get("available_date");
    const start_time = searchedParams.get("start_time");
    const finish_date = searchedParams.get("finish_date");
    const end_time = searchedParams.get("end_time");

    if (
      !_id ||
      is_with_driver === undefined ||
      !location ||
      !available_date ||
      !start_time ||
      !finish_date ||
      !end_time
    ) {
      throw new Error("All fields must be filled");
    }

    const detailResult = await DetailRentalMobil(_id);
    console.log(detailResult, "ini detailResult di API rental-mobil/detail");

    return NextResponse.json(
      {
        detailResult,
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
          status: 500,
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
