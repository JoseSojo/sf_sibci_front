import { FC, useEffect, useState } from "react";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import HandlerIco from "../../../service/ui/HandlerIco";
import { SlideChildType } from "../../../types/slide";
import { GenerateSlide } from "../../../service/crud/dashboard/HandlerDashboard";
import SlideDropdown from "../compounds/slide/SlideDropdown";

interface SlideProps {
    sidebarOpen: boolean
}

const Slide: FC<SlideProps> = ({ sidebarOpen = true }) => {

    const [customSlide, setCustomSlide] = useState<SlideChildType[] | null>(null);
    const [load, setLoad] = useState(true);     


    useEffect(() => {
        (async () => {
            const result = await GenerateSlide({ path: `/dashboard/gui/slide` });
            if (result) {
                setCustomSlide(result);
                setLoad(false);
            }
        })()
    }, []);

    return (
        <>
            <aside className={`bg-gray-950 z-10 dark:bg-base-300 fixed top-0 left-0 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-">
                    <div className="flex items-center space-x-3 mb-8 px-2">
                        <div className="">
                            <Image alt="" customClass="" h={50} w={50} src="/logo.png" />
                        </div>
                        <span className="text-xl font-bold text-white">nutringest</span>
                    </div>

                    <ul className="space-y-2">
                        {
                            load
                                ? <div className="w-full flex justify-center items-center py-2"><span className="loading loading-spinner m-auto"></span></div>
                                : customSlide && customSlide.map(item => {

                                    if (item.childs) return <SlideDropdown active item={item} />

                                    return (
                                        <Button
                                            text={item.label}
                                            ico={<HandlerIco ico={item.ico} />}
                                            customClass="border-gray-500 bg-opacity-0 flex items-center p-2 text-white hover:bg-primary/70 rounded-lg group w-full"
                                            url={`/dashboard${item.path}`}
                                        />
                                    );
                                })
                        }
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Slide;
