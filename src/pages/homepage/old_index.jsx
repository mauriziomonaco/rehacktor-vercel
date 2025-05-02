import { useState, useEffect } from "react";
import CardGame from "../../components/CardGame"

export default function HomePage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const initialUrl = 'https://api.rawg.io/api/games?key=a6572e1c5cde4c20847f23a65e73cf9d&dates=2024-01-01,2024-12-31&page=1';
    
    const load = async () => {
        try {
          const response = await fetch(initialUrl);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const json = await response.json();
          setData(json);
        } catch (error) {
          setError(error.message);
          setData(null);
        }
      }
    
      useEffect(() => {
        load();
      }, []);
    
    return(
        <>
        <h1>Home Page</h1>
        <div className="grid-games-list">
            {error && <article>{error}</article>}
            {data && data.results.map((game)=>(
                <CardGame key={game.id} game={game} />
            ))}
        </div>
        </>
    );
};