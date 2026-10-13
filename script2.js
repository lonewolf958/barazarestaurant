
/* ==========================================================================
   BARAZA RESTAURANT & CAFE
   Online Ordering Script — index2.html

   Main responsibilities:
   1. Render the menu and category navigation.
   2. Handle menu choices such as Fried/BBQ and side dishes.
   3. Manage the shopping cart and save it in localStorage.
   4. Handle Delivery and Pickup checkout.
   5. Calculate totals and prepare WhatsApp orders.
   6. Open and close the cart drawer.
   ========================================================================== */


/* ==========================================================================
   1. SETTINGS
   Edit these values when restaurant details change.
   ========================================================================== */

const WHATSAPP_NUMBER = "255753423253";
const RESTAURANT_NAME = "Baraza Restaurant & Cafe";
const CART_STORAGE_KEY = "barazaCart";


/* ==========================================================================
   2. SHARED MENU OPTIONS
   ========================================================================== */

// Side dishes customers can choose for applicable meals.
const SIDES = ["Chips", "Rice", "Noodles", "Naan"];

// Description used by meals that include a choice of side.
const SERVED_WITH_SIDES =
  "Served with chips, rice, noodles or naan.";

// Labels used in the checkout form and WhatsApp message.
const ORDER_TYPE_LABELS = {
  delivery: "Delivery",
  pickup: "Pickup"
};

// Options that customers must select before adding certain dishes.
const FRIED_OR_BBQ = [
  {
    label: "Fried or BBQ",
    values: ["Fried", "BBQ"]
  }
];

const PROTEIN_OPTIONS = [
  {
    label: "Chicken, Beef or Veg",
    values: ["Chicken", "Beef", "Veg"]
  }
];


/* ==========================================================================
   3. MENU DATA
   Edit dish names, prices, descriptions, and options here.

   Menu item format:
   ["Dish name", price]
   ["Dish name", price, requiredOptions]

   The list() helper converts these rows into menu item objects.
   ========================================================================== */

function list(rows, description) {
  return rows.map(([name, price, options]) => ({
    name,
    price,
    desc: description || "",
    opts: options || []
  }));
}


