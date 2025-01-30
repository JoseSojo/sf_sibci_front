import { FC } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LoginPage from "./app/LoginPage";
import RegisterPage from "./app/RegisterPage";
import DashboardPage from "./app/auth/DashboardPage";
import ProfilePage from "./app/auth/ProfilePage";
import LandingPage from "./app/LandingPage";

const AppRouter: FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={LandingPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/register" Component={RegisterPage} />
                <Route path="/dashboard" Component={DashboardPage} />
                <Route path="/profile" Component={ProfilePage} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
