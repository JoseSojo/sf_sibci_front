import { ChangeEvent, FC, FormEvent, useState } from "react";
import Title from "../components/ui/atoms/text/Title";
import Paragraph from "../components/ui/atoms/text/Paragraph";
import LabelInput from "../components/ui/compounds/LabelInput";
import Button from "../components/ui/atoms/Button";
import { BsSendFill } from "react-icons/bs";
import Input from "../components/ui/atoms/input/Input";
import { DataLogin } from "../types/form/data.login";
import { ValidationRegex } from "../service/validation/form.validation";
import { ExecuteRequetsPost } from "../service/requets/ExecuteRequetsPost";
import { URL_API } from "../env";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SetToken } from "../service/auth/TokenStorage";
import { useNotification } from "../context/NotificationContext";
import Image from "../components/ui/atoms/Image";
import Text from "../components/ui/atoms/text/Text";

const LoginPage: FC = ({ }) => {
    const navigate = useNavigate();
    const notification = useNotification();
    const auth = useAuth();
    const [data, setData] = useState<DataLogin>({ email: ``, password: `` });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!ValidationRegex({ param: data.email, regex: `email` })) {

            return notification.init(`Correo no válido`, `error`);
        }

        if (!ValidationRegex({ param: data.password, regex: `password` })) {
            return notification.init(`Contraseña no válida`, `error`);
        }

        const ExecuteRequets = async () => {
            const url = `${URL_API}/auth/login`;
            const result = await ExecuteRequetsPost({ body: data, url, type: `application/json` }) as any;
            if (result.token) {
                auth.setSession(true);
                SetToken(result.token);
                console.log(result);
                window.localStorage.setItem(`rolName`, result.user.rolReference.name);                

                notification.init(`Inicio exitoso`, `success`);

                return navigate(`/dashboard`, { viewTransition: true });
            }
            notification.init(`Verifica tus credenciales`, `error`);
            return;
        }
        ExecuteRequets();
    }

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === `email`) setData({ ...data, email: e.target.value });
        else if (e.target.name === `password`) setData({ ...data, password: e.target.value });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 flex items-center justify-center p-4" data-theme="nutringest">
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Welcome Message */}
                <div className="hidden md:flex flex-col items-center justify-center p-8 animate-float">
                    <div className="mask mask-squircle bg-gradient-to-br from-base-100 to-base-300 p-6 mb-6">
                        <Image alt="" customClass="" h={150} w={150} src="/logo.png" />
                    </div>
                    <Title text="Bienvenido a NutriNgest" customClass="text-4xl font-bold text-base-content mb-4 text-center" size="3xl" />
                    <Paragraph text="Tu plataforma integral para la gestión nutricional profesional" customClass="text-base-content/70 text-center text-lg max-w-sm" />
                </div>

                {/* Right Side - Login Form */}
                <div className="animate-slide-up">
                    <div className="bg-base-300 rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
                        {/* Logo and Title for Mobile */}
                        <div className="md:hidden text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <div className="mask mask-squircle bg-primary p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        <path d="M12 22v-6" />
                                        <path d="M12 8v6" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-base-content">NutriNgest</h1>
                        </div>

                        <h2 className="text-2xl font-bold text-base-content mb-2">Iniciar Sesión</h2>
                        <p className="text-base mb-8">Ingresa tus credenciales para continuar</p>

                        {/* Login Form */}
                        <form onSubmit={HandleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-base-content">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Input
                                        color={`primary`}
                                        customClass={"input input-bordered w-full pl-10"}
                                        placeholder={`micorreo@gmail.com`}
                                        size={`sm`}
                                        type={`email`}
                                        name="email"
                                        regex="email"
                                        change={HandleChange}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-base-content">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Input
                                        color={`primary`}
                                        customClass={"input input-bordered w-full pl-10"}
                                        placeholder={`••••••••`}
                                        size={`sm`}
                                        type={`password`}
                                        name="password"
                                        regex="password"
                                        change={HandleChange}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center"></div>
                                <Text text="¿Olvidaste tu contraseña?" customClass="xt-sm text-primary hover:text-primary/80 font-medium transition-colors" />
                            </div>

                            <Button
                                type="submit" 
                                customClass="btn btn-primary w-full hover:shadow-lg transition-all duration-300" 
                                text="Iniciar sesión"      
                            />
                        </form>

                        {/* Divider */}
                        <div className="divider text-base-content/40 my-8">o</div>

                        {/* Register Link */}
                        <p className="text-center text-base-content/60 flex justify-between items-center">
                            ¿No tienes una cuenta?{' '}
                            <Button
                                url="/register"
                                variant="border"
                                color="primary"
                                customClass="text-primary hover:text-primary/80 font-medium transition-colors"
                                text="Regístrate aquí"
                            />
                        </p>
                    </div>

                    {/* Footer */}
                    <p className="text-center mt-8 text-base-content/60 text-sm">
                        © 2025 NutriNgest. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="w-full md:w-[70%] lg:w-[50%] border border-primary rounded-lg p-5">
                <Title text="Iniciar Sesión" customClass="text-center text-primary text-3xl font-bold" />
                <Paragraph text="completa los campos para iniciar sesión" size="sm" customClass="text-center text-base" />

                <form onSubmit={HandleSubmit} className="max-w-[60%] m-auto mt-5 grid gap-y-3">
                    <LabelInput color="primary" label="Correo Electrónico" customClass="font-black" size="sm" description="ingrese correo electrónico">
                        <></>
                    </LabelInput>
                    <LabelInput color="primary" label="Contraseña" customClass="font-black" size="sm">
                        <Input
                            color={`primary`}
                            customClass={""}
                            placeholder={``}
                            size={`sm`}
                            regex="password"
                            name="password"
                            type={`password`}
                            change={HandleChange}
                        />
                    </LabelInput>
                    <Button
                        type="submit"
                        text="Iniciar sesión"
                        color="primary"
                        ico={<BsSendFill />}
                    />
                </form>

                <Button type="button" customClass="w-[60%] m-auto mt-5 text-xs" variant="border" url="/register" color="default">
                    Aún no tienes cuenta? <b>Crear cuenta</b>
                </Button>

            </div>
        </div>
    )
}

export default LoginPage;
