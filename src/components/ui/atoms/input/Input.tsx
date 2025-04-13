import { ChangeEvent, FC, useState } from "react";
import { InputType } from "../../../../types/ui/input";
import { ColorType } from "../../../../types/ui/colors";
import { ValidationRegex } from "../../../../service/validation/form.validation";

interface InputProps extends InputType { }

const Input: FC<InputProps> = ({ value ,regex, name, type = `text`, color = `default`, customClass = ``, placeholder = ``, change = () => { }, size = `sm` }) => {

    const [currentColor, setCustomColor] = useState<ColorType>(color);

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (regex) {
            const found = ValidationRegex({ param: e.target.value, regex: regex });
            if (e.target.value.length > 3) {
                if (found) setCustomColor("success");
                else setCustomColor("error");
            }
        }

        change(e);
    }

    const customColor =
        currentColor === `info` ? `text-info border-info focus:border-info active:bg-info focus:bg-info active:bg-opacity-40 focus:bg-opacity-20 duration-200`
            : currentColor === `error` ? `text-error border-error focus:border-error active:bg-error focus:bg-error active:bg-opacity-40 focus:bg-opacity-20 duration-200`
                : currentColor === `success` ? `text-success border-success focus:border-success active:bg-success focus:bg-success active:bg-opacity-40 focus:bg-opacity-20 duration-200`
                    : currentColor === `warning` ? `text-warning border-warning focus:border-warning active:bg-warning focus:bg-warning active:bg-opacity-40 focus:bg-opacity-20 duration-200`
                        : currentColor === `accent` ? `text-accent border-accent focus:border-accent active:bg-accent focus:bg-accent active:bg-opacity-40 focus:bg-opacity-20 duration-200`
                            : currentColor === `primary` ? `text-primary border-primary focus:border-primary active:bg-primary focus:bg-primary active:bg-opacity-40 focus:bg-opacity-20 duration-200`
                                : `text-base border-base focus:border-base active:bg-base focus:bg-base active:bg-opacity-40 focus:bg-opacity-20 duration-200`;

    const customSize =
        size === `sm` ? `input-sm`
            : size === `md` ? `input-md`
                : size === `lg` ? `input-lg`
                    : `input-sm`;

    const cls = `w-full outline-none focus:outline-none input ${customSize} ${customColor} ${customClass}`;

    return (
        <input
            onChange={HandleChange}
            type={type}
            className={`${cls}`}
            placeholder={placeholder}
            name={name}
            value={value}
        />
    )
}

export default Input;
