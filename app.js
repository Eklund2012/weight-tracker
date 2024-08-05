document.getElementById('weightForm').addEventListener('submit', function(e) {  
    e.preventDefault();
    const date = document.getElementById('date').value;
    const weight = document.getElementById('weight').value;

    if (date && weight) {
        let weights = JSON.parse(localStorage.getItem('weights')) || [];
        weights.push({ date, weight: parseFloat(weight) });
        localStorage.setItem('weights', JSON.stringify(weights));
        displayWeights();
    }
    startWeight(); 
});

function displayWeights() {
    const weights = JSON.parse(localStorage.getItem('weights')) || [];
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
    }
}

function startWeight(){
    console.log("test")
    const startWeight = document.getElementById("startWeight");
    if(!JSON.parse(localStorage.getItem('weights'))){      
        startWeight.removeAttribute("hidden");
    }else{
        startWeight.setAttribute("hidden", true);
    }
}

displayWeights();
startWeight();
