import { RequestError, RequestSuccess } from "../../types/requets";

interface ExecuteRequetsPostProps {
    url: string,
    token?: string,
    body: object,
    type?: `application/json`,
    update?: boolean,
    query?: string
}

const ExecuteRequetsPost = async ({ body,token,url,type,update }: ExecuteRequetsPostProps): Promise<RequestError | RequestSuccess> => {

    const result = await fetch(url, {
        method: update ? `PUT` : `POST`,
        headers: {
            token: token ? token : ``,
            "Content-Type": type ? type : ``
        },
        body: JSON.stringify(body),
    });
    const json = await result.json() as RequestError | RequestSuccess;
    return json;
}

export {
    ExecuteRequetsPost
}
