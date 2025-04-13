
type STATUS_CODE = 400 | 404 | 200 | 201 | 204;

type STATUS_CODE_MESSAGE =  `error` | `success`;

interface RequestError {
    status: STATUS_CODE;
    message: string;
    statusMessage: `error`
}

interface RequestSuccess {
    status: STATUS_CODE;
    message: string;
    statusMessage: `success`;
    body: any
}

export {
    STATUS_CODE,
    RequestError,
    RequestSuccess
}
