import { FC, ReactNode } from "react";
import { SizeType } from "../../../types/ui/size";
import Paragraph from "../atoms/text/Paragraph";
import { ColorType } from "../../../types/ui/colors";

interface LabelInputProps {
    color:          ColorType;
    label:          string;
    description?:   string;
    customClass?:   string;
    size?:          SizeType;
    children:       ReactNode;
}

const LabelInput: FC<LabelInputProps> = ({ description=``, color, label, customClass=``, size=`sm`, children }) => {

    const customColor =
        color === `info` ? `text-info`
            : color === `error` ? `text-error`
                : color === `success` ? `text-success`
                    : color === `warning` ? `text-warning`
                        : color === `accent` ? `text-accent`
                            : color === `primary` ? `text-primary`
                                : `text-base`;

    const customSize =
        size === `xs` ? `text-xs`
            : size === `sm` ? `text-sm`
                : size === `md` ? `text-md`
                    : size === `lg` ? `text-lg`
                        : size === `xl` ? `text-xl`
                            : `text-sm`;

    const cls = `w-full ${customSize} ${customClass}`;

    return (
        <label className={`${cls}`}>
            <span className={`${customColor}`}>{label}</span>
            {children}
            <Paragraph text={description} customClass="w-full text-xs text-base font-light" />
        </label>
    )
}

export default LabelInput;
