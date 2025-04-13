import { IconsType } from "../app";

type customString = string[];

type extractType = `username` | `tag` | `number` | `date` | `keywords` | `normal`;

interface ExtractObject {
    type: extractType;
    stractBy: string
}

interface ExtractObjectFicha {
    type: extractType;
    stractBy: string;
    label: string
}

interface TableHeaderType {
    label: customString;
} 

interface TableBodyType {
    label: any[];
    extract: (ExtractObject | string)[];
    cols?: any; 
} 

interface ActionSelect {
    label: string;
    ico?: IconsType;
    value?: `create` | `update` | `delete` | `unique`;
    use: `pag` | `modal`
}

interface TableType {
    header: TableHeaderType;
    body: TableBodyType;
    actionsSelect?: ActionSelect;
    handleActionSelect?: (param?: any) => void;
    actionButton?: ReactNode;
    actionClickRow?: boolean;
    handleActionClickRow?: (param?: any) => void;
}

type FnChangeSelect = (action: `create` | `update` | `delete` | `unique`, use: `pag` | `modal`) => void

export {
    TableType,
    TableHeaderType,
    TableBodyType,
    ActionSelect,
    ExtractObject,
    customString,
    FnChangeSelect,
    ExtractObjectFicha
}
