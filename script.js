document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            window.products = data;
        })
        .catch(error => console.error('Error fetching products:', error));
});

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.price}Rs</p>
        `;
        card.onclick = () => openModal(product);
        productList.appendChild(card);
    });
}

function filterProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = window.products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

function openModal(product) {
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = product.price;
    document.getElementById('modal-quantity').textContent = product.rating.count; // Assuming quantity is the rating count
    document.getElementById('product-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}
