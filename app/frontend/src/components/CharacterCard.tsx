import type { Character } from "../types";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="mx-5 my-5">
      <img
        className="rounded-sm shadow-gray-900 shadow-lg"
        alt="CharacterImage"
        src={character.image}
      ></img>
      <div className="mt-3 font-medium text-center">{character.name}</div>
    </div>
  );
};

export default CharacterCard;
