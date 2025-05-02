import { BrowserRouter, Routes, Route  } from "react-router-dom";
import HomePage from '../pages/homepage/index';
import ErrorPage from '../pages/error/index';
import GamePage from "../pages/gamepage";
import SearchPage from "../pages/searchpage";
import GenresDropdown from "../components/GenresDropdown";
import GenrePage from '../pages/genrepage/index';
import RegisterPage from '../pages/register/index';
import Layout from "../layout/Layout";
import LogoutPage from "../pages/logout";
import LoginPage from "../pages/login";
import AccountPage from "../pages/account";
import ProfilePage from "../pages/profile";



export function Routing(){
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/games/:genre" element={<GenrePage />} />
                <Route path="/games/:slug/:id" element={<GamePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/account" element={<AccountPage />}/>
                <Route path="/profile" element={<ProfilePage />} />





            </Route>
        </Routes>
        </BrowserRouter>
    );
};