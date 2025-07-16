import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
import { useEventDetail } from '../global/useEventDetails';
 
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartGraphPledge() {

    const { event } = useEventDetail((state) => state)
    const data = {
        labels: ["Donated", "Remaining"],
        datasets: [
            {
                label: "Donation",
                data: [event.eventPledge.organizations[0].fundRaised/100, ((event.eventPledge?.minimumPledge/100) - event.eventPledge.organizations[0].fundRaised/100)],
                backgroundColor: ["#37137F", "#37137F26"],
                circumference: 180,
                rotation: 270,

            }
        ]
    }

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
        },
        cutout: '80%', // Increase to reduce the thickness of the chart
    };

    // Custom plugin to display text in the center of the Doughnut chart
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart: any) => {
            const { width, height, ctx } = chart;
            const sum = chart.data.datasets[0].data.reduce((acc: number, value: number) => acc + value, 0);
            const value = chart.data.datasets[0].data[0]; // You can customize which percentage to show
            const percentage = ((value / sum) * 100).toFixed(1);

            ctx.restore();
            const fontSize = (height / 160).toFixed(2);
            ctx.font = `${fontSize}em sans-serif`;
            ctx.textBaseline = 'middle';

            const text = `${percentage}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        },
    };


    return (
        <div className=' w-full flex justify-center text-primary py-8 ' >
            <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
        </div>
    )
}
