import { RegexType } from "../../service/validation/form.validation";

interface InputField {
    type: `email` | `text` | `password`;
    placeholder: string;
    value?: string;
    requiere?: boolean;
    customClass?: string;
    validation?: RegexType;
    label: string;
    key: string;
    name: string;
}

interface SelectField {
    placeholder: string;
    label: string;
    requiere?: boolean;
    customClass?: string;
    options: { label: string, value: string }[];
    key: string;
    name: string;
}

interface TextAreaType {
    label: string;
    requiere?: boolean;
    customClass?: string;
    value?: string;
    key: string
    name: string;
}

interface SelectFieldApi {
    label: string;
    requiere?: boolean;
    customClass?: string;
    key: string;
    name: string;
}


type Field =
    | {
        type: `input`;
        field: InputField;
    }
    | {
        type: `select`;
        field: SelectField;
    }
    | {
        type: `select-api`;
        path: string;
        field: SelectFieldApi;
    }
    | {
        type: `textarea`;
        field: TextAreaType;
    }

interface Form {
    label: string;
    path: string;
    method: `POST` | `PUT` | `DELETE`;
    fields: Field[];
}

export {
    Form,
    Field,
    InputField,
    SelectField,
    TextAreaType,
    SelectFieldApi
}
