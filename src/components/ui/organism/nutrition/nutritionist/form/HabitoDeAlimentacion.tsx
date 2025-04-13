import { ChangeEvent, FC, FormEvent, useState } from "react";
import ContainerModal from "./ContainerModal";
import LabelInput from "../../../../compounds/LabelInput";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { HabitosAlimenticios } from "../nutrition/patient/data";
import Input from "../../../../atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import { useModal } from "../../../../../../context/ModalContext";

type UseTypeComponent = HabitosAlimenticios

interface Props {
    data?: UseTypeComponent;
    id: string;
    patientId: string;
    reload: () => void
}

const HabitoDeAlimentacionComponent: FC<Props> = ({ data, id, patientId, reload }) => {

    const { close } = useModal();
    const notification = useNotification();
    const title = `Habito De Alimentacion`;
    const path = `habitodealimentacion`;

    const [internalData, setInternalData] = useState<UseTypeComponent>({
        conQuienCome: data && data.conQuienCome ? data.conQuienCome : ``,
        quienPreparaAlimentos: data && data.quienPreparaAlimentos ? data.quienPreparaAlimentos : ``,
        comidasAlDia: data && data.comidasAlDia ? data.comidasAlDia : ``,
        haceMeriendas: data && data.haceMeriendas ? data.haceMeriendas : ``,
        horarioComida: data && data.horarioComida ? data.horarioComida : ``,
        comidasEnCasa: data && data.comidasEnCasa ? data.comidasEnCasa : ``,
        comidasFueraDeCasa: data && data.comidasFueraDeCasa ? data.comidasFueraDeCasa : ``,
        comidasFueraDeCasaFinDeSemana: data && data.comidasFueraDeCasaFinDeSemana ? data.comidasFueraDeCasaFinDeSemana : ``,
        horaDeMayorApetito: data && data.horaDeMayorApetito ? data.horaDeMayorApetito : ``,
        comoConsideraSuApetito: data && data.comoConsideraSuApetito ? data.comoConsideraSuApetito : ``,
        suplementos: data && data.suplementos ? data.suplementos : ``,
        agua: data && data.agua ? data.agua : ``,
        alergias: data && data.alergias ? data.alergias : ``,
        intolerancias: data && data.intolerancias ? data.intolerancias : ``,
        dietasAnteriores: data && data.dietasAnteriores ? data.dietasAnteriores : ``,
        medicamentoParaBajarDePeso: data && data.medicamentoParaBajarDePeso ? data.medicamentoParaBajarDePeso : ``,
    });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            if(!internalData.comidasAlDia) return notification.init(`Debes completar el campo comidasAlDia`, `error`);
            if(!internalData.quienPreparaAlimentos) return notification.init(`Debes completar el campo quienPreparaAlimentos`, `error`);
            if(!internalData.haceMeriendas) return notification.init(`Debes completar el campo haceMeriendas`, `error`);
            if(!internalData.conQuienCome) return notification.init(`Debes completar el campo Vómito`, `error`);
            if(!internalData.horarioComida) return notification.init(`Debes completar el campo Hipertension Arterial`, `error`);
            if(!internalData.comidasEnCasa) return notification.init(`Debes completar el campo comidasEnCasa`, `error`);
            if(!internalData.comidasFueraDeCasa) return notification.init(`Debes completar el campo comidasFueraDeCasa`, `error`);
            if(!internalData.comidasFueraDeCasaFinDeSemana) return notification.init(`Debes completar el campo comidasFueraDeCasaFinDeSemana`, `error`);
            if(!internalData.horaDeMayorApetito) return notification.init(`Debes completar el campo horaDeMayorApetito`, `error`);
            if(!internalData.comoConsideraSuApetito) return notification.init(`Debes completar el campo comoConsideraSuApetito`, `error`);
            if(!internalData.suplementos) return notification.init(`Debes completar el campo suplementos`, `error`);
            if(!internalData.agua) return notification.init(`Debes completar el campo agua`, `error`);
            if(!internalData.alergias) return notification.init(`Debes completar el campo alergias`, `error`);
            if(!internalData.intolerancias) return notification.init(`Debes completar el campo Intolerancias`, `error`);
            if(!internalData.dietasAnteriores) return notification.init(`Debes completar el campo Dietas Anteriores`, `error`);
            if(!internalData.medicamentoParaBajarDePeso) return notification.init(`Debes completar el campo Medicamentos Para Bajar De Peso`, `error`);

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
                <LabelInput color="default" label="Comidas Al Dia" customClass="mt-4 ">
                    <Input name="comidasAlDia" value={internalData.comidasAlDia} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Quien Prepara los Alimentos" customClass="mt-4">
                    <Input name="quienPreparaAlimentos" value={internalData.quienPreparaAlimentos} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Hace Meriendas" customClass="mt-4">
                    <Input name="haceMeriendas" value={internalData.haceMeriendas} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Con quien Come" customClass="mt-4">
                    <Input name="conQuienCome" value={internalData.conQuienCome} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Horario Comida" customClass="mt-4">
                    <Input name="horarioComida" value={internalData.horarioComida} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Comidas En Casa" customClass="mt-4">
                    <Input name="comidasEnCasa" value={internalData.comidasEnCasa} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Comidas Fuera De Casa" customClass="mt-4">
                    <Input name="comidasFueraDeCasa" value={internalData.comidasFueraDeCasa} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Comidas Fuera De Casa Fin De Semana" customClass="mt-4">
                    <Input name="comidasFueraDeCasaFinDeSemana" value={internalData.comidasFueraDeCasaFinDeSemana} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Hora De Mayor Apetito" customClass="mt-4">
                    <Input name="horaDeMayorApetito" value={internalData.horaDeMayorApetito} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Como Considera Su Apetito" customClass="mt-4">
                    <Input name="comoConsideraSuApetito" value={internalData.comoConsideraSuApetito} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Suplementos" customClass="mt-4">
                    <Input name="suplementos" value={internalData.suplementos} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Agua" customClass="mt-4">
                    <Input name="agua" value={internalData.agua} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Intolerancias" customClass="mt-4">
                    <Input name="intolerancias" value={internalData.intolerancias} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Alergias" customClass="mt-4">
                    <Input name="alergias" value={internalData.alergias} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Dietas Anteriores" customClass="mt-4">
                    <Input name="dietasAnteriores" value={internalData.dietasAnteriores} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Medicamento Para Bajar De Peso" customClass="mt-4">
                    <Input name="medicamentoParaBajarDePeso" value={internalData.medicamentoParaBajarDePeso} change={HandleChange} customClass="border-base-content" />
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

export default HabitoDeAlimentacionComponent;
