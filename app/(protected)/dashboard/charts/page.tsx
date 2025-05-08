import { APP_NAME } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Analytics & Charts | ${APP_NAME}`,
  description: "Visualize and analyze your data with interactive charts",
};

export default function ChartsPage() {
  return <div>Charts Pages</div>;
}
