import { ChangeEvent, FC, FormEvent, useState } from "react";
import ContainerModal from "./ContainerModal";
import LabelInput from "../../../../compounds/LabelInput";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { TranstornosGastrointestinales } from "../nutrition/patient/data";
import Input from "../../../../atoms/input/Input";
import { useNotification } from "../../../../../../context/NotificationContext";
import { useModal } from "../../../../../../context/ModalContext";

type UseTypeComponent = TranstornosGastrointestinales

interface Props {
    data?: UseTypeComponent;
    id: string;
    patientId: string;
    reload: () => void
}

const TranstornosGastrointestinalesComponent: FC<Props> = ({ data, id, patientId, reload }) => {

    const { close } = useModal();
    const notification = useNotification();
    const title = `Trastornos Gatrointestinales`;
    const path = `trastornosgatrointestinales`;

    const [internalData, setInternalData] = useState<UseTypeComponent>({
        vomito: data && data.vomito ? data.vomito : ``,
        estrenimiento: data && data.estrenimiento ? data.estrenimiento : ``,
        gastritis: data && data.gastritis ? data.gastritis : ``,
        nauseas: data && data.nauseas ? data.nauseas : ``,
        disfagia: data && data.disfagia ? data.disfagia : ``,
        distencion: data && data.distencion ? data.distencion : ``,
        diarrea: data && data.diarrea ? data.diarrea : ``,
        colitis: data && data.colitis ? data.colitis : ``,
        colitritis: data && data.colitritis ? data.colitritis : ``,
        reflujo: data && data.reflujo ? data.reflujo : ``,
        flatulencias: data && data.flatulencias ? data.flatulencias : ``,
        piriosis: data && data.piriosis ? data.piriosis : ``,
        otros: data && data.otros ? data.otros : ``,
    });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            if(!internalData.gastritis) return notification.init(`Debes completar el campo Gastritis`, `error`);
            if(!internalData.estrenimiento) return notification.init(`Debes completar el campo Estrenimiento`, `error`);
            if(!internalData.nauseas) return notification.init(`Debes completar el campo Nauseas`, `error`);
            if(!internalData.vomito) return notification.init(`Debes completar el campo Vómito`, `error`);
            if(!internalData.disfagia) return notification.init(`Debes completar el campo Hipertension Arterial`, `error`);
            if(!internalData.distencion) return notification.init(`Debes completar el campo Distencion`, `error`);
            if(!internalData.diarrea) return notification.init(`Debes completar el campo diarrea`, `error`);
            if(!internalData.colitis) return notification.init(`Debes completar el campo Colitis`, `error`);
            if(!internalData.colitritis) return notification.init(`Debes completar el campo Colitritis`, `error`);
            if(!internalData.reflujo) return notification.init(`Debes completar el campo Reflujo`, `error`);
            if(!internalData.flatulencias) return notification.init(`Debes completar el campo Flatulencias`, `error`);
            if(!internalData.piriosis) return notification.init(`Debes completar el campo Piriosis`, `error`);
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
                <LabelInput color="default" label="Gastritis" customClass="mt-4 ">
                    <Input name="gastritis" value={internalData.gastritis} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Estreñimiento" customClass="mt-4">
                    <Input name="estrenimiento" value={internalData.estrenimiento} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Nauseas" customClass="mt-4">
                    <Input name="nauseas" value={internalData.nauseas} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Vómito" customClass="mt-4">
                    <Input name="vomito" value={internalData.vomito} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Disfagia" customClass="mt-4">
                    <Input name="disfagia" value={internalData.disfagia} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Distencion" customClass="mt-4">
                    <Input name="distencion" value={internalData.distencion} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Diarrea" customClass="mt-4">
                    <Input name="diarrea" value={internalData.diarrea} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Colitis" customClass="mt-4">
                    <Input name="colitis" value={internalData.colitis} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Colitritis" customClass="mt-4">
                    <Input name="colitritis" value={internalData.colitritis} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Reflujo" customClass="mt-4">
                    <Input name="reflujo" value={internalData.reflujo} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Flatulencias" customClass="mt-4">
                    <Input name="flatulencias" value={internalData.flatulencias} change={HandleChange} customClass="border-base-content" />
                </LabelInput>
                <LabelInput color="default" label="Piriosis" customClass="mt-4">
                    <Input name="piriosis" value={internalData.piriosis} change={HandleChange} customClass="border-base-content" />
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

export default TranstornosGastrointestinalesComponent;

