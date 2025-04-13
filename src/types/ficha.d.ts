
import { ObjectSupport } from "./app";
import { ActionsRowCrud, GraphicRow } from "./crud";

interface Ficha {
    label: string,
    object: ObjectSupport,
    actionsRow: ActionsRowCrud[];
    graphic: GraphicRow[];
    internalListPath?: ObjectSupport;
}

export {
    Ficha
}
