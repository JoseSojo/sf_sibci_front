import { FC } from "react";
import { ObjectSupport } from "../../../../types/app";
import { RiAlarmWarningFill } from "react-icons/ri";
import Subtitle from "../../../../components/ui/atoms/text/Subtitle";
import ButtonNotLink from "../../../../components/ui/atoms/ButtonNotLink";
import HandlerIco from "../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import { useNotification } from "../../../../context/NotificationContext";

interface AbstractDeleteProps {
    id: string;
    object: ObjectSupport;
    close: () => void;
    reload: () => void
}

const AbstractDelete: FC<AbstractDeleteProps> = ({ close, id, object, reload }) => {
    const notification = useNotification();

    const HanldeDelete = () => {
        (async () => {
            try {
                const url = `${URL_API}/${object}/${id}/delete`;
                const result = await fetch(url, { method:`PUT`,headers:{ token:`${GetToken()}` } });
                await result.json();

                notification.init(`Registro eliminado`, `success`);
                close();
                reload();
            } catch (error) {
                close();
                reload();
                return notification.init(`Error temporal`, `error`);
            }
        })()
    }

    return (
        <div className="bg-base-300 rounded-md p-5 grid place-items-center px-8">
            <i className="text-5xl text-yellow-500">
                <RiAlarmWarningFill />
            </i>
            <header>
                <Subtitle size="md" customClass="font-black mt-2" text="¿Seguro que desea eliminar el registro?" />
            </header>
            <footer className="flex justify-end w-full gap-2 mt-3">
                <ButtonNotLink 
                    click={close}
                    text="Cancelar"
                    color="warning"
                    variant="border"
                />
                <ButtonNotLink
                    click={HanldeDelete}
                    text="Eliminar"
                    color="error"
                    ico={<HandlerIco ico="delete-row" />}
                />
            </footer>   
        </div>
    )
}

export default AbstractDelete;
