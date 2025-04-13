import { FC } from "react";

interface ImageProps {
    src: string;
    alt: string;
    customClass: string;
    title?: string;
    w: number;
    h: number;
}

const Image: FC<ImageProps> = ({ alt,customClass,src,title,h,w }) => {

    
    return <img
        src={src}
        alt={alt}
        title={title ? title : ``}
        className={`${customClass}`}
        width={w}
        height={h}
    />
} 

export default Image;
