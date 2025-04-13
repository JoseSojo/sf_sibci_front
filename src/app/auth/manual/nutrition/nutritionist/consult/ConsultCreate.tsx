import { FC, FormEvent, useState } from "react";
import Subtitle from "../../../../../../components/ui/atoms/text/Subtitle";
import Button from "../../../../../../components/ui/atoms/Button";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import { useNavigate } from "react-router-dom";
import { FoodType } from "../../../../../../types/data/food";
import { useNotification } from "../../../../../../context/NotificationContext";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { URL_API } from "../../../../../../env";
import { DetailsConsult } from "../../../../../../types/consult/consult";
import ItemDetailCreate from "./components/ItemDetailCreate";

export interface FoodSelectUnity extends FoodType {
    unity?: string
}

interface ConsultCreateProps { }

const ConsultCreate: FC<ConsultCreateProps> = ({ }) => {
    const navigate = useNavigate();
    const notification = useNotification();

    const [data, setData] = useState<DetailsConsult>({ agend: false, estatictics: false, exchange: false, log: false, menus: false, patientData: false, recommendations: false });


    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {

            const createData = { ...data  };
            const url = `${URL_API}/consult/create`;
            alert(url);
            const responseFethc = await fetch(url, { 
                method: `POST`,
                headers: {
                    "Content-Type": "application/json",
                    token:`${GetToken()}`,
                },
                body:JSON.stringify(createData),
            });

            const response = await responseFethc.json();

            if(response.statusMessage === `error`) {
                notification.init(response.message, `error`);
                return;
            }

            navigate(`/dashboard/consult/${response.body.id}`);
            notification.init(response.message, `success`);
            return;
        })();

    }

    const HandleChange = (name: keyof DetailsConsult, value: boolean) => {
        setData(prev => {
            return { ...prev, [name]: value };
        })
    }

    return (
        <form onSubmit={HandleSubmit}>
            <div className="flex justify-between">
                <Subtitle text="Crear Consulta" customClass="text-xl font-black" />
                <ul className="flex gap-3">
                    <li>
                        <Button
                            type="submit"
                            color="success"
                            ico={<HandlerIco ico="create" />}
                            text="Crear"
                            click={() => {}}
                        />
                    </li>
                    <li>
                        <Button
                            color="info"
                            click={() => navigate(`/dashboard/consult`)}
                            text="lista"
                        />
                    </li>
                </ul>
            </div>

            <div className="grid gap-4">
                <ItemDetailCreate
                    description="Registro de toda la data referente al paciente."
                    label="Ficha Paciente"
                    name="patientData"
                    value={data.patientData}
                    changeDat={HandleChange}
                />
                <ItemDetailCreate
                    description="Asignación de menús."
                    label="Menús"
                    name="menus"
                    value={data.menus}
                    changeDat={HandleChange}
                />
                <ItemDetailCreate
                    description="Asignación de listas de intercambio."
                    label="Listas"
                    name="exchange"
                    value={data.exchange}
                    changeDat={HandleChange}
                />
                {/* <ItemDetailCreate
                    description="Registro de agenda en la consulta."
                    label="Agenda"
                    name="agend"
                    value={data.agend}
                    changeDat={HandleChange}
                /> */}
                <ItemDetailCreate
                    description="Registro de recomendaciones, y sugerencias a tu paciente."
                    label="Recomendaciones"
                    name="recommendations"
                    value={data.recommendations}
                    changeDat={HandleChange}
                />
                {/* <ItemDetailCreate
                    description="Registro de acciones en la consulta."
                    label="Bitacora"
                    name="log"
                    value={data.log}
                    changeDat={HandleChange}
                /> */}
                {/* <ItemDetailCreate
                    description="Sección de estadísticas."
                    label="Estadísticas"
                    name="estatictics"
                    value={data.estatictics}
                    changeDat={HandleChange}
                /> */}
            </div>
        </form>
    )
}

export default ConsultCreate;
