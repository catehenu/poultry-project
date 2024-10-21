// In-memory array to hold the poultry produce
let produceList = [];

// Function to render the produce list in the DOM
function renderProduce() {
    const produceListDiv = document.getElementById('produce-list');
    produceListDiv.innerHTML = ''; // Clear existing items

    produceList.forEach((produce, index) => {
        const produceItem = document.createElement('div');
        produceItem.innerHTML = `
            <h3>${produce.name}</h3>
            <p>${produce.description}</p>
            <img src="${produce.image}" alt="${produce.name}" />
            <button class="button update" data-index="${index}">Update</button>
            <button class="button delete" data-index="${index}">Delete</button>
        `;
        produceListDiv.appendChild(produceItem);
    });
}
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// Fetch the JSON data from the server and display the produce list
function fetchProduce() {
    fetch('http://localhost:3000/produce')
        .then(response => response.json())
        .then(data => {
            const produceList = document.getElementById('produce-list');
            produceList.innerHTML = ''; // Clear existing content
            data.forEach(produce => {
                const produceHTML = `
                    <div class="produce-item">
                        <h3>${produce.name}</h3>
                        <p>${produce.description}</p>
                        <img src="${produce.image}" alt="${produce.name}" class="produce-image">
                    </div>
                `;
                produceList.innerHTML += produceHTML;
            });
        });
}


// Add Produce
document.getElementById('add-produce-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    produceList.push({ name, description, image });
    renderProduce();

    // Clear the form
    this.reset();
});

// Update Produce
document.getElementById('update-produce-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const index = produceList.findIndex(produce => produce.name === document.getElementById('update-name').value);
    
    if (index !== -1) {
        produceList[index].description = document.getElementById('update-description').value;
        if (document.getElementById('update-image').value) {
            produceList[index].image = document.getElementById('update-image').value;
        }
        renderProduce();

        // Clear the form
        this.reset();
    } else {
        alert("Produce not found!");
    }
});

// Delete Produce
document.getElementById('delete-produce-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('delete-name').value;
    produceList = produceList.filter(produce => produce.name !== name);
    renderProduce();

    // Clear the form
    this.reset();
});

// Event delegation for update and delete buttons
document.getElementById('produce-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('update')) {
        const index = e.target.dataset.index;
        const produce = produceList[index];
        
        document.getElementById('update-name').value = produce.name;
        document.getElementById('update-description').value = produce.description;
        document.getElementById('update-image').value = produce.image;
    }

    if (e.target.classList.contains('delete')) {
        const index = e.target.dataset.index;
        produceList.splice(index, 1);
        renderProduce();
    }
});

// Initial render
renderProduce();
// In-memory array to hold the cart items
let cart = [];

// Function to update the cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length; // Display the number of items in the cart
}

// Function to handle adding products to the cart
function addToCart(product) {
    cart.push(product);
    updateCartDisplay();
}

// Add event listeners for "Add Cart" buttons
document.querySelectorAll('.button.add').forEach((button, index) => {
    button.addEventListener('click', function() {
        const productElement = button.closest('.product');
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = productElement.querySelector('p').textContent;
        const productImage = productElement.querySelector('img').src;

        // Create a product object
        const product = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        addToCart(product);
        alert(`${productName} has been added to the cart!`);
    });
});

// Initialize cart display
updateCartDisplay();
