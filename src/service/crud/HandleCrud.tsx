import { URL_API } from "../../env";
import { ObjectSupport } from "../../types/app"
import { Crud } from "../../types/crud";
import { PaginationType } from "../../types/pagination";
import { RequestError } from "../../types/requets";
import { ActionSelect, ExtractObject } from "../../types/table/table";
import { GetToken } from "../auth/TokenStorage";

interface Props {
    object: ObjectSupport;
    query?: string;
    skip?: number;
    take?: number;
}

const token = GetToken();

export const GenerateCrud = async ({ object }: Props): Promise<Crud | RequestError> => {
    try {
        const url = `${URL_API}/${object}/gui`;
        const result = await fetch(url, { headers:{token:`${token}`} });
        if (!result.ok) {
            const json = await result.json() as RequestError | any;
            if (json.statusMessage && json.statusMessage === `error`) {
                json as RequestError;
                return json;
            }
            return {
                statusMessage: `error`,
                message: `Error temporal.`,
                status: 400
            }
        }
        const json = await result.json();
        return json;
    } catch (error) {
        return {
            statusMessage: `error`,
            message: `Error temporal.`,
            status: 400
        }
    }
}

export const GetHeaderLabel = async ({ object }: Props): Promise<string[]> => {
    const url = `${URL_API}/${object}/gui/table/header`;
    const result = await fetch(url, { headers:{token:`${token}`} });
    const json = await result.json() as string[];

    return json;
}

export const GetExtractLabel = async ({ object }: Props): Promise<(ExtractObject | string)[]> => {

    const url = `${URL_API}/${object}/gui/table/extract`;
    const result = await fetch(url, { headers:{token:`${token}`} });
    const json = await result.json() as (ExtractObject | string)[];

    return json;
}

export const GetListCrud = async ({ object, take, skip, query }: Props): Promise<{list:any[],pagination:PaginationType}> => {
    try {
        const url = `${URL_API}/${object}?skip=${skip}&take=${take}&${query}`;
        const result = await fetch(url, { headers:{token:`${token}`} });
        const json = await result.json() as {list:any[],pagination:PaginationType};
        return json;
    } catch (error) {
        return {list:[],pagination:{count:`0`,now:`0/0`}};
    }
}

export const GetActionCrud = async ({ object }: Props): Promise<ActionSelect[]> => {
    try {
        const url = `${URL_API}/${object}/gui/permit/screen`;
        const result = await fetch(url, { headers:{token:`${token}`} });
        const json = await result.json() as any[];
        return json;
    } catch (error) {
        return [];
    }
}

export const GetActionRow = async ({ object }: Props): Promise<ActionSelect[]> => {
    try {
        const url = `${URL_API}/${object}/gui/permit/row`;
        const result = await fetch(url, { headers:{token:`${token}`} });
        const json = await result.json() as any[];
        return json;
    } catch (error) {
        return [];
    }
}

