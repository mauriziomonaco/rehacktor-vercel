import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import useFetchSolution from "../hooks/useFetchSolution";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const initialUrl = `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_API_KEY}`;
  const { data } = useFetchSolution(initialUrl);
  const [menuOpen, setMenuOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);

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
    <header className="bg-gray-900 text-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">🎮 ReHacktor</Link>
        </h1>

        {/* Bottone hamburger mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-4 items-center">
          <Link to="/" className="hover:underline">Home</Link>

          <div className="relative group">
            <span className="cursor-pointer hover:underline">Generi</span>
            <ul className="absolute hidden group-hover:block z-10 bg-white text-black mt-2 w-40 rounded shadow-lg p-2 space-y-1">
              {data?.results.map((genre) => (
                <li key={genre.id}>
                  <Link to={`/games/${genre.slug}`} className="block px-2 py-1 hover:bg-gray-200 rounded">
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {user ? (
            <>
              <Link to="/account" className="hover:underline">Account</Link>
              <Link to="/profile" className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">Profilo</Link>
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
          ) : (
            <>
              <Link to="/login" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">Login</Link>
              <Link to="/register" className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Registrati</Link>
            </>
          )}
        </nav>
      </div>

      {/* MENU MOBILE FULL SCREEN */}
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-900 text-white z-50 flex flex-col p-8 space-y-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-white text-2xl">
              <FaTimes />
            </button>
          </div>

          <Link to="/" onClick={() => setMenuOpen(false)} className="text-lg hover:underline">🏠 Home</Link>

          <div>
            <button
              onClick={() => setGenresOpen(!genresOpen)}
              className="w-full text-left text-lg font-semibold hover:underline"
            >
              🎮 Generi
            </button>
            {genresOpen && (
              <ul className="mt-2 space-y-2 pl-4">
                {data?.results.map((genre) => (
                  <li key={genre.id}>
                    <Link
                      to={`/games/${genre.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="block hover:text-yellow-300"
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {user ? (
            <>
              <Link to="/account" onClick={() => setMenuOpen(false)} className="hover:underline">Account</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:underline">Profilo</Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/");
                }}
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition">Registrati</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
