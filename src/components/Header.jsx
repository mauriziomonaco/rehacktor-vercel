import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchSolution from "../hooks/useFetchSolution";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

export default function Header() {
  const initialUrl = `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_API_KEY}`;
  const { data } = useFetchSolution(initialUrl);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">🎮 ReHacktor</Link>
        </h1>

        <nav className="flex flex-wrap gap-4 items-center">
          <Link to="/" className="hover:underline">Home</Link>

          <details className="relative group">
            <summary className="cursor-pointer hover:underline">Generi</summary>
            <ul className="absolute z-10 bg-white text-black mt-2 w-40 rounded shadow-lg p-2 space-y-1">
              {data?.results.map((genre) => (
                <li key={genre.id}>
                  <Link to={`/games/${genre.slug}`} className="block px-2 py-1 hover:bg-gray-200 rounded">
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          {user && (
            <>
              <Link to="/account" className="hover:underline">Account</Link>
              <Link
                to="/profile"
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
              >
                Profilo
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/");
                }}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Registrati
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
