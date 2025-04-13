import { FC, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { useModal } from '../../../../context/ModalContext';
import CreateCalendar from './CreateCalendar';
import { URL_API } from '../../../../env';
import { GetToken } from '../../../../service/auth/TokenStorage';

interface CalendarProps {
    id: string
}

const Calendar: FC<CalendarProps> = ({ id }) => {
    const { close, init } = useModal();
    const [events, setEvents] = useState<EventInput[]>([]);
    const [reload, setReload] = useState(false);

    const Reload = () => {
        close();
        setReload(reload);
    }

    const handleDateClick = (arg: DateClickArg) => {
        init(<CreateCalendar arg={arg} id={id} reloadFn={Reload} />);
    };

    useEffect(() => {
        (async () => {
            const url = `${URL_API}/consult/agend/${id}`;
            const result = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await result.json() as { events: EventInput[] }
            setEvents(json.events);
        })()
    }, [reload])

    return (
        <div className="">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                events={events}
                locale="es"
                editable={true}
                headerToolbar={{
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek'
                }}
                height="auto"
                expandRows={true}
                stickyHeaderDates={true}
                windowResizeDelay={100}
            />
        </div>
    );
}

export default Calendar;
