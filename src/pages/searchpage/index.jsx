import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // NB: deve combaciare con ?q=... nella URL

  const url = query
    ? `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${query}`
    : null;

  const { loading, data, error, updateUrl } = useFetchSolution(url);

  useEffect(() => {
    if (url) updateUrl(url);
  }, [url, updateUrl]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Risultati per: <span className="text-blue-600">{query}</span>
      </h1>

      {loading && <p className="text-center">Caricamento in corso...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.results?.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
