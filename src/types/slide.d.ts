import { IconsType, ObjectSupport } from "./app";

export type TypeChildSlide = `pag`

export interface SlideChildType {
    label: string;
    type: TypeChildSlide;
    path: string;
    object: ObjectSupport;
    ico: IconsType;
    childs?: { label: string, ico: IconsType, path:string, object:ObjectSupport }[]
}

export type SliceList = SlideChildType[]
