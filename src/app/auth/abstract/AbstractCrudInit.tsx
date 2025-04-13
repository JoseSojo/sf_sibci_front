import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

interface AbstractCrudInitProps {
    object: ObjectSupport;
    query?: string;
    id?: string;
    count?: number; 
    reloadVl?: boolean;
    userId?: string;
}

const AbstractCrudInit: FC<AbstractCrudInitProps> = ({ object,query,id,count,reloadVl,userId }) => {
    const location = useLocation();
    const notification = useNotification();
    const navigate = useNavigate();

    const { init } = useModal();
    const [crud, setCrud] = useState<Crud | null>(null);
    const [load, setLoad] = useState(true);
    const [reload, setreload] = useState(false);

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(count ? count : 10);
    const [filter, setFilter] = useState(``);

    useEffect(() => {
        (async () => {
            setLoad(true);
            const responseCrud = await GenerateCrud({ object, query });
            const error = responseCrud as RequestError;
            if (error.message && error.status && error.statusMessage) {
                return notification.init(`Error temporal`, `error`);
            }
            const set = responseCrud as Crud;
            setCrud(set);
            setLoad(false);
        })()
    }, [location])
    
    const NavigateTo = (path: string) => navigate(path, { viewTransition: true });

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
                                        click={() => HandlerActionsScreen(action, init, object, Reload, NavigateTo,id)}
                                        color={action.ico === `create` ? `success` : action.ico === `report` ? `error` : `info`}
                                    />
                                ))
                            }
                            <Button
                                ico={<HandlerIco ico="select" />}
                                size="sm"
                            >
                                <select onChange={(e) => setTake(Number(e.target.value))} className="w-full select bg-base-200 select-xs">
                                    <option value={10}>mostrar</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </Button>
                        </div>
                    </div>

                    <AbstractList filter={filter} query={`parentId=${id}&${userId ? `userId=${userId}` : ``}`} nextFn={nextFn} prevFn={prevFn} reloadFn={Reload} reload={reloadVl ? reloadVl : reload} object={object} skip={skip} take={take} />

                    {/* <div className="mt-5 px-5 gap-3">
                        {
                            crud.graphic.map(item => (
                                // <CardGraphic title={item.title} data={item.data} cols={6} />
                            ))
                        }
                    </div> */}

                </div>
            )
            : <div className="grid gap-3" >
                <div className="grid grid-cols-[.75fr_.25fr] gap-3" >
                    <div className="p-5 w-full rounded-lg bg-base-300">No se obtuvieron resultados. intente más tarde.</div>
                </div>
            </div>
}

export default AbstractCrudInit;
