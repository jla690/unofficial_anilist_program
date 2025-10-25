import React from "react";
import type { TrendingMedia } from "../types";

interface TrendingCardProp {
  media: TrendingMedia | null;
}

const TrendingCard = ({ media }: TrendingCardProp) => {
  return (
    <div>
      <div className="col-span-1 w-48 h-72 items-center justify-center transition duration-300 hover:shadow-2xl hover:scale-105 shadow-sm mx-5 my-10 bg-gray-700">
        <a href={"/media_detail/" + media?.id} className="block">
          <img
            alt="trending_card"
            className="w-48 h-64 object-cover rounded-t-sm ease-in-out"
            src={media?.coverImage.large}
          ></img>
          <div className="bg-slate-600 flex items-center justify-center text-center rounded-b-sm h-16 px-2">
            <p className="line-clamp-2 leading-tight text-md">
              {media?.title.english ?? media?.title.romaji}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default TrendingCard;
