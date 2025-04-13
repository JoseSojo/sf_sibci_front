import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectRoute () {

    const auth = useAuth();

    return auth.session ? <><Outlet /></> : <Navigate to={`/login`} />

}
