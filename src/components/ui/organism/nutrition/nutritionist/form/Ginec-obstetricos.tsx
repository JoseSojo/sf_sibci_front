import { ChangeEvent, FC, FormEvent, useState } from "react";
import ContainerModal from "./ContainerModal";
import LabelInput from "../../../../compounds/LabelInput";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { GinecoObstericos } from "../nutrition/patient/data";
import Input from "../../../../atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import { useModal } from "../../../../../../context/ModalContext";

type UseTypeComponent = GinecoObstericos

interface Props {
    data?: UseTypeComponent;
    id: string;
    patientId: string;
    reload: () => void
}

const GinecobstetricosComponent: FC<Props> = ({ data, id, patientId, reload }) => {

    const { close } = useModal();
    const notification = useNotification();
    const title = `Gineco Obstetricos`;
    const path = `ginecoobstetricos`;

    const [internalData, setInternalData] = useState<UseTypeComponent>({
        g: data && data.g ? data.g : ``,
        p: data && data.p ? data.p : ``,
        c: data && data.c ? data.c : ``,
        fum: data && data.fum ? data.fum : ``,
        fup_c: data && data.fup_c ? data.fup_c : ``,
        ppg: data && data.ppg ? data.ppg : ``,
        anticonceptivos: data && data.anticonceptivos ? data.anticonceptivos : ``,
    });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            if(!internalData.c) return notification.init(`Debes completar el campo C`, `error`);
            if(!internalData.p) return notification.init(`Debes completar el campo P`, `error`);
            if(!internalData.fum) return notification.init(`Debes completar el campo FUM`, `error`);
            if(!internalData.g) return notification.init(`Debes completar el campo G`, `error`);
            if(!internalData.fup_c) return notification.init(`Debes completar el campo FUP/C`, `error`);
            if(!internalData.ppg) return notification.init(`Debes completar el campo PPG`, `error`);
            if(!internalData.anticonceptivos) return notification.init(`Debes completar el campo Anticonceptivos`, `error`);

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
            <form onSubmit={HandleSubmit} className="grid grid-cols-4 gap-3">
                <LabelInput color="default" label="C" customClass="mt-4 ">
                    <Input name="c" value={internalData.c} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="P" customClass="mt-4">
                    <Input name="p" value={internalData.p} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="FUM" customClass="mt-4">
                    <Input name="fum" value={internalData.fum} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="G" customClass="mt-4">
                    <Input name="g" value={internalData.g} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="FUP/C" customClass="mt-4">
                    <Input name="fup_c" value={internalData.fup_c} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="PPG" customClass="mt-4">
                    <Input name="ppg" value={internalData.ppg} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Anticonceptivos" customClass="mt-4">
                    <Input name="anticonceptivos" value={internalData.anticonceptivos} change={HandleChange} customClass="border-base-content" />
                </LabelInput>

                <div className="col-span-4 flex justify-end gap-3 mt-4">
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

export default GinecobstetricosComponent;
