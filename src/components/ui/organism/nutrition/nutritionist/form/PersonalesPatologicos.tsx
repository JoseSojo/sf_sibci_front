import { ChangeEvent, FC, FormEvent, useState } from "react";
import ContainerModal from "./ContainerModal";
import LabelInput from "../../../../compounds/LabelInput";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { PersonalesPatologicos } from "../nutrition/patient/data";
import Input from "../../../../atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import { useModal } from "../../../../../../context/ModalContext";

type UseTypeComponent = PersonalesPatologicos

interface Props {
    data?: UseTypeComponent;
    id: string;
    patientId: string;
    reload: () => void
}

const PersonalesPatologicosComponent: FC<Props> = ({ data, id, patientId, reload }) => {

    const { close } = useModal();
    const notification = useNotification();
    const title = `Personales Patológicos`;
    const path = `personalespatologicos`;

    const [internalData, setInternalData] = useState<UseTypeComponent>({
        anemia: data && data.anemia ? data.anemia : ``,
        cancer: data && data.cancer ? data.cancer : ``,
        diabetes: data && data.diabetes ? data.diabetes : ``,
        dislipidemia: data && data.dislipidemia ? data.dislipidemia : ``,
        hipertensionArterial: data && data.hipertensionArterial ? data.hipertensionArterial : ``,
        enfermedadesRenales: data && data.enfermedadesRenales ? data.enfermedadesRenales : ``,
        otros: data && data.otros ? data.otros : ``,
    });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            if(!internalData.diabetes) return notification.init(`Debes completar el campo Diabetes`, `error`);
            if(!internalData.cancer) return notification.init(`Debes completar el campo Cancer`, `error`);
            if(!internalData.dislipidemia) return notification.init(`Debes completar el campo Dislipidemia`, `error`);
            if(!internalData.anemia) return notification.init(`Debes completar el campo Anemia`, `error`);
            if(!internalData.hipertensionArterial) return notification.init(`Debes completar el campo Hipertension Arterial`, `error`);
            if(!internalData.enfermedadesRenales) return notification.init(`Debes completar el campo EnfermedadesRenales`, `error`);
            if(!internalData.otros) return notification.init(`Debes completar el campo Otros`, `error`);

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
            <LabelInput color="default" label="Diabetes" customClass="mt-4">
                    <Input name="diabetes" value={internalData.diabetes} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Cancer" customClass="mt-4">
                    <Input name="cancer" value={internalData.cancer} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Dislipidemia" customClass="mt-4">
                    <Input name="dislipidemia" value={internalData.dislipidemia} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Anemia" customClass="mt-4">
                    <Input name="anemia" value={internalData.anemia} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Hipertensión Arterial" customClass="mt-4">
                    <Input name="hipertensionArterial" value={internalData.hipertensionArterial} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Enfermedades Renales" customClass="mt-4">
                    <Input name="enfermedadesRenales" value={internalData.enfermedadesRenales} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Otros" customClass="mt-4 col-span-2">
                    <Input name="otros" value={internalData.otros} change={HandleChange} customClass="border-base-content" />
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

export default PersonalesPatologicosComponent;

