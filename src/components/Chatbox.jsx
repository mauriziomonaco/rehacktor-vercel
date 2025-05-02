import { useContext } from "react";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";

export default function Chatbox({ data }) {
  const { session } = useContext(SessionContext);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const message = form.message.value.trim();

    if (!message) return;

    const username = session?.user?.user_metadata?.username || "Anonimo";

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          profile_id: session.user.id,
          profile_username: username,
          game_id: data.id,
          content: message,
        },
      ]);

    if (!error) {
      form.reset();
    } else {
      console.error("Errore invio messaggio:", error.message);
    }
  };

  return (
    <div className="border-t mt-10 pt-6">
      <h3 className="text-xl font-semibold mb-4">💬 Gamers chat</h3>

      {/* Messaggi realtime */}
      <div className="mb-4">
        <RealtimeChat data={data} />
      </div>

      {/* Form invio messaggi */}
      {session ? (
        <form onSubmit={handleMessageSubmit} className="flex gap-2 mt-4">
          <input
            type="text"
            name="message"
            placeholder="Scrivi un messaggio..."
            className="flex-1 px-3 py-2 border rounded focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
          >
            Invia
          </button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-gray-500">
          🔒 Effettua il login per partecipare alla chat.
        </p>
      )}
    </div>
  );
}
