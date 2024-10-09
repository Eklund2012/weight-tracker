import Chart from 'chart.js/auto';

let chartInstance = null;
let pieInstance = null;

function createPieData(weight) {
    data = {
        datasets: [{
            data: [10, 20, 30]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Carbs',
            'Protein',
            'Fat'
        ]
    };
    return data;
}

export function createPie(weightData) {
    if (pieInstance) {
        pieInstance.destroy();
    }



    const currWeight = weightData[weightData.length - 1].weight;

    data = createPieData(currWeight)

    pieInstance = new Chart(
        document.getElementById('canvas2'),
        {
            type: 'pie',
            data: data,
        }
    )
}

export function createChart(weightData) {

    if (chartInstance) {
        chartInstance.destroy();
    }

    const data = weightData.map(entry => ({
        weight: entry.weight,
        date: entry.date
    }));

    if (data.length === 0) return; // Check if data is empty

    const startingWeight = data[0].weight;
    const maxWeight = startingWeight + 50;

    const superColor = "#563d7c"

    chartInstance = new Chart(
        document.getElementById('canvas1'),
        {
            type: 'line',
            data: {
                labels: data.map(row => row.date),
                datasets: [
                    {
                        label: 'Weight graph',
                        color: 'rgba(0, 0, 0, 0)',
                        data: data.map(row => row.weight),
                        backgroundColor: 'rgba(0, 0, 0, 0)', //transparent bkg of chart cirle
                        borderCapStyle: "round",
                        borderColor: superColor,
                        borderWidth: 4,
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
                            text: 'Date',
                            color: 'rgba(0, 0, 0, 1)',
                        }
                    },
                    y: {
                        min: 0,
                        max: maxWeight,
                        ticks: {
                            callback: value => `${value} kg`
                        },
                        display: true,
                        title: {
                            display: true,
                            text: 'Weight',
                            color: 'rgba(0, 0, 0, 1)',
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 20,
                                family: "Arial",
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Weight Chart ',
                        color: 'rgba(0, 0, 0, 1)',
                    }
                }
            }
        }
    );
}