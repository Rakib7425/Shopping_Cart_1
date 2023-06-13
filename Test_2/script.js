// script.js

class Product {
    constructor(id, name, price, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.cartItems = [];
      this.cartIcon = document.querySelector(".carticon");
      this.cartCount = this.cartIcon.querySelector(".cartcount");
      this.cartUI = document.querySelector(".cartui");
      this.closeCartUI = this.cartUI.querySelector(".closecart");
      this.overlay = document.querySelector(".overlay");
      this.cartItemsList = this.cartUI.querySelector(".cartitems");
      this.totalAmount = this.cartUI.querySelector(".totalamount");
      this.checkoutButton = this.cartUI.querySelector(".checkout");
  
      this.initialize();
      this.addEventListeners();
    }
  
    initialize() {
      // Load cart items from local storage
      this.loadCartItems();
  
      // Display cart count and items
      this.updateCart();
    }
  
    addEventListeners() {
      this.cartIcon.addEventListener("click", () => {
        this.toggleCartUI();
      });
  
      this.closeCartUI.addEventListener("click", () => {
        this.toggleCartUI();
      });
  
      this.overlay.addEventListener("click", () => {
        this.toggleCartUI();
      });
  
      this.checkoutButton.addEventListener("click", () => {
        alert("Checkout functionality is not implemented yet.");
      });
    }
  
    loadCartItems() {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        this.cartItems = JSON.parse(cartItems);
      }
    }
  
    saveCartItems() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    }
  
    addToCart(product) {
      this.cartItems.push(product);
      this.saveCartItems();
      this.updateCart();
    }
  
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      this.saveCartItems();
      this.updateCart();
    }
  
    updateCart() {
      const cartCount = this.cartItems.length;
      this.cartCount.textContent = cartCount;
  
      this.cartItemsList.innerHTML = "";
      let amount = 0;
  
      for (const cartItem of this.cartItems) {
        const cartItemElement = document.createElement("li");
        const itemDetailsElement = document.createElement("div");
        const itemImageElement = document.createElement("img");
        const itemNameElement = document.createElement("span");
        const itemPriceElement = document.createElement("span");
        const removeButtonElement = document.createElement("button");
  
        cartItemElement.classList.add("cartitem");
        removeButtonElement.classList.add("removefromcart");
        itemImageElement.src = cartItem.image;
        itemImageElement.alt = cartItem.name;
        itemNameElement.textContent = cartItem.name;
        itemPriceElement.textContent = cartItem.price.toFixed(2);
        removeButtonElement.textContent = "Remove";
  
        itemDetailsElement.appendChild(itemImageElement);
        itemDetailsElement.appendChild(itemNameElement);
        itemDetailsElement.appendChild(itemPriceElement);
  
        cartItemElement.appendChild(itemDetailsElement);
        cartItemElement.appendChild(removeButtonElement);
  
        this.cartItemsList.appendChild(cartItemElement);
  
        amount += cartItem.price;
      }
  
      this.totalAmount.textContent = amount.toFixed(2);
    }
  
    toggleCartUI() {
      this.cartUI.classList.toggle("open");
      this.overlay.classList.toggle("open");
    }
  }
  
  // Create product instances
  const products = [
    new Product(1, "Product 1", 10.99, "product1.jpg"),
    new Product(2, "Product 2", 19.99, "product2.jpg"),
    new Product(3, "Product 3", 7.99, "product3.jpg"),
  ];
  
  // Create shopping cart instance
  const shoppingCart = new ShoppingCart();
  
  // Display products
  const productsContainer = document.querySelector(".productscontainer");
  
  for (const product of products) {
    const productElement = document.createElement("div");
    const productImageElement = document.createElement("img");
    const productNameElement = document.createElement("p");
    const productPriceElement = document.createElement("p");
    const addToCartButton = document.createElement("button");
  
    productElement.classList.add("product");
    productImageElement.src = product.image;
    productImageElement.alt = product.name;
    productNameElement.textContent = product.name;
    productPriceElement.textContent = `$${product.price.toFixed(2)}`;
    addToCartButton.textContent = "Add to Cart";
  
    productElement.appendChild(productImageElement);
    productElement.appendChild(productNameElement);
    productElement.appendChild(productPriceElement);
    productElement.appendChild(addToCartButton);
  
    productsContainer.appendChild(productElement);
  
    addToCartButton.addEventListener("click", () => {
      shoppingCart.addToCart(product);
    });
  }
  