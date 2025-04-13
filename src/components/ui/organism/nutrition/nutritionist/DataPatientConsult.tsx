import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useState } from "react"
import { URL_API } from "../../../../../env";
import { GetToken } from "../../../../../service/auth/TokenStorage";
import LabelInput from "../../../compounds/LabelInput";
import Input from "../../../atoms/input/Input";
import { useModal } from "../../../../../context/ModalContext";
import Button from "../../../atoms/Button";
import Heredofamiliares from "./form/Heredofamiliares";
import Subtitle from "../../../atoms/text/Subtitle";
import Paragraph from "../../../atoms/text/Paragraph";
import PersonalesPatologicos from "./form/PersonalesPatologicos";
import PersonalesNoPatologicos from "./form/PersonaleNoPatologicos";
import TranstornosGastrointestinales from "./form/TranstornosGastrointestinales";
import Ginecobstetricos from "./form/Ginec-obstetricos";
import HabitoDeAlimentacion from "./form/HabitoDeAlimentacion";
import Recordatorio24h from "./form/Recordatorio24h";
import ExamentesDeLaboratorio from "./form/ExamenesDeLaboratorio";
import DiagnosticoNutricional from "./form/DiagnosticoNutricional";
import DistribucionCalorica from "./form/DistribucionCalorica";
import DatosExtras from "./form/DatosExtras";
import ButtonNotLink from "../../../atoms/ButtonNotLink";
import HandlerIco from "../../../../../service/ui/HandlerIco";
import { GlobalFichaPatient } from "./nutrition/patient/data";

interface DataPatientConsultProps {
    id: string
}

