import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ObjectSupport } from "../../../types/app";
import { Crud } from "../../../types/crud";
import { GenerateCrud } from "../../../service/crud/HandleCrud";
import CrudSkeleton from "../../../components/ui/compounds/skeletons/CrudSkeleton";
import { RequestError } from "../../../types/requets";
import { useNotification } from "../../../context/NotificationContext";

interface AbstractCreateProps { }

const AbstractCreate: FC<AbstractCreateProps> = ({ }) => {
    const { object } = useParams() as { object: ObjectSupport }
    const location = useLocation();
    const notification = useNotification();

    const [crud, setCrud] = useState<Crud | null>(null);
    const [load, setLoad] = useState(true);
    // const [reload, setreload] = useState(false);

    // const [skip, setSkip] = useState(0);
    // const [take, setTake] = useState(10);
    // const [filter, setFilter] = useState(``);

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

    // const Reload = () => setreload(!reload);

    // const prevFn = () => {
    //     setSkip(skip-take);
    // }
    // const nextFn = () => {
    //     setSkip(skip+take);
    // }

    return load
        ? <CrudSkeleton />
        : crud
            ? (
                <div className="grid gap-3">
                    create

                </div>
            )
            : <div className="grid gap-3" >
                <div className="grid grid-cols-[.75fr_.25fr] gap-3" >
                    <div className="p-5 w-full rounded-lg bg-base-300">No se obtuvieron resultados. intente más tarde.</div>
                </div>
            </div>
}

export default AbstractCreate;
