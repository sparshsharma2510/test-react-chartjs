import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Scatter } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function VisualGraph({currentSelection, chartData}){
    //Sort the data on the basis of timestamps
    const propsData = chartData.sort((a,b)=>{return a.time-b.time});

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Data Plot',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperature (in °C)',
                    labelString: 'X axis Title'
                }
            },
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Time (in Hours Format)'
                }
            }
        },
    };
    //Extracting the time stamps as labels
    const labels = propsData.map(item => item.time);

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature (in °C)',
                data: propsData.map((item) => item.temperature),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    //Based on the user selection render the Graphs
    switch(currentSelection){
        case 1:{
            return <Bar options={options} data={data}/>;
        }
        case 2:{
            return <Line options={options} data={data}/>;
        }
        case 3: {
            return <Scatter options={options} data={data}/>;
        }
        default:
            return null;
    }
}