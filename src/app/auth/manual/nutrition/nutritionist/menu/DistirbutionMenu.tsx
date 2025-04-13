import { ChangeEvent, FC, useEffect, useState } from "react";
import Subtitle from "../../../../../../components/ui/atoms/text/Subtitle";
import { useModal } from "../../../../../../context/ModalContext";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import ButtonNotLink from "../../../../../../components/ui/atoms/ButtonNotLink";
import { FoodType } from "../../../../../../types/data/food";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

interface MenuCreateProps {
    foods: FoodType[],
    screen?: boolean
}

type FoodKeys = keyof FoodType;

const DistributionMenuCreate: FC<MenuCreateProps> = ({ foods, screen }) => {
    const { close, status } = useModal();

    // const barRef = useRef<am4charts.XYChart | null>(null);
    // const pieRef = useRef<am4charts.PieChart | null>(null);
    const [payload, setPayload] = useState<FoodKeys | null>(null);
    const type = `PIE`;

    const ChandleSelectPayload = (e: ChangeEvent<HTMLSelectElement>) => {
        const vl = e.target.value as FoodKeys;
        setPayload(vl);
    }

    useEffect(() => {
        if (payload === null) return; // No hay entrada.

        // if (pieRef.current) return; // Evitar gráficos duplicados.
        // Datos del gráfico
        const chart = am4core.create(`chartdiv`, am4charts.PieChart);
        // pieRef.current = chart;

        chart.data = foods.map((item: FoodType) => {
            return { category: item.name, value: item[payload] }
        });



        console.log(chart.data);

        const pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";

        // Agregar efectos
        pieSeries.slices.template.tooltipText = "{category}: {value}";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // Aplicar estilos
        pieSeries.labels.template.fill = am4core.color("#ffffff"); // Texto blanco
        pieSeries.labels.template.background.fill = am4core.color("#000000"); // Fondo negro
        pieSeries.labels.template.padding(5, 10, 5, 10);
        pieSeries.labels.template.fontSize = 14;
        pieSeries.labels.template.radius = 5;

        // Limpiar el gráfico al desmontar
        return () => {
            chart.dispose();
        };
    }, [payload, type]);

    return (
        <div className={screen ? "" : "w-[60%] bg-base-300 py-3 rounded-lg border"}>
            <div className="flex justify-between px-5">
                <Subtitle text="Gráfica De Distribución" customClass="text-xl font-black" />
                <ul className="flex gap-3">
                    <li>
                        <select onChange={ChandleSelectPayload} className="select select-sm focus:outline-none">
                            <option value="">seleccionar</option>
                            <option value="calorias">calorias</option>
                            <option value="humed">humed</option>
                            <option value="proteina">proteina</option>
                            <option value="fosforo">fosforo</option>
                            <option value="potasio">potasio</option>
                            <option value="grasas">grasas</option>
                            <option value="cenizas">cenizas</option>
                            <option value="calcio">calcio</option>
                            <option value="hierro">hierro</option>
                            <option value="magnesio">magnesio</option>
                            <option value="zinc">zinc</option>
                            <option value="cobre">cobre</option>
                            <option value="sodio">sodio</option>
                            <option value="tiamina">tiamina</option>
                            <option value="riboflavina">riboflavina</option>
                            <option value="niacina">niacina</option>
                            <option value="vitaminaA">vitaminaA</option>
                            <option value="vitaminaB6">vitaminaB6</option>
                        </select>
                    </li>
                    {
                        status &&
                        <li>
                            <ButtonNotLink
                                color="error"
                                text="cerrar"
                                click={close}
                                ico={<HandlerIco ico="x" />}
                            />
                        </li>
                    }
                </ul>
            </div>

            <div className="py-10 flex justify-center items-center">
                <div id="chartdiv" style={{ width: "100%", height: "200px" }} />
            </div>
        </div>
    )
}

export default DistributionMenuCreate;
