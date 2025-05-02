import { useEffect, useState, useRef, useCallback, useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
  const { session } = useContext(SessionContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);

  const getMessages = useCallback(async () => {
    setLoading(true);
    const { data: messagesData, error } = await supabase
      .from("messages")
      .select("*")
      .eq("game_id", data.id)
      .order("update_at", { ascending: false });

    if (error) {
      setError("Errore nel caricamento messaggi");
      console.error(error.message);
    } else {
      setMessages(messagesData);
    }
    setLoading(false);
  }, [data.id]);

  useEffect(() => {
    getMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => getMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [getMessages]);

  return (
    <div
      ref={messageRef}
      className="bg-white border border-gray-300 rounded-md max-h-80 overflow-y-auto px-4 py-3 space-y-4 shadow-inner"
    >
      {loading && <p className="text-gray-500">Caricamento messaggi...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {messages.length === 0 ? (
        <p className="text-gray-500">Nessun messaggio ancora.</p>
      ) : (
        messages.map((msg) => {
          const isMine = session?.user?.id === msg.profile_id;
          return (
            <div
              key={msg.id}
              className={`rounded-md px-3 py-2 text-sm shadow-sm border ${
                isMine
                  ? "bg-green-100 border-green-200 text-green-800 ml-auto"
                  : "bg-blue-50 border-blue-200 text-blue-800 mr-auto"
              } max-w-[80%]`}
            >
              <div className="flex justify-between items-center mb-1">
                <strong className="text-sm">{msg.profile_username}</strong>
                <span className="text-xs text-gray-500">
                  {dayjs(msg.update_at).fromNow()}
                </span>
              </div>
              <p className="break-words">{msg.content}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
