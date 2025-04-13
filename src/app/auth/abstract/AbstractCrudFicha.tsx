import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconsType, ObjectSupport } from "../../../types/app";
import CrudSkeleton from "../../../components/ui/compounds/skeletons/CrudSkeleton";
import { useModal } from "../../../context/ModalContext";
import { Ficha } from "../../../types/ficha";
import { GenerateFicha, GetObjectFicha, GetUiFichaCrud } from "../../../service/crud/HandleFicha";
import { ExtractObjectFicha } from "../../../types/table/table";
import Subtitle from "../../../components/ui/atoms/text/Subtitle";
import HandlerIco from "../../../service/ui/HandlerIco";
import Button from "../../../components/ui/atoms/Button";
import AbstractDelete from "./partials/AbstractDelete";
import ExtractValue from "../../../utils/handler/ExtractValue";
import CreateForm from "./partials/CreateForm";
import AbstractCrudInit from "./AbstractCrudInit";

interface AbstractCrudFichaProps { }

const AbstractCrudFicha: FC<AbstractCrudFichaProps> = ({ }) => {
    const { object, id } = useParams() as { object: ObjectSupport, id: string }

    const { init, close } = useModal();
    const navigate = useNavigate();

    const [crud, setCrud] = useState<Ficha | null>(null);
    const [fichaUI, setFichaUi] = useState<ExtractObjectFicha[] | null>(null);
    const [objectFicha, setObjectFicha] = useState<any | null>(null);
    const [load, setLoad] = useState(true);

    const [reload, setReload] = useState(true);

    useEffect(() => {
        (async () => {
            setLoad(true);
            const ficha = await GenerateFicha({ object, id });
            const ui = await GetUiFichaCrud({ object, id });
            const resposneObeject = await GetObjectFicha({ id, object }) as any;

            setObjectFicha(resposneObeject.body)
            setCrud(ficha);
            setFichaUi(ui);
            setLoad(false);
        })()
    }, [reload])

    const HandleChange = (use: `pag` | `modal`, action?: IconsType) => {
        if (action === `delete`) {
            return init(<AbstractDelete reload={() => navigate(`/dashboard/${object}`, { viewTransition: true })} close={close} id={id} object={object} />)
        }

        if (action === `list`) {
            return navigate(`/dashboard/${object}`, { viewTransition: true });
        }
        if (action === `update`) {
            if (use === "modal") return init(<CreateForm action="update" object={object} reload={() => setReload(!reload)} use="modal" id={id} />)
            else return navigate(`/dashboard/${object}`, { viewTransition: true });
        }
        if (action === `create`) {
            if (use === "modal") return init(<AbstractDelete reload={() => { }} close={close} id={id} object={object} />)
            else return navigate(`/dashboard/${object}`, { viewTransition: true });
        }
    }

    return load
        ? <CrudSkeleton />
        : crud && objectFicha && fichaUI
            ? (
                <div className="grid lg:grid-cols-2 gap-3">
                    <div className="w-full col-span-2 flex justify-between items-center">
                        <Subtitle text={`${crud.label}`} size="3xl" customClass="col-span-2" />
                        <ul className="flex gap-3">
                            {
                                crud.actionsRow && crud.actionsRow.map(item => (
                                    <Button
                                        ico={item.ico ? <HandlerIco ico={item.ico} /> : <></>}
                                        size="sm"
                                        text={item.label}
                                        click={() => HandleChange(item.use, item.ico)}
                                        color={
                                            item.ico === `create` ? `success`
                                                : item.ico === `update` ? `info`
                                                    : item.ico === `delete` ? `error`
                                                        : item.ico === `delete-row` ? `error`
                                                            : item.ico === `list` ? `primary`
                                                                : `info`}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                    <table className="table table-zebra-zebra border border-base-200">
                        <tbody>
                            {
                                fichaUI.map((ui) => (
                                    <tr><td className="py-1"><i>{ui.label}</i>: <b><ExtractValue extractBy={ui} item={objectFicha} /></b></td></tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {/* INTERNAL LIST START */}
                    {
                        crud && crud.internalListPath && crud.internalListPath && <div className="lg:col-span-2">
                            <AbstractCrudInit object={crud.internalListPath} id={id} />
                        </div>
                    }

                    {/* INTERNAL LIST END */}
                </div>
            )
            : <div className="grid gap-3">
                <div className="grid grid-cols-[.75fr_.25fr] gap-3" >
                    <div className="p-5 w-full rounded-lg bg-base-300">No se obtuvieron resultados. intente más tarde.</div>
                </div>
            </div>
}

export default AbstractCrudFicha;
