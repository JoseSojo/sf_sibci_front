import { IconsType } from "../../../types/app";
import { NavbarChild } from "../../../types/navbar";
import { SlideChildType } from "../../../types/slide";
import ExecuteRequetsGet from "../../requets/ExecuteRequetsGet"

interface Props {
    path: string
}

export const GenerateSlide = async ({ path }: Props) => {
    const result = await ExecuteRequetsGet({ path, token:true });
    if(result.statusMessage === `success`) {
        return result.body as SlideChildType[];
    }

    return null;
}

export const GenerateCard = async ({ path }: Props) => {
    const result = await ExecuteRequetsGet({ path, token:true });
    if(result.statusMessage === `success`) {
        return result.body as {title:string,count:number|string,ico:IconsType}[];
    }

    return null;
}

export const GenerateNavbar = async ({ path }: Props) => {
    const result = await ExecuteRequetsGet({ path, token:true });
    if(result.statusMessage === `success`) {
        return result.body as NavbarChild[];
    }

    return null;
}
