import { FC, useState } from "react";
import LabelInput from "../components/ui/compounds/LabelInput";
import Input from "../components/ui/atoms/input/Input";
import Button from "../components/ui/atoms/Button";

const RegisterPage: FC = ({ }) => {

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen flex">
            {/* Left side - Logo and information */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-base-300 to-primary/20 p-12 flex-col justify-between">
                <div>
                    <div className="flex items-center">
                        {/* <Leaf className="h-12 w-12 text-green-600" /> */}
                        <Button url="/">
                            <h1 className="text-4xl font-bold text-base-content ml-2">Nutringest</h1>
                        </Button>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-3xl font-semibold text-base-content leading-tight">
                            Únete a la comunidad líder de nutricionistas profesionales
                        </h2>
                        <p className="mt-4 text-lg text-dark dark:text-white">
                            Potencia tu práctica profesional con herramientas diseñadas específicamente para nutricionistas.
                            Gestiona pacientes, crea planes nutricionales y haz seguimiento de manera eficiente.
                        </p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-primary/80 rounded-full p-3">
                            {/* <Leaf className="h-6 w-6 text-green-600" /> */}
                        </div>
                        <p className="ml-4 text-dark dark:text-white">Gestiona tus consultas</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-primary/80 rounded-full p-3">
                            {/* <Leaf className="h-6 w-6 text-green-600" /> */}
                        </div>
                        <p className="ml-4 text-dark dark:text-white">Gestiona tus menús</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-primary/80 rounded-full p-3">
                            {/* <Leaf className="h-6 w-6 text-green-600" /> */}
                        </div>
                        <p className="ml-4 text-dark dark:text-white">Gestiona tus pacientes</p>
                    </div>
                </div>
            </div>

            {/* Right side - Registration form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-base-300 to-primary/10">
                <div className="max-w-md w-full">
                    <div className="lg:hidden flex items-center justify-center mb-8">
                        {/* <Leaf className="h-10 w-10 text-green-600" /> */}
                        <h2 className="text-3xl font-bold text-base-content ml-2">Nutringest</h2>
                    </div>

                    <h3 className="text-2xl font-semibold text-center text-base-content mb-8">
                        Crear cuenta de nutricionista
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <LabelInput color="primary" label="Nombre">
                                <Input
                                    change={handleChange}
                                    color="primary"
                                    name="name"
                                    placeholder="Steven"
                                    value={formData.name}
                                />
                            </LabelInput>
                            <LabelInput color="primary" label="Apellido">
                                <Input
                                    change={handleChange}
                                    color="primary"
                                    name="lastname"
                                    placeholder="Doe"
                                    value={formData.lastname}
                                />
                            </LabelInput>

                            <LabelInput color="primary" label="Correo" customClass="lg:col-span-2">
                                <Input
                                    change={handleChange}
                                    color="primary"
                                    name="email"
                                    placeholder="steven.dow@gmail.com"
                                    value={formData.email}
                                />
                            </LabelInput>
                            
                            <LabelInput color="primary" label="Nombre">
                                <Input
                                    change={handleChange}
                                    color="primary"
                                    name="password"
                                    placeholder="***********"
                                    value={formData.password}
                                />
                            </LabelInput>
                            <LabelInput color="primary" label="Apellido">
                                <Input
                                    change={handleChange}
                                    color="primary"
                                    name="repeatPassword"
                                    placeholder="***********"
                                    value={formData.repeatPassword}
                                />
                            </LabelInput>
                            

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-medium shadow-sm"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 flex justify-center">
                        <Button url="/login" text="¿Ya tienes una cuenta? Iniciar sesión" customClass="text-green-600 hover:text-green-700 font-medium" />
                            
                    </p>
                </div>
            </div>
        </div>
    )

    // return (
    //     <div className="min-h-screen w-full flex justify-center items-center">
    //         <div className="w-full md:w-[70%] lg:w-[50%] border border-primary rounded-lg p-5">
    //             <Title text="Crear cuenta" customClass="text-center text-primary text-3xl font-bold" />
    //             <Paragraph text="completa los campos para crear cuenta" size="sm" customClass="text-center text-base" />

    //             <form className="max-w-[80%] m-auto mt-5 grid grid-cols-2 gap-3">
    //                 <LabelInput color="primary" label="Nombre" customClass="font-black" size="sm" description="ingrese correo electrónico">
    //                     <Input />
    //                 </LabelInput>
    //                 <LabelInput color="primary" label="Apellido" customClass="font-black" size="sm" description="ingrese correo electrónico">
    //                     <Input />
    //                 </LabelInput>
    //                 <LabelInput color="primary" label="Correo Electrónico" customClass="font-black col-span-2" size="sm" description="ingrese correo electrónico">
    //                     <Input />
    //                 </LabelInput>
    //                 <LabelInput color="primary" label="Contraseña" customClass="font-black" size="sm">
    //                     <Input />
    //                 </LabelInput>
    //                 <LabelInput color="primary" label="Repetir Contraseña" customClass="font-black" size="sm">
    //                     <Input />
    //                 </LabelInput>
    //                 <Button
    //                     customClass="col-span-2"
    //                     text="Crear cuenta"
    //                     color="primary"
    //                     ico={<BsSendFill />}
    //                 />

    //             </form>

    //             <Button type="button" customClass="w-[60%] m-auto mt-5 text-xs" variant="border" url="/login" color="default">
    //                 Ya tienes cuenta? <b>Iniciar Sesión</b>
    //             </Button>
    //         </div>
    //     </div>
    // )
}

export default RegisterPage;
