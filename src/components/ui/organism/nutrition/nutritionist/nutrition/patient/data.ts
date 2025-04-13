
export interface PatientCreate {
    email: string
    username: string
    password: string
    ci: string
    name2: string
    lastname2: string
    nacionality: string
    edoCivil: string
    ocupacion: string
    fn: string;
    address: string
    phone: string
    propietaryCode: string
    code: string
    age: string
    genero: string
    name: string
    lastname: string
}

export interface AntecedenteHeredofamiliares {
    diabetes: string;
    cancer: string;
    dislipidemia: string;
    anemia: string;
    hipertensionArterial: string;
    enfermedadesRenales: string;
    otros: string;
}

export interface PersonalesPatologicos {
    diabetes: string;
    cancer: string;
    dislipidemia: string;
    anemia: string;
    hipertensionArterial: string;
    enfermedadesRenales: string;
    otros: string;
}

export interface PersonalesNoPatologicos {
    ejercicio: string;
    toxitosinas: string;
    fuma: string;
    alcohol: string;
    cafe: string;
    sustanciaIlisitas: string;
    horasSueno: string;
}

export interface TranstornosGastrointestinales {
    vomito: string;
    estrenimiento: string;
    gastritis: string;
    nauseas: string;
    disfagia: string;
    distencion: string;
    diarrea: string;
    colitis: string;
    colitritis: string;
    reflujo: string;
    flatulencias: string;
    piriosis: string;
    otros: string;
}

export interface HabitosAlimenticios {
    conQuienCome: string;
    quienPreparaAlimentos: string;
    comidasAlDia: string;
    haceMeriendas: string;
    horarioComida: string;
    comidasEnCasa: string;
    comidasFueraDeCasa: string;
    comidasFueraDeCasaFinDeSemana: string;
    horaDeMayorApetito: string;
    comoConsideraSuApetito: string;
    suplementos: string;
    agua: string;
    alergias: string;
    intolerancias: string;
    dietasAnteriores: string;
    medicamentoParaBajarDePeso: string;
}

export interface Recordatorio24h {
    desayuno: string;
    meriendaMatutina: string;
    comida: string;
    merida: string;
    cena: string;
}

export interface ExamenesLaboratorio {
    colesterolHDL: string;
    colesterolLDL: string;
    trigiceridos: string;
    glucemiaEnAyuna: string;
    hemoglobina: string;
    hemoglobinaGlicosilada: string;
    acidoUrico: string;
    creatina: string;
    proteinaCReactiva: string;
    ferritina: string;
    vitaminaD: string;
    vitaminaB12: string;
    folato: string;
    hierro: string;
    zinc: string;
    sodio: string;
    potasio: string;
    otros: string;
}

export interface IndicadoresAntropometrico {
    pesoHabitual: string;
    pesoActual: string;
    talla: string;
    pesoMaximo: string;
    pesoMinimo: string;
    pesoIdeal: string;
    IMC: string;
}

export interface DistribucionCalorica {
    proteina: { percentage: number; kiloCaloria: number; gramos: number; raciones: number; };
    lipidos: { percentage: number; kiloCaloria: number; gramos: number; raciones: number; };
    carbohidratos: { percentage: number; kiloCaloria: number; gramos: number; raciones: number; };
}

export interface GinecoObstericos {
    g: string;
    p: string;
    c: string;
    fum: string;
    fup_c: string;
    ppg: string;
    anticonceptivos: string;
}

export interface GlobalFichaPatient {
    id: string;
    diagnosticoNutricional: string;
    datosExtras: string;
    userReference: PatientCreate;
    heredofamiliares: AntecedenteHeredofamiliares;
    personalesPatologicos: PersonalesPatologicos;
    personalesNoPatologicos: PersonalesNoPatologicos;
    transtornosGastrointestinales: TranstornosGastrointestinales;
    habitosDeAlimentacion: HabitosAlimenticios;
    recordatorio24h: Recordatorio24h;
    examenesDeLaboratorio: ExamenesLaboratorio;
    indicadoresAntopometricos: IndicadoresAntropometrico;
    distribucionCalorica: DistribucionCalorica;
    ginenoObstetricos: GinecoObstericos
} 


