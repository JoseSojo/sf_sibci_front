import { URL_API } from "../../env";
import { RequestError, RequestSuccess } from "../../types/requets";
import { GetToken } from "../auth/TokenStorage";

interface ExecuteRequetsGetProps {
    path: string;
    token: boolean;
}

const ExecuteRequetsGet = async ({ path,token }: ExecuteRequetsGetProps): Promise<RequestError | RequestSuccess > => {

    try {

        const url = `${URL_API}${path}`;
        const result = await fetch(url, {
            method: `GET`,
            headers: {
                token: token ? `${GetToken()}` : ``
            }
        });

        if(!result.ok) return {
            message: `Error temporal`,
            status:400,
            statusMessage: `error`
        }

        const json = await result.json() as RequestSuccess;
        return json;

    } catch (error) {
        return {
            message: `Error temporal`,
            status:400,
            statusMessage: `error`
        }
    }

}

export default ExecuteRequetsGet;
