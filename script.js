const products = [

    {
        id: 7,
        name: "Maçã Verde",
        description: "Maçã verde fresca e crocante, rica em fibras",
        price: 4.99,
        department: "frutas",
        unit: "kg",
        icon: "🍏",
    },
    {
        id: 8,
        name: "Banana Prata",
        description: "Banana prata madura, perfeita para vitaminas",
        price: 3.49,
        department: "frutas",
        unit: "kg",
        icon: "🍌",
    },
    {
        id: 9,
        name: "Laranja Pera",
        description: "Laranja suculenta e doce, ideal para sucos",
        price: 2.99,
        department: "frutas",
        unit: "kg",
        icon: "🍊",
    },
    {
        id: 10,
        name: "Morango",
        description: "Morango fresco e vermelho, colhido diariamente",
        price: 8.99,
        department: "frutas",
        unit: "caixa",
        icon: "🍓",
    },

    {
        id: 11,
        name: "Alface Crespa",
        description: "Alface crespa orgânica, folhas verdes e frescas",
        price: 2.49,
        department: "vegetais",
        unit: "unidade",
        icon: "🥬",
    },
    {
        id: 12,
        name: "Tomate",
        description: "Tomate vermelho maduro, perfeito para saladas",
        price: 3.99,
        department: "vegetais",
        unit: "kg",
        icon: "🍅",
    },
    {
        id: 13,
        name: "Cenoura",
        description: "Cenoura fresca e crocante, ótima para cozinhar",
        price: 2.79,
        department: "vegetais",
        unit: "kg",
        icon: "🥕",
    },
    {
        id: 14,
        name: "Batata Inglesa",
        description: "Batata inglesa, versátil para diversos pratos",
        price: 3.29,
        department: "vegetais",
        unit: "kg",
        icon: "🥔",
    },

    {
        id: 15,
        name: "Detergente Líquido",
        description: "Detergente para louças, removedor de gordura",
        price: 2.99,
        department: "limpeza",
        unit: "500ml",
        icon: "🧴",
    },
    {
        id: 16,
        name: "Água Sanitária",
        description: "Água sanitária concentrada, desinfetante potente",
        price: 4.49,
        department: "limpeza",
        unit: "1L",
        icon: "🧼",
    },
    {
        id: 17,
        name: "Sabão em Pó",
        description: "Sabão em pó para roupas, remove manchas difíceis",
        price: 12.99,
        department: "limpeza",
        unit: "1kg",
        icon: "🧽",
    },
    {
        id: 19,
        name: "Suco de Laranja",
        description: "Suco de laranja natural, sem conservantes",
        price: 7.99,
        department: "bebidas",
        unit: "1L",
        icon: "🧃",
    },
    {
        id: 20,
        name: "Leite Integral",
        description: "Leite integral fresco, rico em cálcio",
        price: 4.49,
        department: "bebidas",
        unit: "1L",
        icon: "🥛",
    },
    {
        id: 21,
        name: "Água Mineral",
        description: "Água mineral sem gás, fonte natural",
        price: 1.99,
        department: "bebidas",
        unit: "1,5L",
        icon: "💧",
    },
    {
        id: 22,
        name: "Coca-Cola",
        description: "Refrigerante sabor cola, lata geladinha",
        price: 3.99,
        department: "bebidas",
        unit: "350ml",
        icon: "🥤",
    },

    {
        id: 23,
        name: "Pão Francês",
        description: "Pão francês fresquinho, crocante por fora",
        price: 0.50,
        department: "padaria",
        unit: "unidade",
        icon: "🥖",
    },
    {
        id: 24,
        name: "Bolo de Chocolate",
        description: "Bolo de chocolate fofinho, cobertura cremosa",
        price: 12.99,
        department: "padaria",
        unit: "500g",
        icon: "🍰",
    },
    {
        id: 25,
        name: "Croissant",
        description: "Croissant folhado, massa amanteigada",
        price: 3.99,
        department: "padaria",
        unit: "unidade",
        icon: "🥐",
    },
    {
        id: 26,
        name: "Biscoito Recheado",
        description: "Biscoito recheado sabor chocolate",
        price: 2.49,
        department: "padaria",
        unit: "130g",
        icon: "🍪",
    }
];

let cart = [];

const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const messageContainer = document.getElementById('messageContainer');

function init() {
    renderProducts();
    updateCart();
    setupEventListeners();
}


function setupEventListeners() {
    checkoutBtn.addEventListener('click', handleCheckout);
}

function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar</button>
                <button class="btn btn-secondary" onclick="showProductDetails(${product.id})">Detalhes</button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showMessage('Produto não encontrado!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showMessage(`${product.name} adicionado ao carrinho!`, 'success');
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const removedItem = cart[itemIndex];
        cart.splice(itemIndex, 1);
        updateCart();
        showMessage(`${removedItem.name} removido do carrinho!`, 'info');
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
        totalPrice.textContent = 'R$ 0,00';
        checkoutBtn.disabled = true;
        return;
    }
    
    const uniqueItems = cart.filter((item, index, self) => 
        index === self.findIndex(i => i.id === item.id)
    );

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `R$ ${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
}

function handleCheckout() {
    if (cart.length === 0) {
        showMessage('Seu carrinho está vazio!', 'error');
        return;
    }
    
    const productNames = cart.map(item => item.name);
    
    const message = `Compra realizada com sucesso! Itens: ${productNames.join(', ')}`;
    
    showMessage(message, 'success');
    
    cart = [];
    updateCart();
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const message = `
            <strong>${product.name}</strong><br>
            ${product.description}<br>
            <strong>Preço: R$ ${product.price.toFixed(2)}</strong>
        `;
        showMessage(message, 'info');
    }
}

function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = text;

    switch(type.toLowerCase()) {
        case 'success':
            message.style.borderLeftColor = '#10b981';
            break;
        case 'error':
            message.style.borderLeftColor = '#ef4444';
            break;
        case 'info':
        default:
            message.style.borderLeftColor = '#3b82f6';
            break;
    }
    
    messageContainer.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 5000);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
}

function sortProducts(criteria) {
    const sortedProducts = [...products];
    
    switch(criteria) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }
    
    return sortedProducts;
}

function getCartStats() {
    const itemCount = cart.length;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    
    const cartObject = cart.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {});
    
    const keys = Object.keys(cartObject);
    const values = Object.values(cartObject);
    const entries = Object.entries(cartObject);
    
    console.log('Chaves dos itens:', keys);
    console.log('Valores dos itens:', values);
    console.log('Entradas dos itens:', entries);
    
    return {
        itemCount,
        totalItems,
        totalValue,
        averagePrice: totalValue / totalItems || 0
    };
}

function getProductDetails(productId) {
    
    const product = products.find(p => p.id === productId);
    
    if (product) {

        const relatedProducts = products.slice(0, 3);
        return {
            product,
            relatedProducts
        };
    }
    
    return null;
}

document.addEventListener('DOMContentLoaded', init);

