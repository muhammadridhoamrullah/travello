import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // kamu bisa memilih berat font sesuai kebutuhan
  style: ["normal", "italic"], // sesuaikan dengan kebutuhan
});
