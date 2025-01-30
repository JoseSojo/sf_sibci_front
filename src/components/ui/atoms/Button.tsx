import { FC, ReactNode } from "react";
import { 
    BsPlusSquare,
    BsDownload,
    BsPenFill,
    BsSendFill,

} from "react-icons/bs";

interface ButtonProps {
    click?: (obj: any) => void,
    text?: string,
    ico?: string,
    children?: ReactNode,
    customClass?: string,
    variant?: `submit` | `create` | `update` | `download` | `default`;
}

const Button: FC<ButtonProps> = ({ children,click,ico,text,variant=`default`,customClass }) => {

    let cls = `flex justify-center items-center gap-3 btn btn-sm px-3 py-1 ${customClass} `;

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

    return (
        <button
            onClick={click}
            className={`${cls} btn-success text-white`}
        >
            { children }
            { ico }
            { text }
        </button>
    )
}

export default Button;
