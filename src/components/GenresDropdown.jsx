import { Link } from 'react-router-dom';
import useFetchSolution from '../hooks/useFetchSolution';



export default function GenresDropdown() {
  const initialUrl = "https://api.rawg.io/api/genres?key=a6572e1c5cde4c20847f23a65e73cf9d";
  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <details className="dropdown">
      <summary>Genres</summary>

      {loading && <small>Caricamento...</small>}
      {error && <small className="text-red-500">{error}</small>}

      <ul>
        {data && data.results.map((genre) => (
          <li key={genre.id}>
            <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
