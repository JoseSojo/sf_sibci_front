import { FC } from "react"
import AbstractList from "../../../../../app/auth/abstract/partials/AbstractList";
import Subtitle from "../../../atoms/text/Subtitle";
import Button from "../../../atoms/Button";

interface ExchangeConsultProps {
    id: string
}

const ExchangeConsult: FC<ExchangeConsultProps> = ({ id }) => {
    return (
        <div>
            <div className="w-full flex justify-between">
                <Subtitle text="Listas de intercambio" customClass="text-xl font-black" />
                <ul className="flex gap-3">
                    <li>
                        <Button url={`${location.pathname}/assing/exchange`} text="asignar" variant="border" color="accent" />
                    </li>
                </ul>
            </div>
            <AbstractList
                path={`/dashboard/exchange`}
                filter=""
                nextFn={() => {}}
                prevFn={() => {}}
                object={`consult/exchange/${id}`}
                reload
                reloadFn={()=>{}}
                skip={0}
                take={10}
            />
        </div>
    )
}

export default ExchangeConsult;
