import { Link } from "react-router-dom";
import ToggleFavorite from "./ToggleFavorite";

export default function CardGame({ game }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105">
      <Link to={`/games/${game.slug}/${game.id}`}>
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1">{game.name}</h2>
          <p className="text-sm text-gray-600">Rating: {game.rating}</p>
          <p className="text-xs text-gray-500">{game.released}</p>
        </div>
      </Link>

      <div className="p-2">
        <ToggleFavorite data={game} />
      </div>
    </div>
  );
}
