import { FC } from "react";

interface TextProps {
    text: string;
    customClass?: string;
    size?: `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `3xl`;
}

const Text: FC<TextProps> = ({ size=`md`, text, customClass }) => {

    let cls = ` ${customClass} `

    if(size === `xs`) cls += `text-xs`;
    else if(size === `sm`) cls += `text-sm`;
    else if(size === `md`) cls += `text-md`;
    else if(size === `lg`) cls += `text-lg`;
    else if(size === `xl`) cls += `text-xl`;
    else if(size === `2xl`) cls += `text-2xl`;
    else if(size === `3xl`) cls += `text-3xl`;

    return <span
        className={` ${cls} `}
    >
        { text }
    </span>
} 

export default Text;
