import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import NotificationItem from "../../compounds/notification/NotificationItem";
import Button from "../../atoms/Button";
import HandlerIco from "../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import Text from "../../atoms/text/Text";
import Input from "../../atoms/input/Input";
import TablePagination from "../../compounds/table/TablePagination";
import { PaginationType } from "../../../../types/pagination";

interface SectionNotificationProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    open: boolean
}

const SectionNotification: FC<SectionNotificationProps> = ({ setIsOpen }) => {

    const [notifications, setNotifications] = useState<any[] | null>(null);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);
    const [date, setDate] = useState<Date | null>(null);
    const [param, setParam] = useState<string | null>(null);
    const [load, setLoad] = useState(true);
    const [reload, setReload] = useState(false);
    const [pagination, setPagination] = useState<PaginationType | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => ExecuteRequets(param ? param : ``, skip, take), 500);
        return () => {
            clearTimeout(handler);
        };
    }, [param, date, skip, take, reload])

    const ExecuteRequets = useCallback(async (cparam: string, skip:number, take:number) => {
        setLoad(true);
        const url = `${URL_API}/notification/?skip=${skip}&take=${take}&param=${cparam ? cparam : ``}&date=${date ? date : ``}`;
        const result = await fetch(url, { headers: { token: `${GetToken()}` } });
        const json = await result.json();
        setNotifications(json.body);
        setPagination(json.pagination);
        setLoad(false);
    }, []);

    return (
        <div className="w-full h-full bg-gray-800 bg-opacity-90 fixed top-0 left-0 flex items-center justify-end z-50">
            <div className="w-4/12 bg-base-300 h-screen overflow-y-auto p-8 relative">
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Notificaciones</p>
                    <div className="flex gap-3">
                        <Button
                            click={() => {
                                setReload(!reload);
                                setParam(``);
                                setDate(null);
                                setTake(10);
                                setSkip(0);
                                
                            }}
                            ico={<HandlerIco ico="reload" />}
                        />
                        <Button
                            click={() => setIsOpen(false)}
                            ico={<HandlerIco ico="x" />}
                        />

                    </div>
                </div>
                <div className="w-full mt-3 grid grid-cols-[5fr_.5fr]">

                    <Input change={(e) => {
                        setParam(e.target.value);
                    }} placeholder="Buscar..." customClass="w-full" />
                    {/* <input
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            if (!isNaN(date.getTime())) setDate(date);
                            else setDate(null);
                        }}
                        type="date"
                        className="input input-sm w-full border border-info"
                    /> */}

                </div>
                {
                    load
                        ? <div className="w-full py-3 flex justify-center"><Text text="" customClass="loading loading-spinner" /></div>
                        : <div className="mt-8 space-y-4">
                            {
                                notifications && notifications.length > 0
                                    ? <>
                                        {
                                            notifications.map((item) => (
                                                <NotificationItem
                                                    name={item.generateBy}
                                                    action={item.content}
                                                    time={item.createAt}
                                                    userBy={item.userByReference}
                                                />
                                            ))
                                        }
                                        {
                                            pagination && <TablePagination
                                                pagination={pagination}
                                                nextFn={() => setSkip(skip + take)}
                                                prevFn={() => setSkip(skip - take)}
                                            />
                                        }
                                    </>
                                    : <div className="w-full py-3 flex justify-center"><Text text="Sin notificaciones" customClass="" /></div>
                            }
                        </div>
                }

            </div>
        </div>
    )
}

export default SectionNotification;
