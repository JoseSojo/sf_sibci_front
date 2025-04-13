
import { AreaSeries, createChart } from 'lightweight-charts';
import { FC, useEffect, useRef } from 'react';
import { ColorHex } from '../../../../types/ui/colors.d';
import { Statictic } from '../../../../types/statictics';

interface ChartComponentProp {
    data: Statictic[];
    title: string
}

const ChartComponent: FC<ChartComponentProp> = ({ data }) => {
    const colors = ColorHex;

    const { areaBottomColor, areaTopColor, textColor } = {
        // backgroundColor: colors.dark,
        // lineColor: colors.info,
        textColor: colors.info,
        areaTopColor: colors.info,
        areaBottomColor: colors.dark,
    }

    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chartContainerRef && chartContainerRef.current) {
            const handleResize = () => {
                if (chartContainerRef && chartContainerRef.current) chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { color:`transparent` },
                    textColor,
                },
                height: 300,
            });

            chart.applyOptions({
                autoSize: true,
                grid: {
                    horzLines: { color:`#0000` },
                    vertLines: { color:`#1DCD9F23` }
                },
                width: 300,
                localization: {
                    dateFormat: `yyyy-mm-dd`
                }
            });

            chart.timeScale().fitContent();

            const newSeries = chart.addSeries(AreaSeries, { 
                lineColor:`#1DCD9F`, 
                topColor: `#169976`, 
                bottomColor: `transparent`
            });
            
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        }
    }, [data, textColor, areaTopColor, areaBottomColor]);

    return (
        <div ref={containerRef}>
            <div
                style={{ width:`100%` }}
                className={``}
                ref={chartContainerRef}
            />
        </div>
    );
};

export default ChartComponent;
