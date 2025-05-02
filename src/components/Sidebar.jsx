import useFetchSolution from "../hooks/useFetchSolution";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const initialUrl = `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_API_KEY}`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <aside className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Generi</h2>

      {loading && <p className="text-sm">Caricamento...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ul className="space-y-2">
        {data?.results?.map((genre) => (
          <li key={genre.id}>
            <Link
              to={`/games/${genre.slug}`}
              className="text-blue-600 hover:underline block"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
