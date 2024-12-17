let start = 0;
const limit = 10;
let isLoading = false;

const container = document.getElementById("product-container");
const loader = document.getElementById("loader");

// Charger les produits depuis le serveur
async function loadProducts() {
    if (isLoading) return;
    isLoading = true;

    loader.style.display = "block";

    try {
        const response = await fetch(`load_products.php?start=${start}&limit=${limit}`);
        const products = await response.json();

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>${product.price} €</strong></p>
                </div>
            `;

            container.appendChild(card);
        });

        start += limit;
    } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
    }

    loader.style.display = "none";
    isLoading = false;
}

// Détecter le défilement pour charger plus de produits
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadProducts();
    }
});

// Charger les produits initiaux
loadProducts();
