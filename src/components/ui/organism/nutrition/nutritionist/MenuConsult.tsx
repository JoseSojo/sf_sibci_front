import { FC } from "react"
import AbstractList from "../../../../../app/auth/abstract/partials/AbstractList";
import Subtitle from "../../../atoms/text/Subtitle";
import Button from "../../../atoms/Button";
import { useLocation } from "react-router-dom";

interface MenuConsultProps {
    id: string
}

const MenuConsult: FC<MenuConsultProps> = ({ id }) => {

    const location = useLocation();
    return (
        <div>
            <div className="w-full flex justify-between">
                <Subtitle text="Menús" customClass="text-xl font-black" />
                <ul className="flex gap-3">
                    <li>
                        <Button url={`${location.pathname}/assing/menu`} text="asignar" variant="border" color="accent" />
                    </li>
                </ul>
            </div>
            <AbstractList
                path={`/dashboard/menu`}
                filter=""
                nextFn={() => {}}
                prevFn={() => {}}
                object={`consult/menu/${id}`}
                reload
                reloadFn={()=>{}}
                skip={0}
                take={10}
            />
        </div>
    )
}

export default MenuConsult;
