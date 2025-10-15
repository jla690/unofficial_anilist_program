import type { Character } from "../types";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="group mx-5 my-5 max-w-sm">
      <div className="bg-gray-700 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-105">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            className="rounded-sm shadow-gray-900 shadow-lg transition duration-300 ease-in-out hover:opacity-50 opacity-100"
            alt="CharacterImage"
            src={character.image}
          ></img>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <div className="font-semibold text-white text-center line-clamp-2 hover:text-blue-500 transition-colors duration-200">
            {character.name}
          </div>
          <div className="mt-3 font-medium text-center text-sm text-gray-300">
            {character.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
