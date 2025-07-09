const products = [
  { id: 1, name: "Smartphone", price: 299, category: "Electronics", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Laptop", price: 799, category: "Electronics", image: "https://via.placeholder.com/150" },
  { id: 3, name: "T-Shirt", price: 19, category: "Clothing", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Jeans", price: 49, category: "Clothing", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Watch", price: 99, category: "Accessories", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Sunglasses", price: 59, category: "Accessories", image: "https://via.placeholder.com/150" }
];

let filteredCategory = "All";

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  const filteredProducts = products.filter(product => {
    const matchesCategory = filteredCategory === "All" || product.category === filteredCategory;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  filteredProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
    `;
    productList.appendChild(productCard);
  });
}

function filterCategory(category) {
  filteredCategory = category;
  displayProducts();
}

function applyPriceFilter() {
  displayProducts();
}

// Initial display
displayProducts();
