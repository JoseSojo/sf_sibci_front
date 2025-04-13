import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonType } from "../../../types/ui/button";

interface ButtonProps extends ButtonType { }

const Button: FC<ButtonProps> = ({ children, click, color, url, ico, text, variant = `default`, customClass, type = `button`, size = `sm` }) => {

    const navigate = useNavigate();

    const btn = variant == `border` || variant == `bottom` || variant == `link` ? false : true;

    const customColor =
        color === `info` ? `${btn ? `btn-info text-black` : `${variant === `bottom` ? `border-b-info rounded-none btn-transparent` : variant == `link` ? `` : `border-info`} text-info hover:btn-info hover:text-white`}  `
            : color === `error` ? `${btn ? `btn-error text-white` : `${variant === `bottom` ? `border-b-error rounded-none btn-transparent` : variant == `link` ? `` : `border-error`} text-error hover:btn-error hover:text-white`}  `
                : color === `success` ? `${btn ? `btn-success text-white` : `${variant === `bottom` ? `border-b-success rounded-none btn-transparent` : variant == `link` ? `` : `border-success`} text-success hover:btn-success hover:text-white`}  `
                    : color === `warning` ? `${btn ? `btn-warning text-base-100 ` : `${variant === `bottom` ? `border-b-warning rounded-none btn-transparent` : variant == `link` ? `` : `border-warning`} text-warning hover:btn-warning hover:text-base-100`}  `
                        : color === `accent` ? `${btn ? `btn-accent text-white` : `${variant === `bottom` ? `border-b-accent rounded-none btn-transparent` : variant == `link` ? `` : `border-accent`} text-accent hover:btn-accent hover:text-white`}  `
                            : color === `primary` ? `${btn ? `btn-primary text-white` : `${variant === `bottom` ? `border-b-primary rounded-none btn-transparent` : variant == `link` ? `` : `border-primary`} text-primary hover:btn-primary hover:text-white`}  `
                                : `${btn ? `btn-base text-white` : `${variant === `bottom` ? `border-b-base rounded-none bg-transparent` : variant == `link` ? `` : `border-base`} text-base hover:text-white`}  `;

    const customSize =
        size === `sm` ? `btn-sm`
            : size === `md` ? `btn-md`
                : size === `lg` ? `btn-lg`
                    : `btn-sm`;

    const cls = ` flex justify-center items-center gap-3 btn px-3 py-1 ${customSize ? customSize : ``} ${customClass ? customClass : ``} ${customColor}`;

    const HandleClick = () => {
        if (url) {
            navigate(url, { viewTransition: true });
        }

        if (click) click();
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
                className={`${cls} `}
            >
                {children} {ico} {text}
            </button>
        )
    }


    return (
        <button
            type={type}
            onClick={HandleClick}
            className={`${cls}`}
        >
            {children} {ico} {text}
        </button>
    )
}

export default Button;
