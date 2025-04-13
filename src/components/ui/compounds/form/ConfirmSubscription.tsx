import { FC } from "react";
import Subtitle from "../../atoms/text/Subtitle";
import ButtonNotLink from "../../atoms/ButtonNotLink";
import HandlerIco from "../../../../service/ui/HandlerIco";
import { useModal } from "../../../../context/ModalContext";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import { useNotification } from "../../../../context/NotificationContext";

interface ConfirmSusbcriptionProps {
    id: string;
    mount: number;
    name: string;
    reload: () => void
}

const ConfirmSusbcription: FC<ConfirmSusbcriptionProps> = ({ id, name, mount, reload }) => {

    const { close } = useModal();
    const notification = useNotification();

    const Confirm = () => {
        (async () => {
            const url = `${URL_API}/user/${id}/subcription`;
            const result = await fetch(url, { method:`POST`,headers:{ token:`${GetToken()}` } });
            const json = await result.json();

            notification.init(json.message, `success`);
            close();
            reload();
            return;
        })()
    }

    return (
        <div className="w-[50%] bg-base-300 p-3 shadow shadow-base-content rounded">
            <div className="flex justify-center mb-4">
                <i className="m-auto text-center text-6xl text-warning"><HandlerIco ico="warning" /></i>
            </div>
            <Subtitle text={`Confirmar subscripción ${name}`} customClass="text-center font-bold" size="lg" />
            <Subtitle text={`${mount}/mes`} customClass="text-center font-black mb-5 text-gray-100" size="3xl" />
            <div className="flex justify-center items-center gap-3">
                <ButtonNotLink
                    click={close}
                    color="warning"
                    text="Cancelar"
                    variant="border"
                    ico={<HandlerIco ico="x" />}
                />
                <ButtonNotLink
                    click={Confirm}
                    color="primary"
                    text="Aceptar"
                    ico={<HandlerIco ico="config" />}
                />

            </div>
        </div>
    )
}

export default ConfirmSusbcription;
