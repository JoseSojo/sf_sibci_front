import { FC, ReactNode, useState } from "react";
import Slide from "../organism/Slide";
import Navbar from "../organism/Navbar";

interface DashboardTemplateProps {
    children: ReactNode
}

const DashboardTemplate: FC<DashboardTemplateProps> = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const openOrClose = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen">
            <Slide sidebarOpen={sidebarOpen} />
            <main className={`p-4 ${sidebarOpen ? 'ml-64' : ''}`}>
                <Navbar openOrClose={openOrClose} />
                <div className="py-3 px-5">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardTemplate;
