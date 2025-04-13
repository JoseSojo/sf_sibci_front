import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ObjectSupport } from "../../../types/app";
import { Crud } from "../../../types/crud";
import { GenerateCrud } from "../../../service/crud/HandleCrud";
import CrudSkeleton from "../../../components/ui/compounds/skeletons/CrudSkeleton";
import Button from "../../../components/ui/atoms/Button";
import HandlerIco from "../../../service/ui/HandlerIco";
import AbstractList from "./partials/AbstractList";
import { useModal } from "../../../context/ModalContext";
import { HandlerActionsScreen } from "../../../service/crud/ActionsScreen";
import { RequestError } from "../../../types/requets";
import { useNotification } from "../../../context/NotificationContext";
import Input from "../../../components/ui/atoms/input/Input";

interface AbstractCrudProps { }

const AbstractCrud: FC<AbstractCrudProps> = ({ }) => {
    const { object } = useParams() as { object: ObjectSupport }
    const location = useLocation();
    const notification = useNotification();
    const navigate = useNavigate();

    const { init } = useModal();

    const [crud, setCrud] = useState<Crud | null>(null);
    const [load, setLoad] = useState(true);
    const [reload, setreload] = useState(false);

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);
    const [filter, setFilter] = useState(``);

    const NavigateTo = (path: string) => navigate(path, { viewTransition: true });

    useEffect(() => {
        (async () => {
            setLoad(true);
            const responseCrud = await GenerateCrud({ object });
            const error = responseCrud as RequestError;
            if (error.message && error.status && error.statusMessage) {
                return notification.init(`Error temporal`, `error`);
            }
            const set = responseCrud as Crud;
            setCrud(set);
            setLoad(false);
        })()
    }, [location])

    const Reload = () => setreload(!reload);

    const prevFn = () => {
        setSkip(skip-take);
    }
    const nextFn = () => {
        setSkip(skip+take);
    }

    return load
        ? <CrudSkeleton />
        : crud
            ? (
                <div className="grid gap-3">
                    <div className="flex gap-3 px-5">
                        <div className="w-full flex justify-start items-center text-2xl font-black flex-1">{crud.label}</div>
                        <div className="flex gap-3">
                            <Input
                                change={(e) => setFilter(e.target.value)}
                                color="info"
                                size="sm"
                                value={filter}
                            />
                            {
                                crud.actions.map((action) => (
                                    <Button
                                        ico={<HandlerIco ico={action.ico} />}
                                        size="sm"
                                        text={action.label}
                                        click={() => HandlerActionsScreen(action, init, object, Reload, NavigateTo)}
                                        color={action.ico === `create` ? `success` : action.ico === `report` ? `error` : `info`}
                                    />
                                ))
                            }
                            <select onChange={(e) => setTake(Number(e.target.value))} className="h-full select border text-gray-600 dark:bg-base-300 select-xs">
                                <option value={10}>mostrar</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                    <AbstractList filter={filter} nextFn={nextFn} prevFn={prevFn} reloadFn={Reload} reload={reload} object={object} skip={skip} take={take} />
                </div>
            )
            : <div className="grid gap-3" >
                <div className="grid grid-cols-[.75fr_.25fr] gap-3" >
                    <div className="p-5 w-full rounded-lg bg-base-300">No se obtuvieron resultados. intente más tarde.</div>
                </div>
            </div>
}

export default AbstractCrud;
