import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
    url?: string;
    customClass?: string;
    text?: string;
    click?: () => void;
    variant?: `button` | `border` | `bottom` | `link` | `default`;
    color?: `info` | `success` | `error` | `accent` | `warning` | `default`;
    ico?: ReactNode;
    children?: ReactNode;
}

const Button: FC<ButtonProps> = ({ children,click,color,url,ico,text,variant=`default`,customClass }) => {

    const navigate = useNavigate();

    const btn = variant == `border` || variant == `bottom` || variant == `link` ? false : true;

    const customColor = 
        color === `info`        ? `${btn     ? `btn-info text-white`          : `${variant === `bottom` ? `border-b-info rounded-none btn-transparent`      : variant == `link` ? `` : `border-info`} text-info hover:btn-info hover:text-white`}  ` 
        : color === `error`     ? `${btn     ? `btn-error text-white`         : `${variant === `bottom` ? `border-b-error rounded-none btn-transparent`     : variant == `link` ? `` : `border-error`} text-error hover:btn-error hover:text-white`}  ` 
        : color === `success`   ? `${btn     ? `btn-success text-white`       : `${variant === `bottom` ? `border-b-success rounded-none btn-transparent`   : variant == `link` ? `` : `border-success`} text-success hover:btn-success hover:text-white`}  ` 
        : color === `warning`   ? `${btn     ? `btn-warning text-base-100 `   : `${variant === `bottom` ? `border-b-warning rounded-none btn-transparent`   : variant == `link` ? `` : `border-warning`} text-warning hover:btn-warning hover:text-base-100`}  ` 
        : color === `accent`    ? `${btn     ? `btn-accent text-white`        : `${variant === `bottom` ? `border-b-accent rounded-none btn-transparent`    : variant == `link` ? `` : `border-accent`} text-accent hover:btn-accent hover:text-white`}  ` 
        : `${btn ? `btn-base text-white` : `${variant === `bottom` ? `border-b-base rounded-none bg-transparent`    :   variant == `link` ? `` :`border-base`} text-base hover:text-white`}  `;

    const cls = ` flex justify-center items-center gap-3 btn btn-sm px-3 py-1 ${customClass ? customClass : ``} ${customColor}`;

    const HandleClick = () => {
        if(url) {
            navigate(url);
        }

        if(click) click();
        return;        
    }

    if (variant === "border") {
        return (
            <button
                onClick={HandleClick}
                className={`${cls} border`}
            >
                {children} {ico} {text}
            </button>
        )
    } else if (variant === "link") {
        return (
            <button
                onClick={HandleClick}
                className={`${cls} `}
            >
                {children} {ico} {text}
            </button>
        )
    } else if (variant === "bottom") {
        return (
            <button
                onClick={HandleClick}
                className={`${cls}`}
            >
                {children} {ico} {text}
            </button>
        )
    }


    return (
        <button
            onClick={HandleClick}
            className={`${cls}`}
        >
            {children} {ico} {text}
        </button>
    )
}

export default Button;

/**

if(variant === "create") {
        return (
            <button
                onClick={click}
                className={`${cls} btn-success text-white`}
            >
                <BsPlusSquare />
                Crear
            </button>
        )
    } else if (variant === "update") {
        return (
            <button
                onClick={click}
                className={`${cls} btn-info text-white`}
            >
                <BsPenFill />
                Actualizar
            </button>
        )
    }   else if (variant === "download") {
        return (
            <button
                onClick={click}
                className={`${cls} btn-error text-white`}
            >
                <BsDownload />
                Descargar
            </button>
        )
    } else if (variant === "submit") {
        return (
            <button
                onClick={click}
                className={`${cls} btn-success`}
            >
                <BsSendFill />
                Enviar
            </button>
        )
    }   

 */