import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { URL_API } from "../../../../env";
import { GetToken } from "../../../../service/auth/TokenStorage";
import Subtitle from "../../atoms/text/Subtitle";

interface SemiCircleChartProps {
    path: string;
    reload: boolean;
    id?: string;
    query?: string;
    userId?: string
}

const SemiCircleChart: FC<SemiCircleChartProps> = ({ path,reload }) => {

    const [title, setTitle] = useState(``);
    const [data, setData] = useState<{category:string,value:number}[]>([]);
    const [load, setLoad] = useState(true);

    const chartRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!chartRef.current) return;

        let chart = am4core.create(chartRef.current, am4charts.PieChart);

        chart.innerRadius = am4core.percent(50); 
        chart.startAngle = 180;
        chart.endAngle = 360;

        chart.data = data;

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";

        pieSeries.labels.template.disabled = true;

        pieSeries.slices.template.cornerRadius = 10;
        pieSeries.slices.template.innerCornerRadius = 7;

        return () => {
            chart.dispose();
        };
    }, [data]);

    useEffect(() => {
        (async () => {
            setLoad(true);

            const url = `${URL_API}/graphic/${path}`;
            const result = await fetch(url, { headers:{token:`${GetToken()}`} });
            const json = await result.json();

            setData(json.category);
            setTitle(json.title);

            setLoad(false);
        })()
    }, [reload])

    return <>
        {
            load 
            ? <div className="flex justify-center items-center w-full h-full">
                <span className="loading loading-spinner"></span>
            </div>
            : <div className="rounded bg-base-300 p-5">
                <Subtitle text={title} customClass="text-lg font-bold text-center" />
                <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
            </div>
        }
    
    </>;
};

export default SemiCircleChart;
