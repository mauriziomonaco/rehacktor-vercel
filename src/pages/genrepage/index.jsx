import { useEffect } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function GenrePage() {
  const { genre } = useParams();
  const initialUrl = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&genres=${genre}&page_size=20`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [genre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">Genere: {genre}</h2>

      {loading && <p className="text-gray-600">Caricamento in corso...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.results.map((game) => (
            <CardGame key={game.id} game={game} />
          ))}
      </div>
    </div>
  );
}
