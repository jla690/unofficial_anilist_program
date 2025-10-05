import React from "react";
import type { Recommendation } from "../types";
import RecommendationCard from "./RecommendationCard";

interface RecommendationsProps {
  recommendations: Recommendation[] | null;
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <div className="font-bold grid grid-cols-6">
      {recommendations?.map((recommendation) => (
        <RecommendationCard
          key={recommendation.id}
          recommendation={recommendation}
        ></RecommendationCard>
      ))}
    </div>
  );
};

export default Recommendations;
