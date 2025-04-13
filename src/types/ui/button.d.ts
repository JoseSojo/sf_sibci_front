import { ColorType } from "./colors";
import { SizeType } from "./size";
import { VariantType } from "./variants";

export interface ButtonType {
    url?: string;
    customClass?: string;
    text?: string;
    click?: (param?: any) => void;
    variant?: VariantType;
    color?: ColorType;
    ico?: ReactNode;
    children?: ReactNode;
    type?:  `button` | `submit`;
    size?: SizeType
}
