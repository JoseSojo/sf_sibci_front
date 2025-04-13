import { FC, useEffect } from "react";
import Subtitle from "../../../../../../components/ui/atoms/text/Subtitle";
import { useModal } from "../../../../../../context/ModalContext";
import HandlerIco from "../../../../../../service/ui/HandlerIco";
import ButtonNotLink from "../../../../../../components/ui/atoms/ButtonNotLink";
import { FoodExchangeType } from "../../../../../../types/data/food";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

interface MenuCreateProps {
    foods: FoodExchangeType[],
    screen?: boolean
}

const DistributionExchangeCreate: FC<MenuCreateProps> = ({ foods, screen }) => {
    const { close, status } = useModal();

    useEffect(() => {
        // if (pieRef.current) return; // Evitar gráficos duplicados.
        // Datos del gráfico
        const chart = am4core.create(`chartdiv`, am4charts.PieChart);
        // pieRef.current = chart;

        chart.data = foods.map((item: FoodExchangeType) => {
            return { category: item.name, value: item.caloria ? Number(item.caloria) : 0 }
        });

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
    }, []);

    return (
        <div className={screen ? "" : "w-[60%] bg-base-300 py-3 rounded-lg border"}>
            <div className="flex justify-between px-5">
                <Subtitle text="Gráfica De Distribución" customClass="text-xl font-black" />
                <ul className="flex gap-3">
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

export default DistributionExchangeCreate;
