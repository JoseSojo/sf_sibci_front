import { ExtractObject } from "../../types/table/table";
import { TwoLettersForTime } from "../format/FormatString";

interface Props {
    label: any;
    extract?: ExtractObject;
    item: any
}

export default function FormatValue({ label,extract }: Props) {

    if(!extract) {
        return (
            <>
                {label}
            </>
        )    
    }


    if(extract.type === `keywords`) {
        return label.map((item: any) => (
            <span className="badge badge-sm bg-gray-400 text-white dark:badge-neutral select-none mr-1">{item}</span>
        ))
    }
    else if(extract.type === `date`) {
        const dt = new Date(label);

        return <span>{`${TwoLettersForTime(dt.getDate())} - ${TwoLettersForTime((dt.getMonth()+1))} - ${TwoLettersForTime(dt.getFullYear())}`}</span>;
    } else if(extract.type === `number`) return <span className="font-mono" style={{ letterSpacing:1 }}>{label}</span>;
    else if(extract.type === `tag`) {

        let cls = `badge-ghost text-white`;

        if(label === `APROBADO`) cls = `badge-primary text-base`;
        else if(label === `RECHAZADO`) cls = `badge-warning`;
        else if(label === `CANCELADO`) cls = `badge-neutral`;
        else if(label === `Sí`) cls = `badge-primary`;
        else if(label === `NO`) cls = `badge-warning`;

        return <span className={`badge badge-sm text-xs font-bold py-2 ${cls} select-none`}>{label}</span>;
    }
    else if(extract.type === `username`) return <span className="">@{label}</span>;

    return (
        <>
            {label}
        </>
    )    
}
