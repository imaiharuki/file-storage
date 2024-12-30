import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "./ui/chart";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { calculatePercentage } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

const Chart = ({ used = 0 }: { used: number }) => {
  const chartData = [{ storage: "used", 10: used, fill: "white" }];

  return (
    <Card className="chart">
      <CardContent>
        {/* <ChartContainer config={chartConfig} className="chart-container">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={Number(calculatePercentage(used) + 90)}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid gridType="circle" />
            <RadialBar dataKey={"storage"} background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label content={({ viewBox }) => {
                if (viewBox)
              }}/>
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer> */}
      </CardContent>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Chart;
