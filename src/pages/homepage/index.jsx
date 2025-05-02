import { useState } from "react";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function HomePage() {
  const initialUrl = 'https://api.rawg.io/api/games?key=' + import.meta.env.VITE_RAWG_API_KEY + '&dates=2024-01-01,2024-12-31&page=1';
  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Ultimi Giochi 2024</h1>

      {loading && <p className="text-center">Caricamento in corso...</p>}
      {error && <article className="text-red-500 text-center">{error}</article>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.results?.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

