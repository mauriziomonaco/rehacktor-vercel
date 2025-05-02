import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CardGame from '../../components/CardGame';


export default function GenrePage() {
    const { genre } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games?key=a6572e1c5cde4c20847f23a65e73cf9d&genres=${genre}&page=1`;

    const load = async () =>{
        try {
            const response = await fetch(initialUrl);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        }
        catch (error) {
            setError(error.message);
            setData(null);
        }
    };

    useEffect(() => {
        load();
        }, [genre]);


    return (
        <>
       <h2> Welcome to {genre} page</h2>
       <div className="grid-games-list">
        {error && <article>{error}</article>}
        {data &&
        data.result.map((game) => <CardGame key={game.id} game={game} />)}
       </div>
        </>
    );
}