const MENU_DATA = [

  /* ------------------------------------------------------------------------
     BBQ COMBOS
     ------------------------------------------------------------------------ */

  {
    id: "bbq-combos",
    name: "BBQ Combos",

    items: [
      {
        name: "Singles Platter",
        price: 24000,
        desc:
          "2 sticks Mishkaki, 2 sticks Nundu, 1 stick Malai " +
          "Boti, 2 pieces Chicken Lollipop, 1/4 chicken, " +
          "1 piece Mutton Chop, 1 Naan and 1 Chips."
      }
    ]
  },


  /* ------------------------------------------------------------------------
     STARTERS
     ------------------------------------------------------------------------ */

  {
    id: "starters",
    name: "Starters",

    items: list([
      ["BBQ Chicken Wings", 15000],
      ["Poussin Chicken Wings", 15000],
      ["Chicken Kebab", 15000],
      ["Chicken Malai Boti (5 Sticks)", 15000],
      ["Chicken Lollipop", 15000],
      ["Beef Seekh Kebab", 12000],
      ["Beef Mishkaki", 12000],
      ["BBQ Nundu", 12000],
      ["Maini", 10000],
      ["Masala Paneer", 14000],
      ["Paneer Tikka", 14000],
      ["Mutton Mishkaki", 15000],
      ["Mutton Chops", 15000],
      ["Chicken Tikka Boti (5 Sticks)", 15000],
      ["Chilli Chicken", 18000],
      ["Crispy Chicken", 18000],
      ["Chicken Manchurian", 18000],
      ["Hot Garlic Prawns", 22000],
      ["Chilli Paneer", 14000]
    ])
  },


  /* ------------------------------------------------------------------------
     KUKU NUSU
     ------------------------------------------------------------------------ */

  {
    id: "kuku-nusu",
    name: "Kuku Nusu",
    sides: true,

    items: list([
      ["Sekela Chicken", 10000],
      ["Gajjar Chicken", 10000],
      ["Lemon Chicken", 10000],
      ["Choma Chicken", 10000],
      ["Schezwan Chicken", 15000],
      ["Extra Hot Chicken", 15000]
    ], SERVED_WITH_SIDES)
  },


  /* ------------------------------------------------------------------------
     CHICKEN MZINGA
     ------------------------------------------------------------------------ */

  {
    id: "chicken-mzinga",
    name: "Chicken Mzinga",
    sides: true,

    items: list([
      ["Pilipili Chicken", 24000, FRIED_OR_BBQ],
      ["Peri-Peri Chicken", 24000, FRIED_OR_BBQ],
      ["Crunchy Chicken (Fried)", 24000],
      ["Chicken Poussin (Fried)", 24000],
      ["Chilly Milly", 26000]
    ], SERVED_WITH_SIDES)
  },


  /* ------------------------------------------------------------------------
     SEAFOOD
     ------------------------------------------------------------------------ */

  {
    id: "seafood",
    name: "Seafood",
    sides: true,

    items: list([
      ["Fish Boti (4 Sticks Per Plate)", 18000],
      ["Fish Fillet", 24000, FRIED_OR_BBQ],
      ["Masala Prawns", 24000, FRIED_OR_BBQ],
      ["Garlic Butter Prawns", 24000, FRIED_OR_BBQ],
      ["Garlic Butter Fish (Fried)", 24000],
      ["Schezwan Prawns (Fried)", 24000]
    ], SERVED_WITH_SIDES)
  },


  /* ------------------------------------------------------------------------
     CHIPS
     ------------------------------------------------------------------------ */

  {
    id: "chips",
    name: "Chips",

    items: list([
      ["Plain Chips", 4000],
      ["Masala Chips", 5000],
      ["Garlic Chips", 6000],
      ["Schezwan Chips", 6000],
      ["Poussin Chips", 6000],
      ["Baraza Special Chips", 8000]
    ])
  },


  /* ------------------------------------------------------------------------
     NAAN
     ------------------------------------------------------------------------ */

  {
    id: "naan",
    name: "Naan",

    items: list([
      ["Plain Naan", 2000],
      ["Butter Naan", 3000],
      ["Garlic Naan", 3000],
      ["Chilly Naan", 3000]
    ])
  },


  /* ------------------------------------------------------------------------
     NOODLES
     ------------------------------------------------------------------------ */

  {
    id: "noodles",
    name: "Noodles",

    items: list([
      ["Veg Hakka Noodles", 7000],
      ["Chicken Hakka Noodles", 12000],
      ["Beef Hakka Noodles", 10000],
      ["Prawns Hakka Noodles", 17000],
      ["Fish Hakka Noodles", 15000]
    ])
  },


  /* ------------------------------------------------------------------------
     RICE
     ------------------------------------------------------------------------ */

  {
    id: "rice",
    name: "Rice",

    items: list([
      ["Steamed Rice", 5000],
      ["Jeera Rice", 7000],
      ["Vegetable Fried Rice", 8000],
      ["Chicken Fried Rice", 12000],
      ["Beef Fried Rice", 10000],
      ["Prawns Fried Rice", 15000],
      ["Fish Fried Rice", 13000],
      ["Schezwan Fried Rice", 10000, PROTEIN_OPTIONS]
    ])
  },


  /* ------------------------------------------------------------------------
     DRINKS
     ------------------------------------------------------------------------ */

  {
    id: "drinks",
    name: "Drinks",

    items: list([
      ["Small Water", 1000],
      ["Big Water", 3000],
      ["Seasonal Fresh Juice", 5000],
      ["Soda", 3000],
      ["Milkshake", 10000],
      ["Mojito", 10000]
    ])
  }

];


/* ==========================================================================
   4. GENERAL HELPERS
   Small functions reused throughout the script.
   ========================================================================== */

// Get an HTML element using its ID.
const $ = (id) => document.getElementById(id);

// Format an amount in Tanzanian Shillings.
function formatPrice(amount) {
  return "TSh " + Number(amount).toLocaleString("en-US") + "/=";
}

// Read and trim the value of an input field.
function getInputValue(id) {
  const input = $(id);
  return input ? input.value.trim() : "";
}

// Create an HTML element and optionally assign a class.
function createElement(tag, className = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  return element;
}

// Create a text element without interpreting the text as HTML.
function createTextElement(tag, className, text) {
  const element = createElement(tag, className);
  element.textContent = text;
  return element;
}


