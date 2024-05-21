const inputContainer = document.getElementById('input-container');
const outputContainer = document.getElementById('output-container');


let cars = JSON.parse(localStorage.getItem('cars')) || [];

function showadd() {
    inputContainer.innerHTML = `
    <div class="wrapper_2">
        <input type="text" class"inputstyle" id="car-id" placeholder="ID">
        <input type="text" class"inputstyle" id="car-name" placeholder="Name">
        <input type="text" class"inputstyle" id="car-color" placeholder="Color">
        <input type="text" class"inputstyle" id="car-model" placeholder="Model">
        <input type="number" class"inputstyle" id="car-stock" placeholder="Stock">
        <input type="number" class"inputstyle" id="car-price" placeholder="Price">
        <input type="number" class"inputstyle" id="car-year" placeholder="Year">
        <button id="submit-btn">Submit</button>
        </div>
    `;

    document.getElementById('submit-btn').addEventListener('click', () => {
        const id = document.getElementById('car-id').value;
        const name = document.getElementById('car-name').value;
        const color = document.getElementById('car-color').value;
        const model = document.getElementById('car-model').value;
        const stock = document.getElementById('car-stock').value;
        const price = document.getElementById('car-price').value;
        const year = document.getElementById('car-year').value;

        if (id && name && color && model && stock && price && year) {
            const car = { id, name, color, model, stock, price, year };
            cars.push(car);
            localStorage.setItem('cars', JSON.stringify(cars));
            displayCars();
        } else {
            alert(' fields.');
        }
    });
}

function searchinput() {
    inputContainer.innerHTML = `
        <input type="text" id="search-name" placeholder="search car">
        <button id="search-submit-btn">Search</button>
        
    `;

    document.getElementById('search-submit-btn').addEventListener('click', () => {
        const searchName = document.getElementById('search-name').value;
        if (searchName) {
            const foundCars = cars.filter(car => car.name.toLowerCase().includes(searchName.toLowerCase()));
            displayCars(foundCars);
        } else {
            alert('search cars');
        }
    });
}

function deleteinput() {
    inputContainer.innerHTML = `
        <input type="text" id="delete-id" placeholder=" ID delete">
        <button id="delete-submit-btn">Delete</button>
    `;

    document.getElementById('delete-submit-btn').addEventListener('click', () => {
        const carId = document.getElementById('delete-id').value;
        if (carId) {
            cars = cars.filter(car => car.id !== carId);
            localStorage.setItem('cars', JSON.stringify(cars));
            displayCars();
        } else {
            alert('eror ID.');
        }
    });
}

function sortCars() {
    cars.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('cars', JSON.stringify(cars));
    displayCars();
}

function displayCars(filteredCars = cars) {
    outputContainer.innerHTML = '';
    filteredCars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.textContent = ` :ID: ${car.id}, : Name: ${car.name}, Color: ${car.color}, : Model: ${car.model}, : Stock: ${car.stock}, : Price: ${car.price}, : Year: ${car.year}`;
        outputContainer.appendChild(carDiv);
    });
}

displayCars();

document.getElementById('add-btn').addEventListener('click', showadd);
document.getElementById('search-btn').addEventListener('click', searchinput);
document.getElementById('sort-btn').addEventListener('click', sortCars);
document.getElementById('delete-btn').addEventListener('click', deleteinput);
