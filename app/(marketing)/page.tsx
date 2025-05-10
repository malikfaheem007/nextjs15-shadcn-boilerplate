import BentoGrid from "@/components/sections/bentogrid";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";
import { infos } from "@/config/landing";
import { APP_NAME } from "@/constants";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Welcome to ${APP_NAME} – Your Central Hub`,
  description: "Explore features, track progress, and manage your workflow",
};

export default function IndexPage() {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      <InfoLanding data={infos[1]} />
      <Features />
      <Testimonials />
    </>
  );
}
