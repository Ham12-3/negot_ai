import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

interface OverallScoreChartProps {
  overallScore: number;
}

export default function OverallScoreChart({
  overallScore,
}: OverallScoreChartProps) {
  const pieChartData = [
    { name: "Risks", value: 100 - overallScore, fill: "hsl(var(--chart-1))" },
    { name: "Opportunities", value: overallScore, fill: "hsl(var(--chart-2))" },
  ];

  const chartConfig ={
    value: {
        value: "value",

    },
    Risks: {
        label: "Risks",
        color: "hsl(var(--chart-1))",
    },
    Opportunities: {
        label: "Opportunities",
        color: "hsl(var(--chart-2))",
    },
  }
}
