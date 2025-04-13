import { FC } from "react";
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./app/LoginPage";
import RegisterPage from "./app/RegisterPage";
import ProfilePage from "./app/auth/ProfilePage";
import LandingPage from "./app/LandingPage";
import ProtectRoute from "./app/route/ProtectRoute";
import NotProtectRoute from "./app/route/NotProtectRoute";
import DashboardTemplate from "./components/ui/template/DashboardTemplate";
import AbstractCrud from "./app/auth/abstract/AbstractCrud";
import StaticthicsPage from "./app/auth/StaticthicsPage";
import SubscriptionPage from "./app/auth/SubscriptionPage";
import PaymentPage from "./app/auth/PaymentPage";
import AbstractCrudFicha from "./app/auth/abstract/AbstractCrudFicha";
import ShopPage from "./app/auth/ShopPage";
import FinanzasPage from "./app/auth/FinanzasPage";
import AdminSubscriptionPage from "./app/auth/AdminSubscriptionPage";
import AdminSubscriptionFicha from "./app/auth/AdminSubscriptionFicha";
import UserFicha from "./app/auth/manual/UserFicha";
import PharmacyFicha from "./app/auth/manual/PharmacyFicha";
import AbstractCreate from "./app/auth/abstract/AbstractCreate";
import MenuCreate from "./app/auth/manual/nutrition/nutritionist/menu/MenuCreate";
import MenuFicha from "./app/auth/manual/nutrition/nutritionist/menu/MenuFicha";
import ExchangeFicha from "./app/auth/manual/nutrition/nutritionist/exchange/ExchangeFicha";
import ExchangeCreate from "./app/auth/manual/nutrition/nutritionist/exchange/ExchangeCreate";
import ConsultCreate from "./app/auth/manual/nutrition/nutritionist/consult/ConsultCreate";
import ConsultFicha from "./app/auth/manual/nutrition/nutritionist/consult/ConsultFicha";
import AssingObject from "./components/ui/organism/nutrition/nutritionist/component/AssingObject";
import ChangeDashbaord from "./app/auth/ChangeDashboard";

const AppRouter: FC = () => {

    const router = createBrowserRouter([
        {
            path: `/`,
            element: <LandingPage />
        }, {
            path: ``,
            element: <NotProtectRoute />,
            children: [
                {
                    path: `/login`,
                    element: <LoginPage />
                }, {
                    path: `/register`,
                    element: <RegisterPage />
                }
            ]
        }, {
            path: `/`,
            element: <ProtectRoute />,
            children: [
                {
                    path: `/profile`,
                    element: <DashboardTemplate><ProfilePage /></DashboardTemplate>
                }, {
                    path: `/dashboard`,
                    element: <DashboardTemplate><ChangeDashbaord /></DashboardTemplate>
                }, {
                    path: `/dashboard/finanzas`,
                    element: <DashboardTemplate><FinanzasPage /></DashboardTemplate>
                }, {
                    path: `/dashboard/adminsubscription`,
                    element: <DashboardTemplate><AdminSubscriptionPage /></DashboardTemplate>
                }, {
                    path: `/dashboard/adminsubscription/:id`,
                    element: <DashboardTemplate><AdminSubscriptionFicha /></DashboardTemplate>
                }, {
                    path: `/dashboard/user/:id`,
                    element: <DashboardTemplate><UserFicha /></DashboardTemplate>
                }, {
                    path: `/dashboard/pharmacy/:id`,
                    element: <DashboardTemplate><PharmacyFicha /></DashboardTemplate>
                }, {
                    path: `/dashboard/menu/create`,
                    element: <DashboardTemplate><MenuCreate /></DashboardTemplate>
                }, {
                    path: `/dashboard/menu/:id`,
                    element: <DashboardTemplate><MenuFicha /></DashboardTemplate>
                }, {
                    path: `/dashboard/exchange/create`,
                    element: <DashboardTemplate><ExchangeCreate /></DashboardTemplate>
                }, {
                    path: `/dashboard/exchange/:id`,
                    element: <DashboardTemplate><ExchangeFicha /></DashboardTemplate>
                }, {
                    path: `/dashboard/consult/create`,
                    element: <DashboardTemplate><ConsultCreate /></DashboardTemplate>
                }, {
                    path: `/dashboard/consult/:id`,
                    element: <DashboardTemplate><ConsultFicha /></DashboardTemplate>
                }, {
                    path: `/dashboard/consult/:id/assing/:object`,
                    element: <DashboardTemplate><AssingObject /></DashboardTemplate>
                }, {
                    path: `/shop`,
                    element: <DashboardTemplate><ShopPage /></DashboardTemplate>
                }, {
                    path: `/statictics`,
                    element: <DashboardTemplate><StaticthicsPage /></DashboardTemplate>
                }, {
                    path: `/subscription`,
                    element: <DashboardTemplate><SubscriptionPage /></DashboardTemplate>
                }, {
                    path: `/payment`,
                    element: <DashboardTemplate><PaymentPage /></DashboardTemplate>
                }, {
                    path: `/dashboard/:object/create`,
                    element: <DashboardTemplate><AbstractCreate /></DashboardTemplate>
                }, {
                    path: `/dashboard/:object`,
                    element: <DashboardTemplate><AbstractCrud /></DashboardTemplate>
                },  {
                    path: `/dashboard/:object/:id`,
                    element: <DashboardTemplate><AbstractCrudFicha /></DashboardTemplate>
                }  
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRouter;
