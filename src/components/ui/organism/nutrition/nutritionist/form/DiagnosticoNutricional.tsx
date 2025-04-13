import { FC, FormEvent, useRef } from "react";
import ContainerModal from "./ContainerModal";
import LabelInput from "../../../../compounds/LabelInput";
import ButtonNotLink from "../../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";

interface Props {
    data: string;
    id: string;
    patientId: string;
    reload: () => void
}

const DiagnosticoNutricional: FC<Props> = ({ data, id, patientId, reload }) => {

    const diagnostic = useRef<HTMLTextAreaElement | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            if(!diagnostic.current) return;
            const url = `${URL_API}/consult/patient/diagnostic/${id}/?patientId=${patientId}`;
            const body = { diagnostic: diagnostic.current.value };
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

    return (
        <ContainerModal customClass="w-[70%] bg-base-100 p-3 rounded" title="DiagnosticoNutricional">
            <form onSubmit={HandleSubmit} className="grid">
                <LabelInput color="default" label="" customClass="mt-4">
                    <textarea ref={diagnostic} className="w-full bg-base-200 rounded p-2 max-h-32 min-h-24">{data}</textarea>
                </LabelInput>
                <div className="flex justify-end gap-3 mt-4">
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

export default DiagnosticoNutricional;