/* ==========================================================================
   5. APPLICATION STATE
   ========================================================================== */

// Each cart item contains:
// { key, name, price, qty }

let cart = [];

// Possible values: "delivery", "pickup", or null.
let orderType = null;


/* ==========================================================================
   6. RENDER CATEGORY NAVIGATION
   Creates the horizontal category buttons.
   ========================================================================== */

function renderCategoryNavigation() {
  const navigation = $("category-nav");

  if (!navigation) return;

  navigation.replaceChildren();

  MENU_DATA.forEach((category) => {
    const button = createTextElement(
      "button",
      "nav-pill",
      category.name
    );

    button.type = "button";
    button.dataset.target = category.id;

    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", "false");

    button.addEventListener("click", () => {
      scrollToCategory(category.id);
    });

    navigation.appendChild(button);
  });
}


// Scroll to a category, allowing for the sticky navigation bar.
function scrollToCategory(categoryId) {
  const section = $(categoryId);
  const navigation = document.querySelector(".category-nav");

  if (!section || !navigation) return;

  const offset = navigation.offsetHeight + 12;

  const position =
    section.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({
    top: position,
    behavior: "smooth"
  });
}


/* ==========================================================================
   7. RENDER MENU
   Creates category sections, dishes, choices, and Add to Cart buttons.
   ========================================================================== */

function renderMenu() {
  const main = $("menu-content");

  if (!main) return;

  main.replaceChildren();

  MENU_DATA.forEach((category) => {
    const section = createElement("section", "category-section");

    section.id = category.id;
    section.setAttribute(
      "aria-labelledby",
      category.id + "-heading"
    );

    // Category heading.
    const heading = createTextElement(
      "h2",
      "category-heading",
      category.name
    );

    heading.id = category.id + "-heading";
    section.appendChild(heading);

    // List containing the menu cards.
    const itemList = createElement("div", "item-list");

    category.items.forEach((item) => {
      itemList.appendChild(createMenuItem(category, item));
    });

    section.appendChild(itemList);
    main.appendChild(section);
  });
}


// Build one menu item card.
function createMenuItem(category, item) {
  const card = createElement("article", "menu-item");

  card.dataset.cat = category.id;
  card.dataset.name = item.name;
  card.dataset.price = String(item.price);

  // Dish name, description, and price.
  const top = createElement("div", "menu-item-top");
  const info = createElement("div", "menu-item-info");

  info.appendChild(
    createTextElement("h3", "menu-item-name", item.name)
  );

  if (item.desc) {
    info.appendChild(
      createTextElement("p", "menu-item-desc", item.desc)
    );
  }

  top.appendChild(info);

  top.appendChild(
    createTextElement(
      "div",
      "menu-item-price",
      formatPrice(item.price)
    )
  );

  card.appendChild(top);

  // Required choices and Add to Cart button.
  const actions = createElement("div", "menu-item-actions");

  // Add any dish-specific choices first.
  (item.opts || []).forEach((option) => {
    actions.appendChild(
      createChoiceSelect(
        option.label,
        option.values,
        "opt-select",
        "Choose: " + option.label + " *",
        item.name
      )
    );
  });

  // Add the side selector when the category requires it.
  if (category.sides) {
    actions.appendChild(
      createChoiceSelect(
        "Side",
        SIDES,
        "side-pick",
        "Choose your side *",
        item.name,
        true
      )
    );
  }

  // Add-to-cart button.
  const addButton = createTextElement(
    "button",
    "add-cart-btn",
    "+ Add to Cart"
  );

  addButton.type = "button";
  addButton.setAttribute(
    "aria-label",
    "Add " + item.name + " to cart"
  );

  actions.appendChild(addButton);
  card.appendChild(actions);

  return card;
}


// Create a dropdown for a required dish choice or side.
function createChoiceSelect(
  label,
  values,
  extraClass,
  placeholder,
  itemName,
  isSide = false
) {
  const select = createElement(
    "select",
    "side-select " + extraClass
  );

  select.setAttribute(
    "aria-label",
    (isSide ? "Choose a side for " : label + " for ") + itemName
  );

  // First option asks the customer to make a selection.
  const prompt = createTextElement(
    "option",
    "",
    placeholder
  );

  prompt.value = "";
  select.appendChild(prompt);

  // Add available choices as text, not HTML.
  values.forEach((value) => {
    const option = createTextElement(
      "option",
      "",
      isSide ? "with " + value : value
    );

    option.value = value;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    select.classList.remove("needs-side");
  });

  return select;
}


