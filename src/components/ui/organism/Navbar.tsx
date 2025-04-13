import { FC, useEffect, useState } from "react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { RemoveToken } from "../../../service/auth/TokenStorage";
import { useAuth } from "../../../context/AuthContext";
import { NavbarChild } from "../../../types/navbar";
import { GenerateNavbar } from "../../../service/crud/dashboard/HandlerDashboard";

interface NavbarProps {
    openOrClose: () => void
}

const Navbar: FC<NavbarProps> = ({ openOrClose }) => {

    const navigate = useNavigate();
    const auth = useAuth();

    const [nav, setNav] = useState<NavbarChild[] | null>(null);

    const Logout = () => {
        RemoveToken();
        auth.setSession(false);
        navigate(`/login`, { viewTransition: true });
        return;
    }

    useEffect(() => {
        (async () => {
            const result = await GenerateNavbar({ path: `/dashboard/gui/navbar` });
            if (result) {
                setNav(result);
            }
        })()
    }, []);

    return (
        <>
        <nav className="bg-gradient-to-b from-transparent to-gray-300 dark:to-base-300 rounded-b-[20px] p-2">
            <div className="flex justify-between items-center">
                <button onClick={openOrClose} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <div className="flex items-center space-x-4">
                    <div className="dropdown dropdown-end">
                        <Button variant="border" color="accent" text="volver" click={() => navigate(-1)} />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-circle avatar bg-gray-700 text-white">
                            <span className="text-2xl font-mono">{`NG`}</span>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                            {
                                nav && nav.map(item => <Button url={item.url} text={item.label} customClass="text-gray-600 hover:text-white dark:text-gray-300 hover:bg-primary" />)
                            }
                            <Button click={Logout} text="Salir" color="error" variant="border" customClass="mt-3" />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
    )
}

export default Navbar;
