import { URL_API } from "../../env";
import { ObjectSupport } from "../../types/app"
import { ActionsRowCrud } from "../../types/crud";
import { Ficha } from "../../types/ficha";
import { RequestSuccess } from "../../types/requets";
import { ExtractObjectFicha } from "../../types/table/table";
import { GetToken } from "../auth/TokenStorage";

interface Props {
    object: ObjectSupport;
    query?: string;
    skip?: number;
    take?: number;
    id: string
}

const token = GetToken();

export const GenerateFicha = async ({ object, id, query }: Props): Promise<Ficha> => {

    const actionsPromise = GetActionFichaScreen({ object, id, query });

    let action = await actionsPromise;

    return {
        actionsRow: action.actions,
        graphic: [],
        label: action.label ? action.label : `Ficha`,
        object: `user`,
        internalListPath: action.internalList
    }
}

export const GetObjectFicha = async ({ id, object,query }: Props) => {
    try {

        const url = `${URL_API}/${object}/${id}/unique/${query ? `?${query}` : ``}`;
        const result = await fetch(url, { headers: { token: `${GetToken()}` } })

        if (!result.ok) {
            return {
                statusMessage: `error`,
                message: `Error temporal.`,
                status: 400
            };
        }

        const json = await result.json() as RequestSuccess;
        return json;

    } catch (error) {
        return {
            statusMessage: `error`,
            message: `Error temporal.`,
            status: 400
        };
    }
}

export const GetUiFichaCrud = async ({ object }: Props): Promise<ExtractObjectFicha[]> => {
    const url = `${URL_API}/${object}/gui/ficha/extract`;
    const result = await fetch(url, { headers: { token: `${GetToken()}` } });

    if (!result.ok) return [];

    const json = await result.json() as ExtractObjectFicha[];
    return json ? json : [];
}

// export const GetInternalListFicha = async ({ object, take, skip }: Props): Promise<any[]> => {

//     return [];
// }

export const GetActionFicha = async ({ object }: Props): Promise<ActionsRowCrud[]> => {
    try {
        const url = `${URL_API}/${object}/gui/permit/row`;
        const result = await fetch(url, { headers: { token: `${token}` } });
        const json = await result.json() as any[];
        return json;
    } catch (error) {
        return [];
    }
}


export const GetActionFichaScreen = async ({ object,query }: Props): Promise<{actions:ActionsRowCrud[],internalList?:ObjectSupport,label?:string}> => {
    try {
        const url = `${URL_API}/${object}/gui/permit/ficha/screen/${query ? `?${query}` : ``}`;
        const result = await fetch(url, { headers: { token: `${token}` } });
        const json = await result.json() as {actions:ActionsRowCrud[],internalList?:ObjectSupport,label?:string};
        return json;
    } catch (error) {
        return {actions:[]};
    }
}