/* ==========================================================================
   8. ADD ITEMS TO CART
   Validates required choices before adding a dish.
   ========================================================================== */

function handleMenuClick(event) {
  const button = event.target.closest(".add-cart-btn");

  if (!button) return;

  const card = button.closest(".menu-item");

  if (!card) return;

  const optionSelects = Array.from(
    card.querySelectorAll(".opt-select")
  );

  const sideSelect = card.querySelector(".side-pick");

  // Required selections must be completed in order.
  const requiredSelections = optionSelects.concat(
    sideSelect ? [sideSelect] : []
  );

  const missingSelection = requiredSelections.find(
    (select) => !select.value
  );

  if (missingSelection) {
    missingSelection.classList.add("needs-side");
    missingSelection.focus();
    return;
  }

  // Build the selected dish name, including chosen options.
  let selectedName = card.dataset.name;

  if (optionSelects.length) {
    const choices = optionSelects
      .map((select) => select.value)
      .join(", ");

    selectedName += " (" + choices + ")";
  }

  if (sideSelect) {
    selectedName += " with " + sideSelect.value;
  }

  const categoryId = card.dataset.cat;
  const price = Number(card.dataset.price);

  const cartKey = categoryId + "::" + selectedName;

  addToCart(cartKey, selectedName, price);

  // Reset choices so the customer can make another selection.
  card.querySelectorAll("select").forEach((select) => {
    select.selectedIndex = 0;
  });

  // Brief visual feedback.
  button.classList.add("added");
  button.textContent = "Added ✓";

  setTimeout(() => {
    button.classList.remove("added");
    button.textContent = "+ Add to Cart";
  }, 900);
}


/* ==========================================================================
   9. CART STORAGE
   Saves the cart in the browser so it can survive page reloads.
   ========================================================================== */

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    // Reject malformed or invalid cart entries.
    return parsed.filter((item) => {
      return (
        item &&
        typeof item.key === "string" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        typeof item.qty === "number" &&
        Number.isInteger(item.qty) &&
        item.qty > 0
      );
    });

  } catch (error) {
    // The cart can still be used for the current session.
    return [];
  }
}


function saveCart() {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch (error) {
    // Storage may be unavailable; keep the in-memory cart working.
  }
}


/* ==========================================================================
   10. CART OPERATIONS
   Add, increase, decrease, remove, and clear items.
   ========================================================================== */

function addToCart(key, name, price) {
  const existingItem = cart.find(
    (item) => item.key === key
  );

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      key,
      name,
      price,
      qty: 1
    });
  }

  refreshCart();
}


function changeQuantity(key, amount) {
  const item = cart.find(
    (cartItem) => cartItem.key === key
  );

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter(
      (cartItem) => cartItem.key !== key
    );
  }

  refreshCart();
}


function removeFromCart(key) {
  cart = cart.filter(
    (item) => item.key !== key
  );

  refreshCart();
}


function clearCart() {
  if (!cart.length) return;

  const confirmed = window.confirm(
    "Are you sure you want to clear your cart?"
  );

  if (!confirmed) return;

  cart = [];
  refreshCart();
}


/* ==========================================================================
   11. CART CALCULATIONS
   ========================================================================== */

// Total price of all selected food.
function calculateFoodTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
}


// Total number of items, including quantities.
function calculateCartCount() {
  return cart.reduce(
    (total, item) => total + item.qty,
    0
  );
}


/* ==========================================================================
   12. REFRESH THE CART
   Updates saved data, item list, totals, count, and checkout button.
   ========================================================================== */

function refreshCart() {
  saveCart();
  renderCartItems();
  renderTotals();
  updateCartCount();
  updateSendButton();
}


// Update the floating cart button and accessible label.
function updateCartCount() {
  const count = calculateCartCount();
  const countElement = $("cart-count");
  const toggleButton = $("cart-toggle-btn");

  if (countElement) {
    countElement.textContent = count;
  }

  if (toggleButton) {
    toggleButton.setAttribute(
      "aria-label",
      "Open cart, " +
        count +
        (count === 1 ? " item" : " items")
    );
  }
}


