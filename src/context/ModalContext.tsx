import { createContext, FC, ReactNode, useContext, useState } from "react";

interface ModalProviderPorps {
    children: ReactNode
}

interface TypeContext {
    defaultScreen?: `card` | `form` | `alert` | `accept` | `warning`;
    init: (element: ReactNode) => void;
    close: () => void;
    status: boolean;
}

const DefaultContext: TypeContext = {
    close: () => { },
    init: () => { },
    status: false,
}

const ModalContext = createContext<TypeContext>(DefaultContext);

const ModalProvider: FC<ModalProviderPorps> = ({ children }) => {

    const [active, setActive] = useState(false);
    const [element, setElement] = useState<ReactNode>(<></>);

    const close = () => setActive(false);

    const init = (element: ReactNode) => {
        setActive(true);

        setElement(
            <div className="bg-base-300 bg-opacity-70 z-30 min-h-screen max-h-full w-screen fixed top-0 left-0 flex justify-center items-center">
                <div className="z-50 w-full flex justify-center items-center">{element}</div>
            </div>
        )
    }

    return (
        <ModalContext.Provider
            value={{
                status: active,
                close,
                init,
            }}
        >
            {active && element}
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);

export {
    ModalProvider
};