const DataPatientConsult: FC<DataPatientConsultProps> = ({ id }) => {

    const { init,close } = useModal();
    const [patient, setPatient] = useState<any | null>(null);
    const [customData, setCustomData] = useState<GlobalFichaPatient | null>(null);

    const [reload, setReload] = useState(false);
    const Reload = () => {
        setReload(!reload);
        close();
    }

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/consult/${id}/patient/`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json() as { body:{patient:{patientReference:GlobalFichaPatient}} };
            console.log(json);
            setCustomData(json.body.patient.patientReference);
            if(json.body.patient.patientReference.userReference) setPatient(json.body.patient.patientReference.userReference);
        })()
    }, [reload])

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            // if(!patient) return;
            const url = `${URL_API}/consult/patient/data/${id}/?patientId=${patient && patient.id ? patient.id : ``}`;
            const result = await fetch(url, { method:`POST`,headers:{token:`${GetToken()}`, "Content-Type":"application/json"}, body:JSON.stringify(patient) });
            const json = await result.json();
            if(json.body) setPatient(json.body);
        })()
    }

    const HandleChangeDataPatient = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setPatient((prev: any) => {
            return {...prev, [e.target.name]:e.target.value};
        })
    }

    const OpenModalForm = (el: ReactNode) => {
        return init(el);
    }

    return (
        <div className="px-4 py-3 Ficha Paciente">
            <div>
                <form onSubmit={HandleSubmit} className="grid grid-cols-12 gap-3">

                    <div className="col-span-12 flex justify-end">
                        <ButtonNotLink
                            text="enviar"
                            ico={<HandlerIco ico={patient && patient.id ? `update` : `create`} />}
                            color={patient && patient.id ? `info` : `success`}
                            type="submit"
                        />
                    </div>

                    <LabelInput customClass="col-span-3" color="accent" label="Nombre">
                        <Input value={patient && patient.name ? patient.name : ``} change={HandleChangeDataPatient} name="name" color="accent" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>
                    <LabelInput customClass="col-span-3" color="accent" label="Segundo nombre">
                        <Input value={patient && patient.name2 ? patient.name2 : ``} change={HandleChangeDataPatient} name="name2" color="accent" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>
                    <LabelInput customClass="col-span-3" color="accent" label="Apellido">
                        <Input value={patient && patient.lastname ? patient.lastname : ``} change={HandleChangeDataPatient} name="lastname" color="accent" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>
                    <LabelInput customClass="col-span-3" color="accent" label="Segundo apellido">
                        <Input value={patient && patient.lastname2 ? patient.lastname2 : ``} change={HandleChangeDataPatient} name="lastname2" color="accent" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>

                    <LabelInput customClass="col-span-2" color="accent" label="F/N">
                        <Input value={patient && patient.fn ? patient.fn : ``} change={HandleChangeDataPatient} type="date" name="fn" color="accent" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>
                    <LabelInput customClass="col-span-1" color="accent" label="Edad">
                        <Input value={patient && patient.age ? patient.age : ``} change={HandleChangeDataPatient} name="age" color="accent" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>
                    <LabelInput customClass="col-span-2" color="accent" label="Genero">
                        <select onChange={HandleChangeDataPatient} name="genero" className="select select-sm w-full border-base-300">
                            <option value={``}>seleccionar</option>
                            <option selected={patient && patient.genero === `MASCULINO` ? true : false} value={`MASCULINO`}>Masculino</option>
                            <option selected={patient && patient.genero === `FEMENINO` ? true : false} value={`FEMENINO`}>Femenino</option>
                        </select>
                    </LabelInput>
                    <LabelInput customClass="col-span-2" color="accent" label="Estado Civíl">
                        <select onChange={HandleChangeDataPatient} name="edoCivil" className="select select-sm w-full border-base-300">
                            <option value={``}>seleccionar</option>
                            <option selected={patient && patient.edoCivil === `Soltero` ? true : false}>Soltero</option>
                            <option selected={patient && patient.edoCivil === `Casado` ? true : false}>Casado</option>
                            <option selected={patient && patient.edoCivil === `Viudo` ? true : false}>Viudo</option>
                            <option selected={patient && patient.edoCivil === `Divorciado` ? true : false}>Divorciado</option>
                        </select>
                    </LabelInput>
                    <LabelInput customClass="col-span-1" color="accent" label="Nacionalidad">
                        <select onChange={HandleChangeDataPatient} name="nacionality" className="select select-sm w-full border-base-300">
                            <option value={``}>seleccionar</option>
                            <option selected={patient && patient.nacionality === `V` ? true : false}>V</option>
                            <option selected={patient && patient.nacionality === `E` ? true : false}>E</option>
                        </select>
                    </LabelInput>
                    <LabelInput color="accent" customClass="col-span-4" label="Cédula">
                        <Input value={patient && patient.ci ? patient.ci : ``} change={HandleChangeDataPatient} name="ci" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>

                    <LabelInput customClass="col-span-3" color="accent" label="Teléfono">
                        <Input value={patient && patient.phone ? patient.phone : ``} change={HandleChangeDataPatient} name="phone" color="accent" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>
                    <LabelInput customClass="col-span-3" color="accent" label="Correo">
                        <Input value={patient && patient.email ? patient.email : ``} change={HandleChangeDataPatient} type="email" name="email" color="accent" customClass="bg-base-300 border border-base-300" />
                    </LabelInput>
                    <LabelInput color="accent" customClass="col-span-12" label="Dirección">
                        <textarea onChange={HandleChangeDataPatient} name="address" className="p-3 bg-base-300 max-h-24 border border-base-300 w-full" value={patient && patient.address ? patient.address : ``}></textarea>
                    </LabelInput>
                </form>

                {
                    customData && patient &&
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        <Subtitle customClass="col-span-3 text-xl font-black" text="Ficha Paciente" />
                        <Paragraph text="Pulse un botón para ver el formulario" customClass="col-span-3 text-sm" />

                        <Button color="primary" text="Heredofamiliares" click={() => OpenModalForm(<Heredofamiliares data={customData.heredofamiliares} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Personales Patológicos" click={() => OpenModalForm(<PersonalesPatologicos data={customData.personalesPatologicos} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Personales No Patológicos" click={() => OpenModalForm(<PersonalesNoPatologicos data={customData.personalesNoPatologicos} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Transtornos Gastrointestinales" click={() => OpenModalForm(<TranstornosGastrointestinales data={customData.transtornosGastrointestinales} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Gineco-obstétricos" click={() => OpenModalForm(<Ginecobstetricos data={customData.ginenoObstetricos} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Habitos de Alimentación" click={() => OpenModalForm(<HabitoDeAlimentacion data={customData.habitosDeAlimentacion} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Recordatorio 24h" click={() => OpenModalForm(<Recordatorio24h data={customData.recordatorio24h} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Exámenes de laboratorio" click={() => OpenModalForm(<ExamentesDeLaboratorio data={customData.examenesDeLaboratorio} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Diagnostico Nutricional" click={() => OpenModalForm(<DiagnosticoNutricional data={customData.diagnosticoNutricional} reload={Reload} id={id} patientId={customData.id} />)} />

                        <Button color="primary" text="Datos Extras" click={() => OpenModalForm(<DatosExtras reload={Reload} id={id} data={customData.datosExtras} patientId={customData.id} />)} />

                        <Button color="primary" text="Distribución Calórica" click={() => OpenModalForm(<DistribucionCalorica reload={Reload} id={id} data={customData.distribucionCalorica} patientId={customData.id} />)} />
                    </div>
                }

            </div>
        </div>
    )
}

export default DataPatientConsult;