/* ==========================================================================
   13. RENDER CART ITEMS
   Creates the selected items and quantity controls.
   ========================================================================== */

function renderCartItems() {
  const itemsContainer = $("cart-items");

  if (!itemsContainer) return;

  itemsContainer.replaceChildren();

  const isEmpty = cart.length === 0;

  itemsContainer.hidden = isEmpty;
  $("cart-footer").hidden = isEmpty;
  $("cart-empty").hidden = !isEmpty;

  if (isEmpty) return;

  cart.forEach((item) => {
    itemsContainer.appendChild(
      createCartItem(item)
    );
  });
}


// Build one selected item inside the cart drawer.
function createCartItem(item) {
  const row = createElement("div", "cart-item");

  // Item information.
  const info = createElement("div", "cart-item-info");

  info.appendChild(
    createTextElement(
      "p",
      "cart-item-name",
      item.name
    )
  );

  info.appendChild(
    createTextElement(
      "p",
      "cart-item-unit-price",
      formatPrice(item.price) + " each"
    )
  );

  row.appendChild(info);


  // Quantity controls and subtotal.
  const controls = createElement(
    "div",
    "cart-item-controls"
  );

  const quantityControls = createElement(
    "div",
    "cart-qty"
  );

  const decreaseButton = createQuantityButton(
    "−",
    "decrease",
    item,
    "Decrease quantity of " + item.name
  );

  const quantityValue = createTextElement(
    "span",
    "cart-qty-value",
    String(item.qty)
  );

  quantityValue.setAttribute("aria-live", "polite");

  const increaseButton = createQuantityButton(
    "+",
    "increase",
    item,
    "Increase quantity of " + item.name
  );

  quantityControls.appendChild(decreaseButton);
  quantityControls.appendChild(quantityValue);
  quantityControls.appendChild(increaseButton);

  controls.appendChild(quantityControls);


  // Subtotal for this cart item.
  controls.appendChild(
    createTextElement(
      "p",
      "cart-item-subtotal",
      formatPrice(item.price * item.qty)
    )
  );


  // Remove item button.
  const removeButton = createTextElement(
    "button",
    "cart-remove-btn",
    "Remove"
  );

  removeButton.type = "button";
  removeButton.dataset.action = "remove";
  removeButton.dataset.key = item.key;

  removeButton.setAttribute(
    "aria-label",
    "Remove " + item.name + " from cart"
  );

  controls.appendChild(removeButton);
  row.appendChild(controls);

  return row;
}


// Create a button that increases or decreases item quantity.
function createQuantityButton(
  label,
  action,
  item,
  accessibleLabel
) {
  const button = createTextElement(
    "button",
    "cart-qty-btn",
    label
  );

  button.type = "button";
  button.dataset.action = action;
  button.dataset.key = item.key;

  button.setAttribute(
    "aria-label",
    accessibleLabel
  );

  return button;
}


/* ==========================================================================
   14. PRICE TOTALS
   Delivery charges remain subject to confirmation by the restaurant.
   ========================================================================== */

function renderTotals() {
  const foodTotal = calculateFoodTotal();
  const isDelivery = orderType === "delivery";

  $("cart-food-total-value").textContent =
    formatPrice(foodTotal);

  $("cart-delivery-line").hidden = !isDelivery;

  $("cart-delivery-fee-value").textContent =
    "To be confirmed";

  $("cart-total-value").textContent = isDelivery
    ? formatPrice(foodTotal) + " + fee"
    : formatPrice(foodTotal);
}


/* ==========================================================================
   15. DELIVERY / PICKUP CHECKOUT
   Controls which customer fields are visible and validates the order.
   ========================================================================== */

function setOrderType(type) {
  if (!ORDER_TYPE_LABELS[type]) return;

  orderType = type;

  syncOrderForm();
}


// Show or hide fields based on the selected order type.
function syncOrderForm() {
  const selectedType = orderType;

  $("cart-customer-fields").hidden = !selectedType;
  $("order-type-hint").hidden = Boolean(selectedType);

  $("delivery-fields").hidden =
    selectedType !== "delivery";

  // Update selected button styling and accessibility state.
  document.querySelectorAll(".order-type-btn").forEach(
    (button) => {
      const isSelected =
        button.dataset.type === selectedType;

      button.classList.toggle("active", isSelected);

      button.setAttribute(
        "aria-checked",
        isSelected ? "true" : "false"
      );
    }
  );

  renderTotals();
  updateSendButton();
}


