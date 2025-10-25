import type { Recommendation } from "../types";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <div className="group mx-5 my-5 max-w-sm">
      {/* Card container with hover effects */}
      <div className="bg-slate-600 dark:bg-gray-800 rounded-sm shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-105">
        <a href={"/media_detail/" + recommendation.id} className="block">
          {/* Image container with aspect ratio */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              alt={recommendation.title.english ?? recommendation.title.romaji}
              src={recommendation.coverImage.extraLarge}
              className="w-full h-full object-cover transition duration-300 ease-in-out"
            />
          </div>

          {/* Content section */}
          <div className="p-4 h-24">
            <h3 className="font-semibold text-white text-center line-clamp-2 hover:text-blue-500 transition-colors duration-200">
              {recommendation.title.english ?? recommendation.title.romaji}
            </h3>
          </div>
        </a>
      </div>
    </div>
  );
};

export default RecommendationCard;
