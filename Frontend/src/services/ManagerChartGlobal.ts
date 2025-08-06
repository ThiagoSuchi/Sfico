import {
    Chart, CategoryScale,
    LinearScale, LineElement, 
    PointElement, Title,
    Tooltip, Legend,
    ArcElement, LineController,
    PieController, BarController,
    BarElement
} from 'chart.js';

Chart.register(
    CategoryScale, LinearScale,
    LineElement, PointElement,
    Title, Tooltip,
    Legend, ArcElement,
    LineController, PieController,
    BarController, BarElement
)

export class ManagerChartGlobal {
    private ctxLine = document.getElementById('global-line-chart')! as HTMLCanvasElement;
    private ctxPie = document.getElementById('global-pie-chart')! as HTMLCanvasElement;

    constructor() {
        setTimeout(() => {
            this.lineChart();
            this.pieChart();
        }, 200);
    }

    private lineChart() {
        new Chart(this.ctxLine, {
            type: 'bar',
            data: {
                labels: ['Receitas', 'Despesas'],
                datasets: [{
                    data: [3500, 430],
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

    private pieChart() {
        new Chart(this.ctxPie, {
            type: 'pie',
            data: {
                labels: ['Receitas', 'Despesas'],
                datasets: [{
                    data: [3500, 430],
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
