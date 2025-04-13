import { SliceList } from "../types/slide";
import { TableType } from "../types/table/table"
import { Form } from "../types/form/form"
import { Ficha } from "../types/ficha";

export const activeUser: TableType = {
    body: {
        extract: [
            {
                stractBy: `username`,
                type: `username`
            }, 
            `dep`,
            {
                stractBy: `activo`,
                type: `tag`
            },
            {
                stractBy: `percentajeAsistent`,
                type: `number`
            },
            {
                stractBy: `date`,
                type: `date`
            },
            {
                stractBy: `key`,
                type: `keywords`
            }
        ],
        label: [
            {
                username: `masterMind`,
                dep: `Finanzas`,
                activo: `sí`,
                percentajeAsistent: `80%`,
                date: `10-12-2024`,
                key: [`one`,`two`]
            }, {
                username: `currentComponet`,
                dep: `Desarrollo`,
                activo: `sí`,
                percentajeAsistent: `80%`,
                date: `6-01-2025`,
                key: [`one`,`two`]
            }, {
                username: `stringNumber`,
                dep: `Soporte`,
                activo: `sí`,
                percentajeAsistent: `80%`,
                date: `10-01-2025`,
                key: [`one`,`two`]
            }, {
                username: `currentFoalt`,
                dep: `RRHH`,
                activo: `sí`,
                percentajeAsistent: `80%`,
                date: `10-01-2025`,
                key: [`one`,`two`]
            }, {
                username: `customMain`,
                dep: `Dirección`,
                activo: `sí`,
                percentajeAsistent: `80%`,
                date: `10-01-2025`,
                key: [`one`,`two`]
            }
        ]
    },
    header: {
        label: [`Usuario`, `Departamento`, `Activo`, `% Asistencia`,`Última actualización`,`Key`]
    },

}

export const newUser: TableType = {
    body: {
        extract: [
            `name`, 
            `lastname`,
            `email`,
            {
                stractBy: `createAt`,
                type: `date`
            },
            {
                stractBy: `tiket`,
                type: `number`
            },
            {
                stractBy: `saldo`,
                type: `number`
            },
        ],
        label: [
            {
                name: `Jose`,
                lastname: `Sojo`,
                email: `josesojo@gmail.com`,
                createAt: `10-05-23`,
                tiket: `000001`,
                saldo: 12.4
            },
            {
                name: `Juan`,
                lastname: `Peréz`,
                email: `juanperez@gmail.com`,
                createAt: `10-05-22`,
                tiket: `000101`,
                saldo: 5.1
            },{
                name: `Sofía`,
                lastname: `Pineda`,
                email: `sofipene@gmail.com`,
                createAt: `10-05-22`,
                tiket: `000002`,
                saldo: 3.7
            }
        ]
    },
    header: {
        label: [`Nombre`, `Apellido`, `Correo`, `Creación`,`Cupón`,`Saldo`]
    },

}

export const grafichLeft = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2019-08-31', value: 41.67 },
    { time: '2019-09-31', value: 49.67 },
];

export const grafichRight = [
    { time: '2018-01-22', value: 32.51 },
    { time: '2018-02-22', value: 32.51 },
    { time: '2018-03-22', value: 32.51 },
    { time: '2018-04-23', value: 31.11 },
    { time: '2018-05-24', value: 27.02 },
    { time: '2018-06-25', value: 27.32 },
    { time: '2018-07-26', value: 25.17 },
    { time: '2018-08-27', value: 28.89 },
    { time: '2018-09-28', value: 25.46 },
    { time: '2018-10-29', value: 23.92 },
    { time: '2018-11-30', value: 32.68 },
    { time: '2018-12-31', value: 32.67 },
    { time: '2019-01-31', value: 28.67 },
    { time: '2019-02-31', value: 35.67 },
    { time: '2019-03-31', value: 32.67 },
    { time: '2019-04-31', value: 31.67 },
    { time: '2019-05-31', value: 32.67 },
    { time: '2019-06-31', value: 36.67 },
    { time: '2019-07-31', value: 35.67 },
    { time: '2019-08-31', value: 33.67 },
    { time: '2019-09-31', value: 36.67 },
];

export const slide: SliceList = [
    {
        ico: `dashboard`,
        label: `Inicio`,
        object: `dashboard`,
        path: `/dashboard`,
        type: `pag`
    },
    {
        ico: `user`,
        label: `Usuarios`,
        object: `user`,
        path: `/dashboard/user`,
        type: `pag`
    }
]

export const userFicha: Ficha =  {
    label: `Usuarios`,
    object: `user`,
    actionsRow: [
        {
            label: `Actualizar`,
            use: `modal`,
            action: `update`,
            ico: `update`
        }, {
            label: `Eliminar`,
            use: `modal`,
            action: `delete`,
            ico: `delete-row`
        }, {
            label: `Crear`,
            use: `modal`,
            action: `create`,
            ico: `create`
        }, {
            label: `Lista`,
            use: `pag`,
            action: `list`,
            ico: `list`
        }
    ],
    graphic: [
        {
            data: [
                {time:`2024-12-10`,value:55},
                {time:`2025-01-10`,value:24},
                {time:`2025-02-10`,value:12},
                {time:`2025-03-10`,value:40},
            ],
            title: `Creación de Usuarios`,
        }
    ],
}


export const formCreateUser: Form = {
    label: `Crear usuario`,
    method: `POST`,
    path: `/user/new`,
    fields: [
        {
            type: `input`,
            field: {
                key: `user.new.name`,
                name: `name`,
                label: `Nombre`,
                placeholder: ``,
                type: `text`,
                validation: `letters`
            }
        }, {
            type: `input`,
            field: {
                key: `user.new.lastname`,
                name: `lastname`,
                label: `Apellido`,
                placeholder: ``,
                type: `text`,
                validation: `letters`
            }
        }, {
            type: `input`,
            field: {
                key: `user.new.username`,
                name: `username`,
                label: `Usuario`,
                placeholder: `steven005`,
                type: `text`,
                validation: `username`
            }
        }, {
            type: `input`,
            field: {
                key: `user.new.email`,
                name: `email`,
                label: `Correo`,
                placeholder: ``,
                type: `email`,
                validation: `email`
            }
        }, {
            type: `input`,
            field: {
                key: `user.new.age`,
                name: `age`,
                label: `Edad`,
                placeholder: `edad`,
                type: `text`,
                validation: `number`
            }
        }
    ]
}
