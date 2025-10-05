import React from "react";
import type { Character } from "../types";
import CharacterCard from "./CharacterCard";

interface CharacterProps {
  characters: Character[] | null;
}

const Characters = ({ characters }: CharacterProps) => {
  return (
    <div className="grid grid-cols-6">
      {characters?.map((character, idx) => (
        <CharacterCard
          key={idx}
          character={character}
        ></CharacterCard>
      ))}
    </div>
  );
};

export default Characters;
