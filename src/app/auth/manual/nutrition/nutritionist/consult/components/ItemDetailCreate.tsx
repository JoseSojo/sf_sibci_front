import { ChangeEvent, FC, useState } from "react";
import { DetailsConsult } from "../../../../../../../types/consult/consult";
import Text from "../../../../../../../components/ui/atoms/text/Text";
import Paragraph from "../../../../../../../components/ui/atoms/text/Paragraph";

interface ItemDetailCreateProps {
    value: boolean;
    description: string;
    label: string;
    name: keyof DetailsConsult;
    changeDat: (name: keyof DetailsConsult, value:boolean) => void
}

const ItemDetailCreate: FC<ItemDetailCreateProps> = ({ changeDat,description,label,name,value }) => {

    const [check, setCheck] = useState<boolean>(value);

    const ChandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const vl = e.target.checked ? true : false;
        setCheck(vl);
        changeDat(name, vl);
    }

    return (
        <label className="grid grid-cols-[10%_25%_1fr] border-b border-primary p-1 ">
            <input type="checkbox" className="checkbox checkbox-primary" checked={check} onChange={ChandleChange} />
            <Text text={label} />
            <Paragraph text={description} />
        </label>
    )
}

export default ItemDetailCreate;
