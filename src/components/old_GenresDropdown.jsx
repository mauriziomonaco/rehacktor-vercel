import { useState, useEffect } from "react";
import { Link } from 'react-router';


export default function GenresDropdown() {
const [genres, setGenres] = useState([]);
const [error, setError] = useState(null);

const initialUrl = "https://api.rawg.io/api/genres?key=a6572e1c5cde4c20847f23a65e73cf9d";

const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setGenres(json);
    } catch (error) {
      setError(error.message);
      setGenres(null);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
    <details className="dropdown">
        <summary>Genres</summary>
        {error && <small>{error}</small>}
        <ul>
            {genres && genres.results.map((genre) => (
                <li key={genre.id}>
                  <Link to={'/games/${genre.slug}'}>{genre.name}</Link>
                </li>
            ))}
        </ul>

    </details>
    </>
  );

}