import { Form } from "./form";

export const FormUpdateData = (data: any): Form => {
    
    return {
        label: `Actualizar Datos`,
        method: `PUT`,
        path: `/profile/update/data`,
        fields: [
            {
                type: `input`,
                field: {
                    key: `user.create.input.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: `${data.name ? data.name  : ``}`,
                    type: `text`,
                    requiere: true,
                    value: data.name
                }
            }, {
                type: `input`,
                field: {
                    key: `user.create.input.lastname`,
                    label: `Apellido`,
                    name: `lastname`,
                    placeholder: `${data.lastname ? data.lastname  : ``}`,
                    type: `text`,
                    requiere: true,
                    value: data.lastname
                }
            }, {
                type: `input`,
                field: {
                    key: `user.create.input.email`,
                    label: `Correo`,
                    name: `email`,
                    placeholder: `${data.email ? data.email  : ``}`,
                    type: `email`,
                    requiere: true,
                    value: data.email
                }
            }, {
                type: `input`,
                field: {
                    key: `user.create.input.username`,
                    label: `Usuario`,
                    name: `username`,
                    placeholder: `${data.username ? data.username  : ``}`,
                    type: `text`,
                    requiere: true,
                    value: data.username
                }
            }, {
                type: `input`,
                field: {
                    key: `user.create.input.ci`,
                    label: `Cédula`,
                    name: `ci`,
                    placeholder: `${data.ci ? data.ci  : ``}`,
                    type: `text`,
                    requiere: true,
                    value: data.ci
                }
            }
        ] 
    }
} 

export const FormUpdatePassword = (): Form => {
    
    return {
        label: `Actualizar Contraseña`,
        method: `PUT`,
        path: `/profile/update/password`,
        fields: [
            {
                type: `input`,
                field: {
                    key: `user.create.input.name`,
                    label: `Contraseña Actual`,
                    name: `lastPassword`,
                    placeholder: ``,
                    type: `password`,
                    requiere: true,
                }
            }, {
                type: `input`,
                field: {
                    key: `user.create.input.lastname`,
                    label: `Nueva Contraseña`,
                    name: `newPassword`,
                    placeholder: ``,
                    type: `password`,
                    requiere: true,
                }
            }, {
                type: `input`,
                field: {
                    key: `user.create.input.email`,
                    label: `Repetir Contraseña`,
                    name: `repeatPassword`,
                    placeholder: ``,
                    type: `password`,
                    requiere: true,
                }
            }
        ] 
    }
} 


