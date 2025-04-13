import { FC, useEffect, useState } from "react";
import { Statictic } from "../../../../types/statictics";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import ChartComponent from "../../compounds/card/CardGraphic";
import Subtitle from "../../atoms/text/Subtitle";
import Button from "../../atoms/Button";
import HandlerIco from "../../../../service/ui/HandlerIco";

interface UniqueStaticticsConsultProps {
    path: string;
    reload: boolean;
}

const UniqueStaticticsConsult: FC<UniqueStaticticsConsultProps> = ({ path, reload }) => {

    const [title, setTitle] = useState<string>(`Estadística`);
    const [found, setFound] = useState<Statictic[] | null>(null);
    const [reloadInternal, setReloadInternal] = useState(true);

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/statictics${path}/`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json();
            console.log(json);
            if (json.statictic) setFound(json.statictic);
            if (json.title) setTitle(json.title);
        })()
    }, [reload, reloadInternal]);

    return (
        <>{
            found &&
            <div className="rounded-t-lg pt-2 border mt-4">
                <header className="px-3 flex justify-between items-center py-3">
                    <Subtitle text={title} customClass="font-bold" size="xl" />
                    <ul className="flex gap-3">
                        <li>
                            <Button click={() => setReloadInternal(!reloadInternal)} ico={<HandlerIco ico="reload" />} />
                        </li>
                    </ul>
                </header>
                <ChartComponent data={found} title="" />
            </div>
        }</>
    )
}

export default UniqueStaticticsConsult; 
