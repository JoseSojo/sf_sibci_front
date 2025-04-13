export interface FoodType {
    id: string;
    code: number;
    name: string;
    quantity: number;
    calorias: number;
    humed: number;
    proteina: number;
    fosforo: number;
    potasio: number;
    grasas: number;
    carbohidratosDisponibles: number;
    carbohidratosTotales: number;
    fibraTotal: number;
    fibraInsolub: number;
    cenizas: number;
    calcio: number;
    hierro: number;
    magnesio: number;
    zinc: number;
    cobre: number;
    sodio: number;
    vitaminaA: number;
    carotenoEquivTotal: number;
    tiamina: number;
    riboflavina: number;
    niacina: number;
    vitaminaB6: number;
    acidAscorb: number;
    deleteAt: Date | null;
    createAt: Date;
    updateAt: Date;
}

export interface FoodExchangeType {
    id: string;
    name: string;
    category: string;
    sub: string;
    caloria: string | null;
}
