import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { URL_API } from "../../../../../env";
import { GetToken } from "../../../../../service/auth/TokenStorage";
import LabelInput from "../../../compounds/LabelInput";
import Input from "../../../atoms/input/Input";
import ButtonNotLink from "../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../service/ui/HandlerIco";
import { GlobalFichaPatient, IndicadoresAntropometrico } from "./nutrition/patient/data";
import UniqueStaticticsConsult from "../../sections/UniqueStaticticsConsult";

interface IndicadoresAntopometricosProps {
    id: string
}

const IndicadoresAntopometricos: FC<IndicadoresAntopometricosProps> = ({ id }) => {

    const [patient, setPatient] = useState<any | null>(null);
    const [customData, setCustomData] = useState<IndicadoresAntropometrico | null>(null);
    
    useEffect(() => {
        (async () => {
            const url = `${URL_API}/consult/${id}/patient/`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json() as { body:{patient:{patientReference:GlobalFichaPatient}} };
            setCustomData(json.body.patient.patientReference.indicadoresAntopometricos);
        })()
    }, [])

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(customData);
        (async () => {
            // if(!patient) return;
            const url = `${URL_API}/consult/patient/antopometricos/${id}/?patientId=${patient && patient.id ? patient.id : ``}`;
            const result = await fetch(url, { method:`POST`,headers:{token:`${GetToken()}`,"Content-Type":`application/json`}, body:JSON.stringify(customData) });
            const json = await result.json();
            if(json.body) setPatient(json.body);
        })()
    }

    const HandleChangeDataPatient = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setCustomData((prev: any) => {
            return {...prev, [e.target.name]:e.target.value};
        })
    }

    return (
        <div className="px-4 py-3 Ficha Paciente">
            <div>
                <form onSubmit={HandleSubmit} className="grid grid-cols-12 gap-3">

                        <LabelInput customClass="col-span-3" color="accent" label="Peso Habitual">
                            <Input value={customData && customData.pesoHabitual ? customData.pesoHabitual : ``} change={HandleChangeDataPatient} name="pesoHabitual" color="accent" customClass="bg-base-300 border border-base-300" />
                        </LabelInput>
                        <LabelInput customClass="col-span-3" color="accent" label="Peso Actual">
                            <Input value={customData && customData.pesoActual ? customData.pesoActual : ``} change={HandleChangeDataPatient} name="pesoActual" color="accent" customClass="bg-base-300 border border-base-300" />
                        </LabelInput>
                        <LabelInput customClass="col-span-3" color="accent" label="Peso Máximo">
                            <Input value={customData && customData.pesoMaximo ? customData.pesoMaximo : ``} change={HandleChangeDataPatient} name="pesoMaximo" color="accent" customClass="bg-base-300 border border-base-300" />
                        </LabelInput>
                        <LabelInput customClass="col-span-3" color="accent" label="Peso Mínimo">
                            <Input value={customData && customData.pesoMinimo ? customData.pesoMinimo : ``} change={HandleChangeDataPatient} name="pesoMinimo" color="accent" customClass="bg-base-300 border border-base-300" />
                        </LabelInput>
                        <LabelInput customClass="col-span-4" color="accent" label="Peso Ideal">
                            <Input value={customData && customData.pesoIdeal ? customData.pesoIdeal : ``} change={HandleChangeDataPatient} name="pesoIdeal" color="accent" customClass="bg-base-300 border border-base-300" />
                        </LabelInput>
                        <LabelInput customClass="col-span-4" color="accent" label="Talla">
                            <Input value={customData && customData.talla ? customData.talla : ``} change={HandleChangeDataPatient} name="talla" color="accent" customClass="bg-base-300 border border-base-300" />
                        </LabelInput>
                        <LabelInput customClass="col-span-4" color="accent" label="IMC">
                            <Input value={customData && customData.IMC ? customData.IMC : ``} change={HandleChangeDataPatient} name="IMC" color="accent" customClass="bg-base-300 border border-base-300" />
                        </LabelInput>

                    <div className="col-span-12 flex justify-end">
                        <ButtonNotLink
                            text="enviar"
                            ico={<HandlerIco ico={patient && patient.id ? `update` : `create`} />}
                            color={patient && patient.id ? `info` : `success`}
                            type="submit"
                        />
                    </div>

                </form>


                <div className="grid grid-cols-2 gap-3">
                    <UniqueStaticticsConsult path={`/consult/size/${id}`} reload />
                    <UniqueStaticticsConsult path={`/consult/weight/${id}`} reload />
                </div>

            </div>
        </div>
    )
}

export default IndicadoresAntopometricos;
