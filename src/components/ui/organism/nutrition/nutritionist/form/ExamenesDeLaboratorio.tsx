import { ChangeEvent, FC, FormEvent, useState } from "react";
import ContainerModal from "./ContainerModal";
import LabelInput from "../../../../compounds/LabelInput";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { ExamenesLaboratorio } from "../nutrition/patient/data";
import Input from "../../../../atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import { useModal } from "../../../../../../context/ModalContext";

type UseTypeComponent = ExamenesLaboratorio

interface Props {
    data?: UseTypeComponent;
    id: string;
    patientId: string;
    reload: () => void
}

const ExamentesDeLaboratorioComponent: FC<Props> = ({ data, id, patientId, reload }) => {

    const { close } = useModal();
    const notification = useNotification();
    const title = `Examenes Laboratorio`;
    const path = `exameneslaboratorio`;

    const [internalData, setInternalData] = useState<UseTypeComponent>({
        colesterolHDL: data && data.colesterolHDL ? data.colesterolHDL : ``,
        colesterolLDL: data && data.colesterolLDL ? data.colesterolLDL : ``,
        trigiceridos: data && data.trigiceridos ? data.trigiceridos : ``,
        glucemiaEnAyuna: data && data.glucemiaEnAyuna ? data.glucemiaEnAyuna : ``,
        hemoglobina: data && data.hemoglobina ? data.hemoglobina : ``,
        hemoglobinaGlicosilada: data && data.hemoglobinaGlicosilada ? data.hemoglobinaGlicosilada : ``,
        acidoUrico: data && data.acidoUrico ? data.acidoUrico : ``,
        creatina: data && data.creatina ? data.creatina : ``,
        proteinaCReactiva: data && data.proteinaCReactiva ? data.proteinaCReactiva : ``,
        ferritina: data && data.ferritina ? data.ferritina : ``,
        vitaminaD: data && data.vitaminaD ? data.vitaminaD : ``,
        vitaminaB12: data && data.vitaminaB12 ? data.vitaminaB12 : ``,
        folato: data && data.folato ? data.folato : ``,
        hierro: data && data.hierro ? data.hierro : ``,
        zinc: data && data.zinc ? data.zinc : ``,
        sodio: data && data.sodio ? data.sodio : ``,
        potasio: data && data.potasio ? data.potasio : ``,
        otros: data && data.otros ? data.otros : ``,
    });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            if(!internalData.trigiceridos) return notification.init(`Debes completar el campo Trigiceridos`, `error`);
            if(!internalData.colesterolLDL) return notification.init(`Debes completar el campo Colesterol LDL`, `error`);
            if(!internalData.glucemiaEnAyuna) return notification.init(`Debes completar el campo Glucemia En Ayuna`, `error`);
            if(!internalData.colesterolHDL) return notification.init(`Debes completar el campo Colesterol HDL`, `error`);
            if(!internalData.hemoglobina) return notification.init(`Debes completar el campo Hemoglobina`, `error`);
            if(!internalData.hemoglobinaGlicosilada) return notification.init(`Debes completar el campo Hemoglobina Glicosilada`, `error`);
            if(!internalData.acidoUrico) return notification.init(`Debes completar el campo Acido Urico`, `error`);
            if(!internalData.creatina) return notification.init(`Debes completar el campo Creatina`, `error`);
            if(!internalData.proteinaCReactiva) return notification.init(`Debes completar el campo Proteina C Reactiva`, `error`);
            if(!internalData.ferritina) return notification.init(`Debes completar el campo Ferritina`, `error`);
            if(!internalData.vitaminaD) return notification.init(`Debes completar el campo VitaminaD`, `error`);
            if(!internalData.vitaminaB12) return notification.init(`Debes completar el campo VitaminaB12`, `error`);
            if(!internalData.folato) return notification.init(`Debes completar el campo Folato`, `error`);
            if(!internalData.hierro) return notification.init(`Debes completar el campo Hierro`, `error`);
            if(!internalData.zinc) return notification.init(`Debes completar el campo Zinc`, `error`);
            if(!internalData.sodio) return notification.init(`Debes completar el campo Sodio`, `error`);
            if(!internalData.potasio) return notification.init(`Debes completar el campo Potasio`, `error`);
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
            <form onSubmit={HandleSubmit} className="grid grid-cols-4 gap-3">
                <LabelInput color="default" label="Colesterol HDL" customClass="mt-4">
                    <Input name="colesterolHDL" value={internalData.colesterolHDL} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Colesterol LDL" customClass="mt-4">
                    <Input name="colesterolLDL" value={internalData.colesterolLDL} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Trigiceridos" customClass="mt-4 ">
                    <Input name="trigiceridos" value={internalData.trigiceridos} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Glucemia En Ayuna" customClass="mt-4">
                    <Input name="glucemiaEnAyuna" value={internalData.glucemiaEnAyuna} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                
                <LabelInput color="default" label="Hemoglobina" customClass="mt-4">
                    <Input name="hemoglobina" value={internalData.hemoglobina} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Hemoglobina Glicosilada" customClass="mt-4">
                    <Input name="hemoglobinaGlicosilada" value={internalData.hemoglobinaGlicosilada} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Acido Urico" customClass="mt-4">
                    <Input name="acidoUrico" value={internalData.acidoUrico} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="creatina" customClass="mt-4">
                    <Input name="creatina" value={internalData.creatina} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Proteina C Reactiva" customClass="mt-4">
                    <Input name="proteinaCReactiva" value={internalData.proteinaCReactiva} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Ferritina" customClass="mt-4">
                    <Input name="ferritina" value={internalData.ferritina} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Vitamina D" customClass="mt-4">
                    <Input name="vitaminaD" value={internalData.vitaminaD} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Vitamina B12" customClass="mt-4">
                    <Input name="vitaminaB12" value={internalData.vitaminaB12} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Folato" customClass="mt-4">
                    <Input name="folato" value={internalData.folato} change={HandleChange} customClass="border-base-content" />
                </LabelInput>

                <LabelInput color="default" label="Hierro" customClass="mt-4">
                    <Input name="hierro" value={internalData.hierro} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Zinc" customClass="mt-4">
                    <Input name="zinc" value={internalData.zinc} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Sodio" customClass="mt-4">
                    <Input name="sodio" value={internalData.sodio} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Potasio" customClass="mt-4">
                    <Input name="potasio" value={internalData.potasio} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Otros" customClass="mt-4 col-span-4">
                    <Input name="otros" value={internalData.otros} change={HandleChange} customClass="border-base-content" />
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

export default ExamentesDeLaboratorioComponent;

