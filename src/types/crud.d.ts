import { Icon } from "@tabler/icons-react"
import { IconsType, ObjectSupport } from "./app.d"

interface ActionsCrud {
    ico: IconsType;
    label: string;
    path?: string;
    use: `pag` | `modal`;
}

interface ActionsRowCrud {
    label: string;
    use: `pag` | `modal`;
    ico?: IconsType,
    action: `update` | `delete` | `create` | `list`;
    path?: string;
}

interface GraphicRow {
    type?: `bar` | `line`;
    title: string;
    data: { time:string, value: number }[]
}

interface GraphicAvaliable {
    path: string
}

interface Crud {
    label: string;
    object: ObjectSupport;
    actions: ActionsCrud[];
    actionsRow: ActionsRowCrud[];
    graphic: GraphicAvaliable[];
    internalListPath?: string
}

export {
    Crud,
    ActionsCrud,
    ActionsRowCrud,
    GraphicRow
}