// Check whether all required information has been entered.
function isOrderValid() {
  if (!cart.length || !orderType) {
    return false;
  }

  if (
    !getInputValue("customer-name") ||
    !getInputValue("customer-contact")
  ) {
    return false;
  }

  if (orderType === "delivery") {
    return Boolean(
      getInputValue("customer-area") &&
      getInputValue("customer-address")
    );
  }

  return orderType === "pickup";
}


// Enable WhatsApp ordering only when the order is valid.
function updateSendButton() {
  const button = $("whatsapp-order-btn");

  if (button) {
    button.disabled = !isOrderValid();
  }
}


// Clear checkout fields after an order is submitted.
function resetOrderForm() {
  orderType = null;

  [
    "customer-name",
    "customer-contact",
    "customer-area",
    "customer-address",
    "customer-notes"
  ].forEach((id) => {
    const input = $(id);

    if (input) {
      input.value = "";
    }
  });

  $("customer-notes").style.height = "";

  syncOrderForm();
}


/* ==========================================================================
   16. WHATSAPP ORDER MESSAGE
   Formats the customer's selected items and checkout details.
   ========================================================================== */

function buildWhatsAppMessage() {
  const foodTotal = calculateFoodTotal();
  const notes = getInputValue("customer-notes");

  const lines = [
    "Hello " + RESTAURANT_NAME + ",",
    "",
    "I would like to place an order:",
    ""
  ];

  // Add each selected dish and its subtotal.
  cart.forEach((item) => {
    lines.push(
      item.qty +
      " × " +
      item.name +
      " — " +
      formatPrice(item.price * item.qty)
    );
  });

  lines.push("");
  lines.push(
    "Order type: " + ORDER_TYPE_LABELS[orderType]
  );

  lines.push(
    "Name: " + getInputValue("customer-name")
  );

  lines.push(
    "Contact: " + getInputValue("customer-contact")
  );

  // Include the delivery address when Delivery is selected.
  if (orderType === "delivery") {
    lines.push(
      "Delivery area: " + getInputValue("customer-area")
    );

    lines.push(
      "Delivery address: " +
      getInputValue("customer-address")
    );
  }

  // Include additional instructions only when provided.
  if (notes) {
    lines.push("Additional note: " + notes);
  }

  lines.push("");
  lines.push("Food Total: " + formatPrice(foodTotal));

  if (orderType === "delivery") {
    lines.push("Delivery Fee: To be confirmed");

    lines.push(
      "Total: " +
      formatPrice(foodTotal) +
      " + delivery fee to be confirmed"
    );
  } else {
    lines.push("Total: " + formatPrice(foodTotal));
  }

  lines.push("");
  lines.push("Please confirm my order. Thank you.");

  return lines.join("\n");
}


// Open WhatsApp with the prepared order message.
function sendOrderToWhatsApp() {
  if (!isOrderValid()) return;

  const message = buildWhatsAppMessage();

  const whatsappUrl =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  // Open WhatsApp directly from the customer's button click.
  window.open(
    whatsappUrl,
    "_blank",
    "noopener"
  );

  // Preserve the original behavior: clear the cart after opening.
  cart = [];

  refreshCart();
  resetOrderForm();
  closeCart();
}


/* ==========================================================================
   17. CART DRAWER
   Opens and closes the cart panel and its background overlay.
   ========================================================================== */

function openCart() {
  const overlay = $("cart-overlay");
  const drawer = $("cart-drawer");

  overlay.hidden = false;
  drawer.hidden = false;

  document.body.classList.add("cart-open");

  requestAnimationFrame(() => {
    overlay.classList.add("visible");
    drawer.classList.add("open");
  });
}


function closeCart() {
  const overlay = $("cart-overlay");
  const drawer = $("cart-drawer");

  overlay.classList.remove("visible");
  drawer.classList.remove("open");

  document.body.classList.remove("cart-open");

  // Wait for the closing animation before hiding the elements.
  setTimeout(() => {
    overlay.hidden = true;
    drawer.hidden = true;
  }, 250);
}


