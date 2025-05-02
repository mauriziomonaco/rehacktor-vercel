import useFetchSolution from "../hooks/useFetchSolution";
import { Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

export default function Sidebar() {
  const initialUrl = `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_API_KEY}`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <aside className="bg-gradient-to-b from-white to-gray-100 p-5 rounded-xl shadow-lg border border-gray-200 max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
        <FaGamepad className="text-indigo-500" />
        Generi
      </h2>

      {loading && <p className="text-sm text-gray-500">Caricamento...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <ul className="space-y-2">
        {data?.results?.map((genre) => (
          <li key={genre.id}>
            <Link
              to={`/games/${genre.slug}`}
              className="flex items-center gap-2 text-gray-700 px-3 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition font-medium"
            >
              <FaGamepad className="text-indigo-400" />
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
