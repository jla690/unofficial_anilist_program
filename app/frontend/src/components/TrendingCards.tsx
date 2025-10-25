import React from "react";
import type { TrendingMedia } from "../types";
import TrendingCard from "./TrendingCard";

interface TrendingCardsProps {
  mediaList: TrendingMedia[] | null;
}

const TrendingCards = ({ mediaList }: TrendingCardsProps) => {
  return (
    <div className="text-gray-300 grid grid-cols-5 my-5">
      {mediaList?.map((media) => (
        <TrendingCard key={media.id} media={media}></TrendingCard>
      ))}
    </div>
  );
};

export default TrendingCards;
