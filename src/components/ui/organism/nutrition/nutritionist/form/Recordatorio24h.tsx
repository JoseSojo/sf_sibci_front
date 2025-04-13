import { ChangeEvent, FC, FormEvent, useState } from "react";
import ContainerModal from "./ContainerModal";
import LabelInput from "../../../../compounds/LabelInput";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { Recordatorio24h } from "../nutrition/patient/data";
import Input from "../../../../atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import { useModal } from "../../../../../../context/ModalContext";

type UseTypeComponent = Recordatorio24h

interface Props {
    data?: UseTypeComponent;
    id: string;
    patientId: string;
    reload: () => void
}

const Recordatorio24hComponent: FC<Props> = ({ data, id, patientId, reload }) => {

    const { close } = useModal();
    const notification = useNotification();
    const title = `Recordatorio 24h`;
    const path = `recordatorio24h`;

    const [internalData, setInternalData] = useState<UseTypeComponent>({
        desayuno: data && data.desayuno ? data.desayuno : ``,
        meriendaMatutina: data && data.meriendaMatutina ? data.meriendaMatutina : ``,
        comida: data && data.comida ? data.comida : ``,
        merida: data && data.merida ? data.merida : ``,
        cena: data && data.cena ? data.cena : ``,

    });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            if(!internalData.comida) return notification.init(`Debes completar el campo comida`, `error`);
            if(!internalData.meriendaMatutina) return notification.init(`Debes completar el campo meriendaMatutina`, `error`);
            if(!internalData.merida) return notification.init(`Debes completar el campo merida`, `error`);
            if(!internalData.desayuno) return notification.init(`Debes completar el campo Vómito`, `error`);
            if(!internalData.cena) return notification.init(`Debes completar el campo Hipertension Arterial`, `error`);

            const url = `${URL_API}/consult/patient/${path}/${id}/?patientId=${patientId}`;
            const body:UseTypeComponent = { ...internalData };

            const result = await fetch(url, { 
                method:`POST`,
                headers:{ token:`${GetToken()}`, "Content-Type":"application/json" }, 
                body:JSON.stringify(body) 
            });
            const json = await result.json();
            if(json.status === 200) {}
            reload();       
        })()
    }

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInternalData(prev => {
            return { ...prev, [e.target.name]:e.target.value }
        })
    }

    return (
        <ContainerModal customClass="w-[70%] bg-base-100 p-3 rounded" title={title}>
            <form onSubmit={HandleSubmit} className="grid grid-cols-1">
                <LabelInput color="default" label="Desayuno" customClass="mt-4 w-full">
                    <Input name="desayuno" value={internalData.desayuno} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Merienda Matutina" customClass="mt-4 w-full">
                    <Input name="meriendaMatutina" value={internalData.meriendaMatutina} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Comida" customClass="mt-4 w-full">
                    <Input name="comida" value={internalData.comida} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Merienda" customClass="mt-4 w-full">
                    <Input name="merida" value={internalData.merida} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Cena" customClass="mt-4 w-full">
                    <Input name="cena" value={internalData.cena} change={HandleChange} customClass="border-base-content" />
                </LabelInput>

                <div className="col-span-1 flex justify-end gap-3 mt-4">
                    <ButtonNotLink
                        click={close}
                        color="error"
                        text="cerrar"
                        ico={<HandlerIco ico="x" />}
                    />
                    <ButtonNotLink
                        type="submit"
                        color="success"
                        text="guardar"
                        ico={<HandlerIco ico="create" />}
                    />
                </div>
            </form>
        </ContainerModal>
    )
}

export default Recordatorio24hComponent;

