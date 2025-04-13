import { createContext, FC, ReactNode, useContext, useState } from "react";
import HandlerIco from "../service/ui/HandlerIco";
import ButtonNotLink from "../components/ui/atoms/ButtonNotLink";

interface NotificationProviderPorps {
    children: ReactNode
}

interface TypeContext {
    init: (message: string, type: `error` | `success` | `warning` | `info`) => void;
    close: () => void;
}

const DefaultContext: TypeContext = {
    close: () => { },
    init: () => { },
}

const NotificationContext = createContext<TypeContext>(DefaultContext);

export const NotificationProvider: FC<NotificationProviderPorps> = ({ children }) => {

    const [active, setActive] = useState(false);
    const [message, setMessage] = useState(``);
    const [type, setType] = useState<`error` | `success` | `warning` | `info`>(`error`);

    const init = (message: string, type: `error` | `success` | `warning` | `info`) => {
        setMessage(message);
        setType(type);
        setActive(true);
    }
    const close = () => setActive(false);

    return (
        <NotificationContext.Provider
            value={{
                close,
                init,
            }}
        >
            {active && <div className="flex justify-center items-center fixed pt-8 w-full z-50">
                <div className="pl-3 bg-base-300 p-3 rounded-lg min-w-72 border border-primary">
                    <div className="flex items-center justify-between w-full">
                        <p tabIndex={0} className="focus:outline-none text-sm leading-none flex justify-start items-center gap-2"><i className="text-primary text-xl"><HandlerIco ico={type} /></i>{message}</p>
                        <ButtonNotLink
                            click={close}
                            ico={<HandlerIco ico="x" />}
                        />
                        {/* <div tabIndex={0} aria-label="close icon" role="button" className="focus:outline-none cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 3.5L3.5 10.5" stroke="#4B5563" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.5 3.5L10.5 10.5" stroke="#4B5563" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div> */}
                    </div>
                    <p tabIndex={0} className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">justo ahora</p>
                </div>
            </div>}
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext);
