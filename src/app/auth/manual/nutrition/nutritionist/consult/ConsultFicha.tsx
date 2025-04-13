import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AbstractCrudFichaInit from "../../../../abstract/AbstractCrudFichaInit";
import { URL_API } from "../../../../../../env";
import { GetToken } from "../../../../../../service/auth/TokenStorage";
import { DetailsConsult } from "../../../../../../types/consult/consult";
import DataPatientConsult from "../../../../../../components/ui/organism/nutrition/nutritionist/DataPatientConsult";
import ExchangeConsult from "../../../../../../components/ui/organism/nutrition/nutritionist/ExchangeConsult";
import MenuConsult from "../../../../../../components/ui/organism/nutrition/nutritionist/MenuConsult";
import RecomendationsConsult from "../../../../../../components/ui/organism/nutrition/nutritionist/RecomendationsConsult";
import LogConsult from "../../../../../../components/ui/organism/nutrition/nutritionist/LogConsult";
import StaticticsConsult from "../../../../../../components/ui/organism/nutrition/nutritionist/StaticticsConsult";
import IndicadoresAntopometricos from "../../../../../../components/ui/organism/nutrition/nutritionist/IndicadoresAntopometricos";

interface ConsultCreateProps {
}


const ConsultFicha: FC<ConsultCreateProps> = ({ }) => {
    const { id } = useParams() as { id: string };

    const [load, setLoad] = useState(true);
    const [sections, setSections] = useState<DetailsConsult | null>(null);

    useEffect(() => {
        (async () => {
            setLoad(true);
            const url = `${URL_API}/consult/${id}/details`;
            const response = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await response.json();
            setSections(() => json.body);
            setLoad(false);
            load;
        })()
    }, []);

    return (
        <div className="">
            {
                sections
                    ? <div className="tabs tabs-border">
                        <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="General" defaultChecked />
                        <div className="tab-content border-base-300 bg-base-100 p-3">
                            <AbstractCrudFichaInit id={id} object="consult" />
                        </div>

                        {sections.patientData &&
                            <>
                                <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="Paciente" />
                                <div className="tab-content border-base-300 bg-base-100 p-3">
                                    <DataPatientConsult id={id} />
                                </div>
                                <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="Indicadores Antopometricos" />
                                <div className="tab-content border-base-300 bg-base-100 p-3">
                                    <IndicadoresAntopometricos id={id} />
                                </div>
                            </>
                        }
                        {sections.exchange &&
                            <>
                                <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="Listas" />
                                <div className="tab-content border-base-300 bg-base-100 p-3">
                                    <ExchangeConsult id={id} />
                                </div>
                            </>
                        }
                        {sections.menus &&
                            <>
                                <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="Menús" />
                                <div className="tab-content border-base-300 bg-base-100 p-3">
                                    <MenuConsult id={id} />
                                </div>
                            </>
                        }

                        {
                            sections.agend &&
                            <>
                                {/* <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="Agenda" /> */}
                                {/* <div className="tab-content border-base-300 bg-base-100 p-3">
                                    <AgendConsult id={id} />
                                </div> */}
                            </>
                        }


                        {
                            sections.recommendations &&
                            <>
                                <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="Recomentaciones" />
                                <div className="tab-content border-base-300 bg-base-100 p-3">
                                    <RecomendationsConsult id={id} />
                                </div>
                            </>
                        }


                        {
                            sections.log &&
                            <>
                                <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="Bitacora" />
                                <div className="tab-content border-base-300 bg-base-100 p-3">
                                    <LogConsult id={id} />
                                </div>
                            </>
                        }

                        {
                            sections.estatictics &&
                            <>
                                <input type="radio" name="ficha_consult_tabs" className="tab" aria-label="Estadísticas" />
                                <div className="tab-content border-base-300 bg-base-100 p-3">
                                    <StaticticsConsult id={id} />
                                </div>
                            </>
                        }

                    </div>
                    : <></>
            }


        </div>
    )
}

export default ConsultFicha;
