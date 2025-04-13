import { ChangeEvent, FC, FormEvent, useState } from "react";
import ContainerModal from "./ContainerModal";
import LabelInput from "../../../../compounds/LabelInput";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { PersonalesNoPatologicos } from "../nutrition/patient/data";
import Input from "../../../../atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import { useModal } from "../../../../../../context/ModalContext";

type UseTypeComponent = PersonalesNoPatologicos

interface Props {
    data?: UseTypeComponent;
    id: string;
    patientId: string;
    reload: () => void
}

const PersonalesNoPatologicosComponent: FC<Props> = ({ data, id, patientId, reload }) => {

    const { close } = useModal();
    const notification = useNotification();
    const title = `Personales No Patológicos`;
    const path = `personalesnopatologicos`;

    const [internalData, setInternalData] = useState<UseTypeComponent>({
        alcohol: data && data.alcohol ? data.alcohol : ``,
        cafe: data && data.cafe ? data.cafe : ``,
        ejercicio: data && data.ejercicio ? data.ejercicio : ``,
        fuma: data && data.fuma ? data.fuma : ``,
        horasSueno: data && data.horasSueno ? data.horasSueno : ``,
        sustanciaIlisitas: data && data.sustanciaIlisitas ? data.sustanciaIlisitas : ``,
        toxitosinas: data && data.toxitosinas ? data.toxitosinas : ``,
    });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            if(!internalData.ejercicio) return notification.init(`Debes completar el campo ejercicio`, `error`);
            if(!internalData.cafe) return notification.init(`Debes completar el campo cafe`, `error`);
            if(!internalData.fuma) return notification.init(`Debes completar el campo fuma`, `error`);
            if(!internalData.alcohol) return notification.init(`Debes completar el campo alcohol`, `error`);
            if(!internalData.horasSueno) return notification.init(`Debes completar el campo Hipertension Arterial`, `error`);
            if(!internalData.sustanciaIlisitas) return notification.init(`Debes completar el campo sustanciaIlisitas`, `error`);
            if(!internalData.toxitosinas) return notification.init(`Debes completar el campo toxitosinas`, `error`);

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
            <form onSubmit={HandleSubmit} className="grid grid-cols-2 gap-3">
            <LabelInput color="default" label="Ejercicio" customClass="mt-4">
                    <Input name="ejercicio" value={internalData.ejercicio} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Cafe" customClass="mt-4">
                    <Input name="cafe" value={internalData.cafe} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Fuma" customClass="mt-4">
                    <Input name="fuma" value={internalData.fuma} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Alcohol" customClass="mt-4">
                    <Input name="alcohol" value={internalData.alcohol} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Horas de Sueño" customClass="mt-4">
                    <Input name="horasSueno" value={internalData.horasSueno} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Sistancias Ilísitas" customClass="mt-4">
                    <Input name="sustanciaIlisitas" value={internalData.sustanciaIlisitas} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Toxitosinas" customClass="mt-4 col-span-2">
                    <Input name="toxitosinas" value={internalData.toxitosinas} change={HandleChange} customClass="border-base-content" />
                </LabelInput>

                <div className="col-span-2 flex justify-end gap-3 mt-4">
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

export default PersonalesNoPatologicosComponent;
