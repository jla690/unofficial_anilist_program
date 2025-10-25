import type { Recommendation } from "../types";
import RecommendationCard from "./RecommendationCard";

interface RecommendationsProps {
  recommendations: Recommendation[] | null;
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <div className="mt-5 overflow-auto">
      <h1 className="font-bold text-center text-xl my-5">Recommendations</h1>
      <div className="font-bold grid grid-cols-6">
        {recommendations?.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          ></RecommendationCard>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
