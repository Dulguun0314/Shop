"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { month: "01/06", desktop: 186 },
  { month: "01/07", desktop: 305 },
  { month: "01/08", desktop: 237 },
  { month: "01/09", desktop: 73 },
  { month: "01/10", desktop: 209 },
  { month: "01/11", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "black",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ width: "20" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={8}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
