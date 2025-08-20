import {
    Chart, CategoryScale,
    LinearScale, LineElement,
    PointElement, Title,
    Tooltip, Legend,
    ArcElement, LineController,
    PieController, BarController,
    BarElement
} from 'chart.js';
import { fetchAllItems } from '../utils/render/fetchAllItems';
import { totalMonthly } from '../utils/render/totalGlobalOrMonthly';

Chart.register(
    CategoryScale, LinearScale,
    LineElement, PointElement,
    Title, Tooltip,
    Legend, ArcElement,
    LineController, PieController,
    BarController, BarElement
)

export class ManagerChartMonthly {
    private lineChartInstance: Chart | null = null;
    private pieChartInstance: Chart | null = null;
    private ctxLine = document.getElementById('monthly-line-chart')! as HTMLCanvasElement;
    private ctxPie = document.getElementById('monthly-pie-chart')! as HTMLCanvasElement;
    private updateTimer: number | null = null;


    constructor() {
        totalMonthly();
        this.refreshAndRenderCharts();

        // Atualiza automaticamente ao receber os eventos globais
        window.addEventListener('dataChanged', async (e: Event) => {
            if (this.updateTimer) window.clearTimeout(this.updateTimer);

            this.updateTimer = window.setTimeout(() => {
                this.refreshAndRenderCharts().catch(console.error);
            }, 100);
        })
    }

    private async refreshAndRenderCharts() {
        const { incResultFilter, expResultFilter } = await fetchAllItems();

        // Line chart
        if (this.lineChartInstance) {
            this.lineChartInstance.data.datasets[0].data = [incResultFilter, expResultFilter];
            this.lineChartInstance.update();
            } else {
            this.lineChartInstance = new Chart(this.ctxLine, {
                type: 'bar',
                data: {
                    labels: ['Receitas', 'Despesas'],
                    datasets: [{
                        data: [incResultFilter, expResultFilter],
                        borderWidth: 2,
                        borderColor: "transparent",
                        backgroundColor: ["rgb(37, 154, 103)", "rgba(216, 60, 60, 1)"]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            font: {
                                size: 18
                            }
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return `R$ ${value}`
                                }
                            }
                        }
                    }
                }
            })
        }

        // Pie chart
        if (this.pieChartInstance) {
            this.pieChartInstance.data.datasets[0].data = [incResultFilter, expResultFilter];
            this.pieChartInstance.update()
            } else {
            this.pieChartInstance = new Chart(this.ctxPie, {
                type: 'pie',
                data: {
                    labels: ['Receitas', 'Despesas'],
                    datasets: [{
                        data: [incResultFilter, expResultFilter],
                        backgroundColor: ['rgb(37, 154, 103)', 'rgba(216, 60, 60, 1)'],
                        borderWidth: 2,
                        borderColor: '#E5E7EB'
                    }]
                },
                options: {
                    responsive: false,
                    plugins: {
                        title: {
                            display: true,
                            font: {
                                size: 18
                            }
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const label = context.label || '';
                                    const value = context.parsed;
                                    const data = context.dataset.data as number[];

                                    const total = data.reduce((acc, curr) => acc + curr, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);

                                    return `${label}: ${percentage}%`;
                                }
                            }
                        }
                    },
                }
            })
        }
    }
}


