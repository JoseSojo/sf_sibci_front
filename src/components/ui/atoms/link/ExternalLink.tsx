import { FC, ReactNode } from "react";

interface ExternalLinkProps {
    url: string;
    customClass?: string;
    text?: string;
    variant?: `button` | `border` | `bottom` | `link` | `default`;
    color?: `info` | `success` | `error` | `accent` | `warning` | `default`;
    ico?: ReactNode;
    children?: ReactNode;
}

const ExternalLink: FC<ExternalLinkProps> = ({ customClass, text, children, ico, url, color=`default`, variant = `default` }) => {

    const btn = variant == `border` || variant == `bottom` || variant == `link` ? false : true;

    const customColor = 
        color === `info`        ? `${btn     ? `btn-info text-white`          : `${variant === `bottom` ? `border-b-info rounded-none btn-transparent`      : variant == `link` ? `` : `border-info`} text-info hover:btn-info hover:text-white`}  ` 
        : color === `error`     ? `${btn     ? `btn-error text-white`         : `${variant === `bottom` ? `border-b-error rounded-none btn-transparent`     : variant == `link` ? `` : `border-error`} text-error hover:btn-error hover:text-white`}  ` 
        : color === `success`   ? `${btn     ? `btn-success text-white`       : `${variant === `bottom` ? `border-b-success rounded-none btn-transparent`   : variant == `link` ? `` : `border-success`} text-success hover:btn-success hover:text-white`}  ` 
        : color === `warning`   ? `${btn     ? `btn-warning text-base-100 `   : `${variant === `bottom` ? `border-b-warning rounded-none btn-transparent`   : variant == `link` ? `` : `border-warning`} text-warning hover:btn-warning hover:text-base-100`}  ` 
        : color === `accent`    ? `${btn     ? `btn-accent text-white`        : `${variant === `bottom` ? `border-b-accent rounded-none btn-transparent`    : variant == `link` ? `` : `border-accent`} text-accent hover:btn-accent hover:text-white`}  ` 
        : `${btn ? `btn-base text-white` : `${variant === `bottom` ? `border-b-base rounded-none bg-transparent`    :   variant == `link` ? `` :`border-base`} text-base hover:text-white`}  `;

    const cls = `btn btn-sm ${customClass && customClass} ${customColor}`;

    if (variant === "border") {
        return (
            <a href={url} target="_blank" className={`${cls} border`}>
                {children} {ico} {text}
            </a>
        )
    } else if (variant === "link") {
        return (
            <a href={url} target="_blank" className={`${cls} `}>
                {children} {ico} {text}
            </a>
        )
    } else if (variant === "bottom") {
        return (
            <a href={url} target="_blank" className={`${cls}`}>
                {children} {ico} {text}
            </a>
        )
    }

    return (
        <a href={url} target="_blank" className={`${cls}`}>
            {children} {ico} {text}
        </a>
    )
}

export default ExternalLink;
