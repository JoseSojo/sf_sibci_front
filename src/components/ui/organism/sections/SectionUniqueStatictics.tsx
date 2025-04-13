import { ChangeEvent, FC, useEffect, useState } from "react";
import { Statictic } from "../../../../types/statictics";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import ChartComponent from "../../compounds/card/CardGraphic";
import Subtitle from "../../atoms/text/Subtitle";
import Button from "../../atoms/Button";
import HandlerIco from "../../../../service/ui/HandlerIco";

interface SectionUniqueStaticticsProps {
    path: string;
    reload: boolean;
}

const SectionUniqueStatictics: FC<SectionUniqueStaticticsProps> = ({ path, reload }) => {

    const [yearList, setYearList] = useState<any[] | null>(null);
    const [year, setYear] = useState(2025);
    const [type, setType] = useState<`month` | `year`>(`month`);
    const [title, setTitle] = useState<string>(`Estadística`);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [found, setFound] = useState<Statictic[] | null>(null);
    const [reloadInternal, setReloadInternal] = useState(true);

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/statictics${path}/?year=${year}&month=${month}&type=${type}`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json();
            if (json.statictic) setFound(json.statictic);
            if (json.title) setTitle(json.title);
            if (json.yearList) setYearList(json.yearList);
        })()
    }, [month, year, type, reload, reloadInternal]);

    const ChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
        const setNewMonth = Number(e.target.value);
        setMonth(setNewMonth);
    }

    const ChangeYear = (e: ChangeEvent<HTMLSelectElement>) => {
        const setNewYear = Number(e.target.value);
        setYear(setNewYear);
    }

    const ChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
        const setNewType: `month` | `year` = e.target.value as `month` | `year`;
        setType(setNewType);
    }

    return (
        <>{
            found &&
            <div className="rounded-t-lg">
                <header className=" px-3 flex justify-between items-center py-3 bg-gradient-to-b from-transparent to-primary/20">
                    <Subtitle text={title} customClass="font-bold" size="xl" />
                    <ul className="flex gap-3">
                        <li>
                            <Button click={() => setReloadInternal(!reloadInternal)} ico={<HandlerIco ico="reload" />} />
                        </li>
                        <li>
                            {yearList &&
                                <select onChange={ChangeYear} className="select select-sm focus:outline-none">
                                    <option value={``}>años</option>
                                    {yearList.map(year => <option selected={year.year == year ? true : false} value={year.year}>{year.year}</option>)}
                                </select>
                            }
                        </li>
                        <li>
                            {
                                type === `month` && <select onChange={ChangeMonth} className="select select-sm focus:outline-none">
                                    <option value={``}>mes</option>
                                    <option selected={month == 1 ? true : false} value={1}>ENERO</option>
                                    <option selected={month == 2 ? true : false} value={2}>FEBRERO</option>
                                    <option selected={month == 3 ? true : false} value={3}>MARZO</option>
                                    <option selected={month == 4 ? true : false} value={4}>ABRIL</option>
                                    <option selected={month == 5 ? true : false} value={5}>MAYO</option>
                                    <option selected={month == 6 ? true : false} value={6}>JUNIO</option>
                                    <option selected={month == 7 ? true : false} value={7}>JULIO</option>
                                    <option selected={month == 8 ? true : false} value={8}>AGOSTO</option>
                                    <option selected={month == 9 ? true : false} value={9}>SEPTIEMBRE</option>
                                    <option selected={month == 10 ? true : false} value={10}>OCTUBRE</option>
                                    <option selected={month == 11 ? true : false} value={11}>NOVIEMBRE</option>
                                    <option selected={month == 12 ? true : false} value={12}>DICIEMBRE</option>
                                </select>
                            }
                        </li>
                        <li>
                            <select onChange={ChangeType} className="select select-sm focus:outline-none">
                                <option value={``}>tipo</option>
                                <option value={`month`}>Por Meses</option>
                                <option value={`year`}>Por Años</option>
                            </select>
                        </li>
                    </ul>
                </header>
                <ChartComponent data={found} title="" />
            </div>
        }</>
    )
}

export default SectionUniqueStatictics; 
