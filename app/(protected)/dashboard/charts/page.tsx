import { AreaChartStacked } from "@/components/charts/area-chart-stacked";
import { BarChartMixed } from "@/components/charts/bar-chart-mixed";
import { InteractiveBarChart } from "@/components/charts/interactive-bar-chart";
import { LineChartMultiple } from "@/components/charts/line-chart-multiple";
import { RadarChartSimple } from "@/components/charts/radar-chart-simple";
import { RadialChartGrid } from "@/components/charts/radial-chart-grid";
import { RadialShapeChart } from "@/components/charts/radial-shape-chart";
import { RadialStackedChart } from "@/components/charts/radial-stacked-chart";
import { RadialTextChart } from "@/components/charts/radial-text-chart";
import DashboardPageWrapper from "@/components/shared/DashboardPageWrapper";
import { APP_NAME } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Analytics & Charts | ${APP_NAME}`,
  description: "Visualize and analyze your data with interactive charts",
};

export default function ChartsPage() {
  return (
    <DashboardPageWrapper title="Charts" text="List of charts by shadcn-ui.">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialTextChart />
          <AreaChartStacked />
          <BarChartMixed />
          <RadarChartSimple />
        </div>

        <InteractiveBarChart />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialChartGrid />
          <RadialShapeChart />
          <LineChartMultiple />
          <RadialStackedChart />
        </div>
      </div>
    </DashboardPageWrapper>
  );
}
