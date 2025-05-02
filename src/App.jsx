import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routing } from "./routes/Routing";
import './global.css';

function App() {
  return (
    <SessionProvider>
       <FavoritesProvider>
    <Routing />
    <ToastContainer />
    </FavoritesProvider>
    </SessionProvider>
  )
}
export default App
