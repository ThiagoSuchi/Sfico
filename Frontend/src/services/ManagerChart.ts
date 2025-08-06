import {
    Chart,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineController,
    PieController,
    BarController,
    BarElement
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineController,
    PieController,
    BarController,
    BarElement
)

export class ManagerChart {
    private ctxLine = document.getElementById('line-chart')! as HTMLCanvasElement;
    private ctxPie = document.getElementById('pie-chart')! as HTMLCanvasElement;

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
                    data: [1500, 400],
                    borderWidth: 2,
                    borderColor: "transparent",
                    backgroundColor: ["rgb(37, 154, 103)", "#ad1a3aff"]
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
                    data: [300, 150],
                    backgroundColor: ['rgb(37, 154, 103)', '#ad1a3aff'],
                    borderWidth: 2,
                    borderColor: '#fff'
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
