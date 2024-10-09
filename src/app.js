import { createChart } from "./transport.js";
import { createPie } from "./transport.js";

document.getElementById('weightForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const weight = document.getElementById('weight').value;

    if (!date || isNaN(weight) || weight <= 0) {
        alert('Please enter a valid date and weight.');
        return;
    }

    let weights = JSON.parse(localStorage.getItem('weights')) || [];
    weights.push({ date, weight: parseFloat(weight) });
    localStorage.setItem('weights', JSON.stringify(weights));
    displayWeights();
    // Clear form inputs
    document.getElementById('date').value = '';
    document.getElementById('weight').value = '';

    showNotification('Weight entry added successfully!');
});

function displayWeights() {
    const weights = JSON.parse(localStorage.getItem('weights')) || [];
    createChart(weights);
    createPie(weights);

    const weightList = document.getElementById('weightList');
    weightList.innerHTML = '';

    weights.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Date: ${entry.date}, Weight: ${entry.weight} kg`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add("btn")
        deleteButton.classList.add("btn-danger")
        deleteButton.addEventListener('click', () => {
            weights.splice(index, 1);
            localStorage.setItem('weights', JSON.stringify(weights));
            displayWeights();
        });

        listItem.appendChild(deleteButton);
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

document.getElementById('exportData').addEventListener('click', () => {
    const weights = JSON.parse(localStorage.getItem('weights')) || [];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(weights));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "weights.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

document.getElementById('importData').addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const weights = JSON.parse(e.target.result);
        localStorage.setItem('weights', JSON.stringify(weights));
        displayWeights();
        showNotification('Data imported successfully!');
    };
    reader.readAsText(file);
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.borderRadius = '5px';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

displayWeights();