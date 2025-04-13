import { FC, FormEvent, useState } from "react";
import LabelInput from "../../compounds/LabelInput";
import Input from "../../atoms/input/Input";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import ButtonNotLink from "../../atoms/ButtonNotLink";
import Subtitle from "../../atoms/text/Subtitle";
import HandlerIco from "../../../../service/ui/HandlerIco";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import { useNotification } from "../../../../context/NotificationContext";

interface CreateCalendarProps {
    id: string;
    reloadFn: () => void;
    arg: DateClickArg
}

const CreateCalendar: FC<CreateCalendarProps> = ({ id, reloadFn,arg }) => {
    const [title, setTitle] = useState(``);
    const notification = useNotification();

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            const url = `${URL_API}/consult/agend/create/${id}`;
            const body = { title, start:arg.date, end: new Date(arg.date.getTime() + (60*12) + 60 + 1000) };
            const result = await fetch(url, { method:`POST`,headers:{ token:`${GetToken()}`, "Content-Type":`application/json` }, body:JSON.stringify(body) });
            const json = await result.json();
            notification.init(json.message, json.statusMessage)
            reloadFn();

            // id: String(Math.random()),
            // title,
            // start: arg.date,
            // end: new Date(arg.date.getTime() + 60 * 60 * 1000), // +1 hora,
        })()
    }

    return (
        <form onSubmit={HandleSubmit} className="w-[40%] bg-base-300 shadow rounded-lg p-4">
            <Subtitle text="Registrar" customClass="text-center font-black" size="3xl" />
            <LabelInput color="primary" label="Título" customClass="">
                <Input change={(e) => setTitle(e.target.value)} color="primary" />
            </LabelInput>
            <div className="mt-3">
                <ButtonNotLink type="submit" color="success" ico={<HandlerIco ico="create" />} text="registrar" />
            </div>
        </form>
    )
}

export default CreateCalendar;
