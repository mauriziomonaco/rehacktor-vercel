import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";
import SessionContext from "../context/SessionContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ToggleFavorite({ data }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();

  const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);

  const handleClick = () => {
    if (!session?.user) {
      toast.warn("Devi effettuare l'accesso per salvare giochi!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => navigate("/login")
      });
      return;
    }

    isFavorite() ? removeFavorite(data.id) : addFavorite(data);
  };

  return (
    <button
      onClick={handleClick}
      className="text-xl text-red-500 hover:scale-110 transition-transform"
      title="Aggiungi o rimuovi dai preferiti"
    >
      {isFavorite() ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
