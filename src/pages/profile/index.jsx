import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Hey {session?.user.user_metadata?.first_name} 👋
      </h2>

      <details className="mb-4">
        <summary className="cursor-pointer text-lg font-medium mb-2">
          Favoriti
        </summary>

        {favorites.length === 0 && (
          <p className="text-gray-500 mt-2">Non ci sono favoriti al momento...</p>
        )}

        <ul className="mt-3 space-y-2">
          {favorites.map((game) => (
            <li
              key={game.id}
              className="flex justify-between items-center gap-4 p-3 border rounded shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  className="rounded w-14 h-14 object-cover"
                  src={game.game_image}
                  alt={game.game_name}
                />
                <p className="font-medium">{game.game_name}</p>
              </div>

              <button
                onClick={() => removeFavorite(game.game_id)}
                className="text-red-600 hover:text-red-800"
                title="Rimuovi dai preferiti"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
