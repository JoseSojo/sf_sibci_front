import { FC } from "react";
import Paragraph from "../../atoms/text/Paragraph";

interface NotificationItemProps {
    name: string;
    action: string;
    time: string;
    userBy?: any
}

const NotificationItem: FC<NotificationItemProps> = ({ name, action, time, userBy }) => {

    const date = new Date(time);

    return (
        <div className="w-full p-3 bg-base-100 rounded">
            <div className="flex">
                {
                    userBy
                        ? <div className="avatar">
                            <div className="w-10 rounded">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    alt="Tailwind-CSS-Avatar-component" />
                            </div>
                        </div>
                        : <div className="avatar avatar-placeholder">
                            <div className="bg-neutral text-neutral-content text-center w-10 rounded-full">
                                <span className="text-3xl">/\</span>
                            </div>
                        </div>
                }
                <div>
                    <div className="w-full flex gap-3 pl-3 text-sm">
                        <Paragraph text={name.toUpperCase()} customClass="text-primary font-bold" />
                        <Paragraph text={action} />
                    </div>
                    <div className="w-full flex gap-3 pl-3 text-sm">
                        <Paragraph text={`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`} customClass="badge badge-ghost font-bold text-xs text-base-content pt-1" />
                    </div>
                </div>
            </div>


        </div>
    );
}

export default NotificationItem