import { FC } from "react";
import Subtitle from "../../components/ui/atoms/text/Subtitle";
import CardItemShop from "../../components/ui/compounds/card/CardItemShop";

const ShopPage: FC = ({ }) => {

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <Subtitle text="Tienda" size="3xl" customClass="font-black" />

                <ul>
                    <li>
                        <select className="select select-sm focus:outline-none border-base-content">
                            <option value={``} className="bg-base-100 text-white font-light">Categorías</option>
                            <option className="bg-base-100 text-white font-light">Plantillas</option>
                            <option className="bg-base-100 text-white font-light">Prendas</option>
                            <option className="bg-base-100 text-white font-light">Oficina</option>
                            <option className="bg-base-100 text-white font-light">Artículos</option>
                            <option className="bg-base-100 text-white font-light">Objetos</option>
                        </select>
                    </li>
                </ul>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <CardItemShop description="camisa de seda" image="/n1.webp" name="Camisa" price={24} starts={3} />
                <CardItemShop description="camisa de seda" image="/n2.webp" name="Camisa" price={24} starts={3} />
                <CardItemShop description="camisa de seda" image="/n3.webp" name="Camisa" price={24} starts={3} />
                <CardItemShop description="camisa de seda" image="/n1.webp" name="Camisa" price={24} starts={3} />
                <CardItemShop description="camisa de seda" image="/n2.webp" name="Camisa" price={24} starts={3} />
                <CardItemShop description="camisa de seda" image="/n3.webp" name="Camisa" price={24} starts={3} />
            </div>

        </div>
    )
}

export default ShopPage;
