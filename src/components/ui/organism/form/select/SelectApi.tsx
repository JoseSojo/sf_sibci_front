import { FC, useCallback, useEffect, useRef, useState } from "react";
import { SelectFieldApi } from "../../../../../types/form/form";
import { URL_API } from "../../../../../env";
import { GetToken } from "../../../../../service/auth/TokenStorage";

interface SelectApiProps {
    type: `select-api`;
    path: string;
    field: SelectFieldApi;
    id?: string;
    change: ({ name, value }: { name: string, value: string }) => void
}


const SelectApi: FC<SelectApiProps> = ({ path, id, change, field }) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<{ label: string, value: string | number }[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Función para manejar la búsqueda y filtrar opciones
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    // Función para manejar la selección de una opción
    const handleSelect = (value: string, label: string) => {
        setSearch(label);
        change({ name: field.name, value });
    };

    const ExecuteRequets = useCallback(async (param: string) => {
        // if (body !== null) return;
        const url = `${URL_API}${path}?param=${param}&parentId=${id}`;
        const response = await fetch(url, { headers: { token: `${GetToken()}` } });
        const json = await response.json() as { label: string, value: string | number }[];
        console.log(json);
        setFilteredOptions(json);
    }, [])

    // lista
    useEffect(() => {
        const handler = setTimeout(() => ExecuteRequets(search), 300);
        return () => {
            clearTimeout(handler);
        };
    }, [search])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <label>
                { field.label }
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    onFocus={() => setIsOpen(true)}
                    onFocusCapture={() => setIsOpen(false)}
                    placeholder="Buscar..."
                    className="w-full input input-sm border border-base-content"
                />
            </label>

            {isOpen && filteredOptions.length > 0 && (
                <ul className="absolute w-full bg-base-300 border rounded-md border-none mt-1 max-h-40 overflow-auto shadow-lg">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option.value.toString(), option.label)}
                            className="p-2 hover:bg-base-100 cursor-pointer"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}

export default SelectApi;
