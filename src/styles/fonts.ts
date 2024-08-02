import { Lato, Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["200", "300", "400", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export { lato, montserrat };
