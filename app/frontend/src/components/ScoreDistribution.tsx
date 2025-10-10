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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ScoreDistributionProps {
  stats: MediaStats | null;
}

const ScoreDistribution = ({ stats }: ScoreDistributionProps) => {
  const data =
    stats?.scoreDistribution?.map((item) => ({
      label: item.score,
      value: item.amount,
    })) ?? [];

  return (
    <Card className="w-1/2 bg-gray-900">
      <CardHeader>
        <CardTitle className="text-center text-gray-300">
          Score Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-50">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="label" tick={{ fill: "#d1d5db" }} />
              <YAxis tick={{ fill: "#d1d5db" }} />
              <Tooltip />
              <Bar dataKey="value" fill="#276CF5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreDistribution;
