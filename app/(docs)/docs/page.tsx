import { APP_NAME } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Documentation | ${APP_NAME}`,
  description: "Browse guides and API docs for developers",
};

export default function DocsPage() {
  return <div>Documentation Pages</div>;
}
