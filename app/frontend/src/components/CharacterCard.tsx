import type { Character } from "../types";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="group mx-5 my-5 max-w-sm">
      <div className="bg-slate-600 dark:bg-gray-800 rounded-sm shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-105">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-sm transition duration-300 ease-in-out"
            alt="CharacterImage"
            src={character.image}
          ></img>
        </div>
        <div className="p-4 h-28">
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
