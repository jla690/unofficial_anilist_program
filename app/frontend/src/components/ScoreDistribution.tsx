import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MediaStats } from "../types";

interface ScoreDistributionProps {
  stats: MediaStats | null;
}

const ScoreDistribution = ({ stats }: ScoreDistributionProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart
        data={stats?.scoreDistribution}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey={"score"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={"amount"} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreDistribution;
