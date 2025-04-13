import { FC, useState } from "react";
import HandlerIco from "../../../../service/ui/HandlerIco";
import Text from "../../atoms/text/Text";
import { SlideChildType } from "../../../../types/slide";
import ButtonNotLink from "../../atoms/ButtonNotLink";
import Button from "../../atoms/Button";

interface SlideDropdownProps {
    item: SlideChildType;
    active: boolean;
}

const SlideDropdown: FC<SlideDropdownProps> = ({ item, active }) => {

    const [internalActive, setInternalActive] = useState(false);

    const [cls, setCls] = useState(`scale-y-0 -translate-y-4 hidden`);

    const Change = () => {
        
        if(internalActive) setCls(`scale-y-0 -translate-y-11 hidden`)
        else setCls(`scale-y-100 translate-y- flex`)
        
        setInternalActive(!internalActive);
    }

    return (
        <>
            <ButtonNotLink click={Change} customClass="bg-opacity-0 flex items-center p-2 text-white hover:bg-primary/70 rounded-lg group w-full duration-200">
                <HandlerIco ico={item.ico} />
                <Text text={active ? item.label : ``} customClass="" />
                {
                    internalActive
                    ? <HandlerIco ico="down" />
                    : <HandlerIco ico="drop" />
                }
            </ButtonNotLink>
            <div className={`${cls} duration-300 top-7 w-full bg-gray-700 dark:bg-base-300 p-1 grid space-y-1`}>
                {item.childs && item.childs.map((child) => (
                    <Button
                        text={active ? child.label : ``}
                        ico={<HandlerIco ico={child.ico} />}
                        customClass="border-0 -full flex justify-center items-center bg-gray-900 text-center hover:bg-primary duration-200"
                        url={`/dashboard${child.path}`}
                    />
                ))}
            </div>
        </>
    )
}

export default SlideDropdown;
