import type { Recommendation } from "../types";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <div className="mx-5 my-5">
      <a href={"/media_detail/" + recommendation.id}>
        <img
          alt="CardImage"
          src={recommendation.coverImage.extraLarge}
          className="rounded-sm shadow-gray-900 shadow-lg transition duration-300 ease-in-out hover:opacity-50 opacity-100"
        ></img>
      </a>
      <div className="mt-3 font-medium text-center">
        {recommendation.title.romaji}
      </div>
    </div>
  );
};

export default RecommendationCard;
