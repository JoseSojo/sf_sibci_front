import { FC } from "react";
import { FaCheck } from "react-icons/fa";
import Button from "../../atoms/Button";
import { useModal } from "../../../../context/ModalContext";
import ConfirmSusbcription from "../form/ConfirmSubscription";

interface CardPrincingProps {
    name: string;
    id: string,
    mount: number;
    include: string[];
    reload: () => void
}

const CardPrincing: FC<CardPrincingProps> = ({ name, mount, include,id,reload }) => {

    const {init} = useModal();

    const ExecuteConfirm = () => {
        return init(<ConfirmSusbcription reload={reload} id={id} name={name} mount={mount} />)
    }

    return (
        <div className="relative pt-8 px-8 border-2 border-base-300 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1 my-3">
                <h3 className="text-xl font-semibold ">{name}</h3>
                <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">${mount}</span><span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <Button
                    click={ExecuteConfirm}
                    text="Seleccionar subscripción"
                    variant="border"
                    color="primary"
                    customClass="w-full mt-3"
                />
                <ul role="list" className="mt-6 space-y-6">
                    {
                        include.map(item => (
                            <li className="flex items-center">
                                <i className="text-lg font-bold text-success"><FaCheck /></i>
                                <span className="ml-3 ">{item}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default CardPrincing;