/* ==========================================================================
   18. EVENT LISTENERS
   Connects page buttons, form fields, and cart controls to their functions.
   ========================================================================== */

function setupEvents() {
  // Add-to-cart buttons in the menu.
  $("menu-content").addEventListener(
    "click",
    handleMenuClick
  );


  // Open and close the cart.
  $("cart-toggle-btn").addEventListener(
    "click",
    openCart
  );

  $("cart-close-btn").addEventListener(
    "click",
    closeCart
  );

  $("cart-overlay").addEventListener(
    "click",
    closeCart
  );

  $("cart-browse-btn").addEventListener(
    "click",
    closeCart
  );


  // Cart actions.
  $("clear-cart-btn").addEventListener(
    "click",
    clearCart
  );

  $("whatsapp-order-btn").addEventListener(
    "click",
    sendOrderToWhatsApp
  );


  // Handle Delivery and Pickup selection.
  $("order-type-options").addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        ".order-type-btn"
      );

      if (!button) return;

      setOrderType(button.dataset.type);
    }
  );


  // Handle quantity changes and item removal.
  $("cart-items").addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "button[data-action]"
      );

      if (!button) return;

      const action = button.dataset.action;
      const key = button.dataset.key;

      if (action === "increase") {
        changeQuantity(key, 1);
      } else if (action === "decrease") {
        changeQuantity(key, -1);
      } else if (action === "remove") {
        removeFromCart(key);
      }
    }
  );


  // Automatically adjust the height of the optional notes field.
  $("customer-notes").addEventListener(
    "input",
    (event) => {
      const textarea = event.target;

      textarea.style.height = "auto";
      textarea.style.height =
        textarea.scrollHeight + "px";
    }
  );


  // Recheck checkout requirements whenever customer fields change.
  $("cart-footer").addEventListener(
    "input",
    updateSendButton
  );

  $("cart-footer").addEventListener(
    "change",
    updateSendButton
  );


  // Allow the Escape key to close the cart drawer.
  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        !$("cart-drawer").hidden
      ) {
        closeCart();
      }
    }
  );
}


/* ==========================================================================
   19. ACTIVE CATEGORY HIGHLIGHT
   Highlights the category currently visible on the page.
   Also scrolls the category navigation to the active button.
   ========================================================================== */

function setupActiveCategoryTracking() {
  const navigation = $("category-nav");

  const navigationBar = document.querySelector(
    ".category-nav"
  );

  if (!navigation || !navigationBar) return;

  const buttons = Array.from(
    document.querySelectorAll(".nav-pill")
  );

  const navigationHeight = navigationBar.offsetHeight;


  // Highlight the selected category button.
  function setActiveCategory(categoryId) {
    buttons.forEach((button) => {
      const isActive =
        button.dataset.target === categoryId;

      button.classList.toggle("active", isActive);

      button.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      // Keep the active button visible in the horizontal navigation.
      if (isActive) {
        navigation.scrollTo({
          left:
            button.offsetLeft -
            navigation.clientWidth / 2 +
            button.offsetWidth / 2,
          behavior: "smooth"
        });
      }
    });
  }


  // Detect when a category enters the visible area.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    },
    {
      rootMargin:
        "-" +
        (navigationHeight + 20) +
        "px 0px -70% 0px",
      threshold: 0
    }
  );


  // Observe each category section.
  MENU_DATA.forEach((category) => {
    const section = $(category.id);

    if (section) {
      observer.observe(section);
    }
  });


  // Highlight the first category when the page loads.
  if (MENU_DATA.length) {
    setActiveCategory(MENU_DATA[0].id);
  }
}


/* ==========================================================================
   20. INITIALIZE THE PAGE
   Runs once the HTML has finished loading.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Create menu content and navigation.
  renderCategoryNavigation();
  renderMenu();

  // Enable active category tracking.
  setupActiveCategoryTracking();

  // Restore the previously saved cart.
  cart = loadCart();

  // Connect buttons and checkout fields.
  setupEvents();

  // Initialize checkout visibility and cart display.
  syncOrderForm();
  refreshCart();

  // Display the current year in the footer.
  $("year").textContent = new Date().getFullYear();
});
