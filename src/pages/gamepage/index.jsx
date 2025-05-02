import { useEffect } from "react";
import { useParams } from "react-router";
import ToggleFavorite from "../../components/ToggleFavorite";
import useFetchSolution from "../../hooks/useFetchSolution";
import Chatbox from "../../components/Chatbox";

export default function GamePage() {
  const { id } = useParams();
  const initialUrl = `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Caricamento...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    data && (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Colonna Immagine + Chat */}
          <div className="w-full lg:w-1/2">
            <img
              src={data.background_image}
              alt={data.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />

            {/* Chatbox SOTTO l'immagine */}
            <div className="mt-6">
              <Chatbox data={data} />
            </div>
          </div>

          {/* Colonna Descrizione */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <ToggleFavorite data={data} />
            </div>

            <p className="text-sm text-gray-500 mb-2">
              Data di uscita: {data.released}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Rating: <span className="font-semibold">{data.rating}</span>
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Descrizione</h2>
            <p className="text-gray-700 leading-relaxed">{data.description_raw}</p>
          </div>
        </div>
      </div>
    )
  );
}
