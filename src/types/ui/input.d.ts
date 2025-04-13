import { RegexType } from "../../service/validation/form.validation";
import { ColorType } from "./colors";
import { InputSize } from "./size";

type CustomInputType = `text` | `email` | `password` | `number` | `date`;


export interface InputType {
    type?:          CustomInputType;
    name?:          string;
    placeholder?:   string;
    customClass?:   string;
    color?:         ColorType;
    change?:        (e: ChangeEvent<HTMLInputElement>) => void;
    size?:          InputSize;
    regex?:         RegexType | undefined;
    value?:         string;
}