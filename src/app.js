import { createChart } from "./transport.js";

document.getElementById('weightForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const weight = document.getElementById('weight').value;

    if (date && weight && weight > 0) {
        let weights = JSON.parse(localStorage.getItem('weights')) || [];
        weights.push({ date, weight: parseFloat(weight) });
        localStorage.setItem('weights', JSON.stringify(weights));
        displayWeights();
        // Clear form inputs
        document.getElementById('date').value = '';
        document.getElementById('weight').value = '';
    }
});

function displayWeights() {
    const weights = JSON.parse(localStorage.getItem('weights')) || [];
    createChart(weights);

    const weightList = document.getElementById('weightList');
    weightList.innerHTML = '';

    weights.forEach((entry) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Date: ${entry.date}, Weight: ${entry.weight} kg`;
        weightList.appendChild(listItem);
    });

    calculateProgress(weights);
}

function calculateProgress(weights) {
    if (weights.length > 1) {
        const start = weights[0].weight;
        const end = weights[weights.length - 1].weight;
        const progress = end - start;
        console.log(`Progress: ${progress} kg`);

        // Display progress
        document.getElementById('progress').textContent = `Progress: ${progress} kg`;
    } else {
        // Clear progress display if there's not enough data
        document.getElementById('progress').textContent = '';
    }
}

displayWeights();