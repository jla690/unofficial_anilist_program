import React from "react";
import type { Character } from "../types";
import CharacterCard from "./CharacterCard";

interface CharacterProps {
  characters: Character[] | null;
}

const Characters = ({ characters }: CharacterProps) => {
  return (
    <div className="overflow-auto mt-5">
      <h1 className="font-bold text-center text-xl my-5">Characters</h1>
      <div className="grid grid-cols-6">
        {characters?.map((character, idx) => (
          <CharacterCard key={idx} character={character}></CharacterCard>
        ))}
      </div>
    </div>
  );
};

export default Characters;
