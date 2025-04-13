
export interface CreateConsult {
    sections: {
        exchange: boolean,
        menus: boolean,
        patientData: boolean,
        agend: boolean,
        recommendations: boolean,
        estatictics: boolean,
        log: boolean,
    },
    patiendData: any
}

export interface RegsiterWeigh {
    value:  string | number,
    time: string
}

export interface RegsiterSize {
    value:  string | number,
    time: string
}

export interface AddMenu {
    menu: string
}

export interface AddExchange {
    exchange: string
}

export interface DetailsConsult {
    exchange: boolean;
    menus: boolean;
    patientData: boolean;
    agend: boolean;
    recommendations: boolean;
    estatictics: boolean;
    log: boolean;
}
