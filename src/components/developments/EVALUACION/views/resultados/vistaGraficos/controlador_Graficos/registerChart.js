import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    RadialLinearScale,
    Title,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

export default ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Filler,
    Tooltip,
    Legend
);

