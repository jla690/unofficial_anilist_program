import React from "react";
import type { MediaStats } from "../types";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
  CartesianGrid,
} from "recharts";

interface StatusDistributionProps {
  stats: MediaStats | null;
}

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];

const StatusDistribution = ({ stats }: StatusDistributionProps) => {
  return (
    <div>
      <div className="text-center font-bold mb-1 text-gray-300">
        Status Distribution
      </div>
      <ResponsiveContainer width={"50%"} height={180}>
        <BarChart
          data={stats?.statusDistribution}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid stroke="#374151" vertical={false} />{" "}
          {/* Tailwind gray-700 */}
          <XAxis
            dataKey={"status"}
            tick={{ fill: "#d1d5db", fontWeight: "bold" }} // Tailwind gray-300
            axisLine={{ stroke: "#6b7280" }} // Tailwind gray-500
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#d1d5db", fontWeight: "bold" }}
            axisLine={{ stroke: "#6b7280" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937", // Tailwind gray-800
              border: "none",
              color: "#f3f4f6", // Tailwind gray-100
            }}
            itemStyle={{ color: "#f3f4f6" }}
            labelStyle={{ color: "#f3f4f6" }}
          />
          <Legend wrapperStyle={{ color: "#d1d5db" }} />
          <Bar
            dataKey={"amount"}
            radius={[8, 8, 0, 0]}
            label={{
              position: "top",
              fill: "#d1d5db",
              fontWeight: "bold",
            }}
          >
            {stats?.statusDistribution?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusDistribution;
