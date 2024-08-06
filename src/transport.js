import Chart from 'chart.js/auto';

let chartInstance = null;

export function createChart(weightData) {

    if (chartInstance) {
        chartInstance.destroy();
    }

    weightData.forEach((entry) => {
        console.log(entry.weight)
    });

    const data = weightData.map(entry => ({
        weight: entry.weight,
        date: entry.date
    }));

    chartInstance = new Chart(
        document.getElementById('canvas1'),
        {
            type: 'line',
            data: {
                labels: data.map(row => row.date),
                datasets: [
                    {
                        label: 'Weight graph',
                        data: data.map(row => row.weight),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 3,
                        radius: 15,
                        hoverRadius: 18,
                        hoverBorderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Weight'
                        }
                    }
                },
                plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: (ctx) => 'Weight Chart ' + ctx.chart.data.datasets[0].pointStyle,
                    }
                  }
            }
        }
    );
}