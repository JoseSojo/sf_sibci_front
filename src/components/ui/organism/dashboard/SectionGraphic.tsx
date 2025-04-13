import { FC } from "react";
import CardGraphic from "../../compounds/card/CardGraphic";
import { grafichLeft, grafichRight } from "../../../../def/dashboard";

interface SectionGraphicProps { }

const SectionGraphic: FC<SectionGraphicProps> = ({ }) => {

    return (
        <div className="mt-5 grid grid-cols-12 gap-3">
            <CardGraphic title="Registro de Usuarios" data={grafichRight} />
            <CardGraphic title="Registro de Pagos" data={grafichLeft} />
        </div>
    )
}

export default SectionGraphic;
