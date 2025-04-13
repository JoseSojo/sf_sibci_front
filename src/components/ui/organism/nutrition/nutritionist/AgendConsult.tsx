import { FC } from "react"
import Calendar from "../../sections/CalendatSection";

interface AgendConsultProps {
    id: string
}

const AgendConsult: FC<AgendConsultProps> = ({ id }) => {
    return (
            <Calendar id={id} />
    )
}

export default AgendConsult;
