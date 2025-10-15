import React from "react";
import type { MediaStats } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

interface StatusDistributionProps {
  stats: MediaStats | null;
}

const StatusDistribution = ({ stats }: StatusDistributionProps) => {
  const data =
    stats?.statusDistribution?.map((item) => ({
      label: item.status,
      value: item.amount,
    })) ?? [];

  return (
    <Card className="w-1/2 bg-gray-900">
      <CardHeader>
        <CardTitle className="text-center text-gray-300">
          Status Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
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

export default StatusDistribution;
