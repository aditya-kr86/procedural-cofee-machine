const MENU = {
    "espresso": {
        "ingredients": {
            "water": 150,
            "milk": 0,
            "coffee": 18,
        },
        "cost": 1.5,
    },
    "latte": {
        "ingredients": {
            "water": 200,
            "milk": 150,
            "coffee": 21,
        },
        "cost": 2.5,
    },
    "cappuccino": {
        "ingredients": {
            "water": 250,
            "milk": 200,
            "coffee": 24,
        },
        "cost": 3.0,
    }
};

let resources = {
    "water": 900,
    "milk": 700,
    "coffee": 100,
    "money": 0
};

let selectedCoffee = "";

function orderCoffee(coffeeName) {
    selectedCoffee = coffeeName;
    if (checkResources(coffeeName)) {
        document.getElementById('coin-input').style.display = 'block';
        document.getElementById('message').textContent = '';
    } else {
        document.getElementById('message').textContent = 'Not enough resources!';
    }
}

function checkResources(coffeeName) {
    const ingredients = MENU[coffeeName].ingredients;
    let sufficient = true;
    for (let ingredient in ingredients) {
        if (resources[ingredient] < ingredients[ingredient]) {
            sufficient = false;
            document.getElementById('message').textContent += `Not enough ${ingredient}.\n`;
        }
    }
    return sufficient;
}

function showResources() {
    let message = `Water: ${resources.water}ml\nMilk: ${resources.milk}ml\nCoffee: ${resources.coffee}g\nMoney: $${resources.money.toFixed(2)}`;
    alert(message);
}

function processOrder() {
    const quarters = parseInt(document.getElementById('quarters').value);
    const dimes = parseInt(document.getElementById('dimes').value);
    const nickels = parseInt(document.getElementById('nickels').value);
    const pennies = parseInt(document.getElementById('pennies').value);

    const total = (quarters * 0.25) + (dimes * 0.10) + (nickels * 0.05) + (pennies * 0.01);

    if (total >= MENU[selectedCoffee].cost) {
        const change = total - MENU[selectedCoffee].cost;
        alert(`Here is your ${selectedCoffee} ☕. Your change is $${change.toFixed(2)}`);
        reduceResources(selectedCoffee);
        resources.money += MENU[selectedCoffee].cost;
    } else {
        alert('Not enough money. Money refunded.');
    }

    document.getElementById('coin-input').style.display = 'none';
    resetCoinInputs();
}

function reduceResources(coffeeName) {
    resources.water -= MENU[coffeeName].ingredients.water;
    resources.milk -= MENU[coffeeName].ingredients.milk;
    resources.coffee -= MENU[coffeeName].ingredients.coffee;
}

function resetCoinInputs() {
    document.getElementById('quarters').value = 0;
    document.getElementById('dimes').value = 0;
    document.getElementById('nickels').value = 0;
    document.getElementById('pennies').value = 0;
}
