import { FC, ReactNode } from "react";
import { TextType } from "../../../../types/ui/text";

interface ParagraphProps extends TextType {
    children?: ReactNode
}

const Paragraph: FC<ParagraphProps> = ({ size=`md`, text, customClass,children }) => {
    let cls = ` ${customClass} `

    if(size === `xs`) cls += `text-xs`;
    else if(size === `sm`) cls += `text-sm`;
    else if(size === `md`) cls += `text-md`;
    else if(size === `lg`) cls += `text-lg`;
    else if(size === `xl`) cls += `text-xl`;
    else if(size === `2xl`) cls += `text-2xl`;
    else if(size === `3xl`) cls += `text-3xl`;

    return <p
        className={` ${cls} `}
    >
        { text }
        { children }
    </p>
} 

export default Paragraph;
