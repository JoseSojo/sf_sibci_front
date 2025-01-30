import { FC } from "react";

interface TitleProps {
    text: string;
    customClass?: string;
    size?: `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `3xl`;
}

const Title: FC<TitleProps> = ({ size=`md`, text, customClass }) => {

    let cls = ` ${customClass} `

    if(size === `xs`) cls += `text-xs`;
    else if(size === `sm`) cls += `text-sm`;
    else if(size === `md`) cls += `text-md`;
    else if(size === `lg`) cls += `text-lg`;
    else if(size === `xl`) cls += `text-xl`;
    else if(size === `2xl`) cls += `text-2xl`;
    else if(size === `3xl`) cls += `text-3xl`;

    return <h1
        className={` ${cls} `}
    >
        { text }
    </h1>
} 

export default Title;
