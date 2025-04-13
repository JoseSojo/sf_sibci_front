import { ExtractObject } from "../../types/table/table";
import FormatValue from "./FormatValue";

interface Props {
    item: any;
    extractBy: ExtractObject | string;
}

export default function ExtractValue({ extractBy, item }: Props) {

    const isString = typeof extractBy === `string`;
    let extract: string[] = []

    if (isString) {
        extract = extractBy.split(`.`);
    } else {
        extract = extractBy.stractBy.split(`.`);
    }

    try {
        if (extract.length == 1) return <FormatValue item={item} label={item[extract[0]]} extract={isString ? undefined : extractBy} />
        else if (extract.length == 2) return <FormatValue item={item} label={item[extract[0]][extract[1]]} extract={isString ? undefined : extractBy} />
        else if (extract.length == 3) return <FormatValue item={item} label={item[extract[0]][extract[1]][extract[2]]} extract={isString ? undefined : extractBy} />
        else if (extract.length == 4) return <FormatValue item={item} label={item[extract[0]][extract[1]][extract[2]][extract[3]]} extract={isString ? undefined : extractBy} />
        else if (extract.length == 5) return <FormatValue item={item} label={item[extract[0]][extract[1]][extract[2]][extract[3]][extract[4]]} extract={isString ? undefined : extractBy} />
        else if (extract.length == 6) return <FormatValue item={item} label={item[extract[0]][extract[1]][extract[2]][extract[3]][extract[4]][extract[5]]} extract={isString ? undefined : extractBy} />
        else if (extract.length == 7) return <FormatValue item={item} label={item[extract[0]][extract[1]][extract[2]][extract[3]][extract[4]][extract[5]][extract[6]]} extract={isString ? undefined : extractBy} />
        else if (extract.length == 8) return <FormatValue item={item} label={item[extract[0]][extract[1]][extract[2]][extract[3]][extract[4]][extract[5]][extract[6]][extract[7]]} extract={isString ? undefined : extractBy} />

        return ``;
    } catch (error) {
        return ``;
    }
}
