import { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";

export default function AccountPage() {
  const { session } = useContext(SessionContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select("username, first_name, last_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAvatarUrl(data.avatar_url);
      }

      setLoading(false);
    };

    getProfile();
  }, [session]);

  const updateProfile = async (event, avatarUrl) => {
    event.preventDefault();
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
        alert(error.message);
      } else {
        setAvatarUrl(avatarUrl);
        alert("Modifica effettuata con successo");
      }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Impostazioni profilo</h2>

      <form onSubmit={(event) => updateProfile(event, avatar_url)} className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Avatar
            url={avatar_url}
            size={120}
            onUpload={(event, url) => {
              updateProfile(event, url);
            }}
          />
          <p className="text-sm text-gray-500">Clicca sull'immagine per cambiarla</p>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="text"
            value={session.user.email}
            disabled
            className="w-full mt-1 px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="username" className="block font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label htmlFor="first_name" className="block font-medium text-gray-700">
            Nome
          </label>
          <input
            id="first_name"
            type="text"
            value={first_name || ""}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block font-medium text-gray-700">
            Cognome
          </label>
          <input
            id="last_name"
            type="text"
            value={last_name || ""}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Salvataggio in corso..." : "Salva modifiche"}
          </button>
        </div>
      </form>
    </div>
  );
}
