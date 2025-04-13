import { FC } from "react";
import CardPrincing from "../../compounds/card/CardPrincing";

interface SectionCardPrincingProps {
    list: any[];
    reload: () => void
}

const SectionCardPrincing: FC<SectionCardPrincingProps> = ({ list, reload }) => {

    return (
        <section className="grid mt-3 lg:grid lg:grid-cols-3 gap-5 w-full">

            {
                list.map(item => (
                    <CardPrincing
                        reload={reload}
                        id={item.id}
                        include={item.items}
                        mount={item.price}
                        name={item.name}
                    />
                ))
            }

            
        </section>
    )
}

export default SectionCardPrincing;
