import { FC, ReactNode } from "react";
import Subtitle from "../../../../atoms/text/Subtitle";
import { useModal } from "../../../../../../context/ModalContext";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";

interface Props {
    children: ReactNode;
    customClass: string;
    title: string
}

const ContainerModal: FC<Props> = ({ children,customClass,title }) => {

    const { close } = useModal();

    return (
        <div className={customClass}>
            <header className="flex justify-between w-full col-span-3">
                <Subtitle text={title} customClass="text-lg font-black" />
                <ButtonNotLink click={close} color="error" type="button" variant="border" ico={<HandlerIco ico="x" />} />
            </header>
            { children }
        </div>
    )
}

export default ContainerModal;
