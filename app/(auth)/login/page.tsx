import { Metadata } from "next";
import LoginForm from "./login-form";
import { APP_NAME } from "@/constants";

export const metadata: Metadata = {
  title: `Login | ${APP_NAME}`,
  description: "Login to your account",
};

export default function LoginPage() {
  return <LoginForm />;
}
