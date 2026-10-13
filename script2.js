/* ==========================================================================
   BARAZA RESTAURANT & CAFE
   Online Ordering Script — index2.html

   1. Render the menu and category navigation.
   2. Handle menu choices such as Fried/BBQ and side dishes.
   3. Manage the cart (saved in localStorage).
   4. Handle Delivery (with area + delivery fee) and Pickup checkout.
   5. Calculate totals and prepare WhatsApp orders.
   6. Open and close the cart drawer.
   ========================================================================== */


/* ==========================================================================
   1. SETTINGS
   ========================================================================== */

const WHATSAPP_NUMBER = "255753423253";
const RESTAURANT_NAME = "Baraza Restaurant & Cafe";
const CART_STORAGE_KEY = "barazaCart";

// Delivery areas. fee: null means "to be confirmed".
const DELIVERY_AREAS = {
  town:     { label: "Town",       fee: 3000 },
  upanga:   { label: "Upanga",     fee: 3000 },
  kariakoo: { label: "Kariakoo",   fee: 3000 },
  other:    { label: "Other area", fee: null }
};


/* ==========================================================================
   2. SHARED MENU OPTIONS
   ========================================================================== */

const SIDES = ["Chips", "Rice", "Noodles", "Naan"];

const SERVED_WITH_SIDES =
  "Served with chips, rice, noodles or naan.";

const ORDER_TYPE_LABELS = {
  delivery: "Delivery",
  pickup: "Pickup"
};

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
   Item format: ["Dish name", price] or ["Dish name", price, requiredOptions]
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
   ========================================================================== */

const $ = (id) => document.getElementById(id);

function formatPrice(amount) {
  return "TSh " + Number(amount).toLocaleString("en-US") + "/=";
}

function getInputValue(id) {
  const input = $(id);
  return input ? input.value.trim() : "";
}

function createElement(tag, className = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  return element;
}

function createTextElement(tag, className, text) {
  const element = createElement(tag, className);
  element.textContent = text;
  return element;
}

// The delivery area chosen in the dropdown (or null if none).
function getDeliveryArea() {
  return DELIVERY_AREAS[getInputValue("customer-area")] || null;
}

// Area text used in the WhatsApp message.
function getAreaText() {
  const area = getDeliveryArea();

  if (!area) return "";

  if (area.fee === null) {
    const typed = getInputValue("customer-other-area");
    return typed ? "Other area: " + typed : "Other area";
  }

  return area.label;
}


/* ==========================================================================
   5. APPLICATION STATE
   ========================================================================== */

// Each cart item: { key, name, price, qty }
let cart = [];

// "delivery", "pickup", or null.
let orderType = null;


/* ==========================================================================
   6. RENDER CATEGORY NAVIGATION
   ========================================================================== */

function renderCategoryNavigation() {
  const navigation = $("category-nav");

  if (!navigation) return;

  navigation.replaceChildren();

  MENU_DATA.forEach((category) => {
    const button = createTextElement("button", "nav-pill", category.name);

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
   ========================================================================== */

function renderMenu() {
  const main = $("menu-content");

  if (!main) return;

  main.replaceChildren();

  MENU_DATA.forEach((category) => {
    const section = createElement("section", "category-section");

    section.id = category.id;
    section.setAttribute("aria-labelledby", category.id + "-heading");

    const heading = createTextElement(
      "h2",
      "category-heading",
      category.name
    );

    heading.id = category.id + "-heading";
    section.appendChild(heading);

    const itemList = createElement("div", "item-list");

    category.items.forEach((item) => {
      itemList.appendChild(createMenuItem(category, item));
    });

    section.appendChild(itemList);
    main.appendChild(section);
  });
}


function createMenuItem(category, item) {
  const card = createElement("article", "menu-item");

  card.dataset.cat = category.id;
  card.dataset.name = item.name;
  card.dataset.price = String(item.price);

  const top = createElement("div", "menu-item-top");
  const info = createElement("div", "menu-item-info");

  info.appendChild(createTextElement("h3", "menu-item-name", item.name));

  if (item.desc) {
    info.appendChild(createTextElement("p", "menu-item-desc", item.desc));
  }

  top.appendChild(info);

  top.appendChild(
    createTextElement("div", "menu-item-price", formatPrice(item.price))
  );

  card.appendChild(top);

  const actions = createElement("div", "menu-item-actions");

  // Dish-specific choices first.
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

  // Side selector when the category requires it.
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

  const addButton = createTextElement("button", "add-cart-btn", "+ Add to Cart");

  addButton.type = "button";
  addButton.setAttribute("aria-label", "Add " + item.name + " to cart");

  actions.appendChild(addButton);
  card.appendChild(actions);

  return card;
}


function createChoiceSelect(
  label,
  values,
  extraClass,
  placeholder,
  itemName,
  isSide = false
) {
  const select = createElement("select", "side-select " + extraClass);

  select.setAttribute(
    "aria-label",
    (isSide ? "Choose a side for " : label + " for ") + itemName
  );

  const prompt = createTextElement("option", "", placeholder);

  prompt.value = "";
  select.appendChild(prompt);

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
   ========================================================================== */

function handleMenuClick(event) {
  const button = event.target.closest(".add-cart-btn");

  if (!button) return;

  const card = button.closest(".menu-item");

  if (!card) return;

  const optionSelects = Array.from(card.querySelectorAll(".opt-select"));
  const sideSelect = card.querySelector(".side-pick");

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

  let selectedName = card.dataset.name;

  if (optionSelects.length) {
    const choices = optionSelects.map((select) => select.value).join(", ");
    selectedName += " (" + choices + ")";
  }

  if (sideSelect) {
    selectedName += " with " + sideSelect.value;
  }

  const categoryId = card.dataset.cat;
  const price = Number(card.dataset.price);
  const cartKey = categoryId + "::" + selectedName;

  addToCart(cartKey, selectedName, price);

  // Reset choices for the next selection.
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
   ========================================================================== */

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

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
    return [];
  }
}


function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    // Storage unavailable; the in-memory cart still works.
  }
}


/* ==========================================================================
   10. CART OPERATIONS
   ========================================================================== */

function addToCart(key, name, price) {
  const existingItem = cart.find((item) => item.key === key);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ key, name, price, qty: 1 });
  }

  refreshCart();
}


function changeQuantity(key, amount) {
  const item = cart.find((cartItem) => cartItem.key === key);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter((cartItem) => cartItem.key !== key);
  }

  refreshCart();
}


function removeFromCart(key) {
  cart = cart.filter((item) => item.key !== key);
  refreshCart();
}


function clearCart() {
  if (!cart.length) return;

  const confirmed = window.confirm("Are you sure you want to clear your cart?");

  if (!confirmed) return;

  cart = [];
  refreshCart();
}


/* ==========================================================================
   11. CART CALCULATIONS
   ========================================================================== */

function calculateFoodTotal() {
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

function calculateCartCount() {
  return cart.reduce((total, item) => total + item.qty, 0);
}


/* ==========================================================================
   12. REFRESH THE CART
   ========================================================================== */

function refreshCart() {
  saveCart();
  renderCartItems();
  renderTotals();
  updateCartCount();
  updateSendButton();
}


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
      "Open cart, " + count + (count === 1 ? " item" : " items")
    );
  }
}


/* ==========================================================================
   13. RENDER CART ITEMS
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
    itemsContainer.appendChild(createCartItem(item));
  });
}


function createCartItem(item) {
  const row = createElement("div", "cart-item");

  const info = createElement("div", "cart-item-info");

  info.appendChild(createTextElement("p", "cart-item-name", item.name));

  info.appendChild(
    createTextElement(
      "p",
      "cart-item-unit-price",
      formatPrice(item.price) + " each"
    )
  );

  row.appendChild(info);

  const controls = createElement("div", "cart-item-controls");
  const quantityControls = createElement("div", "cart-qty");

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

  controls.appendChild(
    createTextElement(
      "p",
      "cart-item-subtotal",
      formatPrice(item.price * item.qty)
    )
  );

  const removeButton = createTextElement("button", "cart-remove-btn", "Remove");

  removeButton.type = "button";
  removeButton.dataset.action = "remove";
  removeButton.dataset.key = item.key;

  removeButton.setAttribute("aria-label", "Remove " + item.name + " from cart");

  controls.appendChild(removeButton);
  row.appendChild(controls);

  return row;
}


function createQuantityButton(label, action, item, accessibleLabel) {
  const button = createTextElement("button", "cart-qty-btn", label);

  button.type = "button";
  button.dataset.action = action;
  button.dataset.key = item.key;

  button.setAttribute("aria-label", accessibleLabel);

  return button;
}


/* ==========================================================================
   14. PRICE TOTALS
   Food Total + Delivery Fee = Total.
   Town / Upanga / Kariakoo = TSh 3,000. Other area = to be confirmed.
   ========================================================================== */

function renderTotals() {
  const foodTotal = calculateFoodTotal();
  const isDelivery = orderType === "delivery";
  const area = isDelivery ? getDeliveryArea() : null;

  let feeText = "Select your area";
  let totalText = formatPrice(foodTotal);

  if (area && area.fee !== null) {
    // Fixed fee: add it to the food total.
    feeText = formatPrice(area.fee);
    totalText = formatPrice(foodTotal + area.fee);
  } else if (area) {
    // Other area: fee to be confirmed.
    feeText = "To be confirmed";
    totalText = formatPrice(foodTotal) + " + fee";
  }

  $("cart-food-total-value").textContent = formatPrice(foodTotal);
  $("cart-delivery-line").hidden = !isDelivery;
  $("cart-delivery-fee-value").textContent = feeText;
  $("cart-total-value").textContent = totalText;
}


/* ==========================================================================
   15. DELIVERY / PICKUP CHECKOUT
   ========================================================================== */

function setOrderType(type) {
  if (!ORDER_TYPE_LABELS[type]) return;

  orderType = type;

  syncOrderForm();
}


// Show or hide fields based on the order type and chosen area.
function syncOrderForm() {
  const selectedType = orderType;

  $("cart-customer-fields").hidden = !selectedType;
  $("order-type-hint").hidden = Boolean(selectedType);

  $("delivery-fields").hidden = selectedType !== "delivery";

  // "Type your area" box appears only for Other area.
  const area = getDeliveryArea();

  $("customer-other-area").hidden = !(
    selectedType === "delivery" &&
    area &&
    area.fee === null
  );

  document.querySelectorAll(".order-type-btn").forEach((button) => {
    const isSelected = button.dataset.type === selectedType;

    button.classList.toggle("active", isSelected);

    button.setAttribute("aria-checked", isSelected ? "true" : "false");
  });

  renderTotals();
  updateSendButton();
}


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
    const area = getDeliveryArea();

    if (!area || !getInputValue("customer-address")) return false;

    if (area.fee === null && !getInputValue("customer-other-area")) {
      return false;
    }

    return true;
  }

  return orderType === "pickup";
}


function updateSendButton() {
  const button = $("whatsapp-order-btn");

  if (button) {
    button.disabled = !isOrderValid();
  }
}


function resetOrderForm() {
  orderType = null;

  [
    "customer-name",
    "customer-contact",
    "customer-area",
    "customer-other-area",
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
   ========================================================================== */

function buildWhatsAppMessage() {
  const foodTotal = calculateFoodTotal();
  const notes = getInputValue("customer-notes");
  const area = getDeliveryArea();

  const lines = [
    "Hello " + RESTAURANT_NAME + ",",
    "",
    "I would like to place an order:",
    ""
  ];

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
  lines.push("Order type: " + ORDER_TYPE_LABELS[orderType]);
  lines.push("Name: " + getInputValue("customer-name"));
  lines.push("Contact: " + getInputValue("customer-contact"));

  if (orderType === "delivery") {
    lines.push("Delivery area: " + getAreaText());
    lines.push("Delivery address: " + getInputValue("customer-address"));
  }

  if (notes) {
    lines.push("Additional note: " + notes);
  }

  lines.push("");
  lines.push("Food Total: " + formatPrice(foodTotal));

  if (orderType === "delivery" && area && area.fee !== null) {
    lines.push("Delivery Fee: " + formatPrice(area.fee));
    lines.push("Total: " + formatPrice(foodTotal + area.fee));
  } else if (orderType === "delivery") {
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


function sendOrderToWhatsApp() {
  if (!isOrderValid()) return;

  const message = buildWhatsAppMessage();

  const whatsappUrl =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappUrl, "_blank", "noopener");

  // Clear the cart after opening WhatsApp.
  cart = [];

  refreshCart();
  resetOrderForm();
  closeCart();
}


/* ==========================================================================
   17. CART DRAWER
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

  setTimeout(() => {
    overlay.hidden = true;
    drawer.hidden = true;
  }, 250);
}


/* ==========================================================================
   18. EVENT LISTENERS
   ========================================================================== */

function setupEvents() {
  $("menu-content").addEventListener("click", handleMenuClick);

  $("cart-toggle-btn").addEventListener("click", openCart);
  $("cart-close-btn").addEventListener("click", closeCart);
  $("cart-overlay").addEventListener("click", closeCart);
  $("cart-browse-btn").addEventListener("click", closeCart);

  $("clear-cart-btn").addEventListener("click", clearCart);
  $("whatsapp-order-btn").addEventListener("click", sendOrderToWhatsApp);

  // Delivery / Pickup selection.
  $("order-type-options").addEventListener("click", (event) => {
    const button = event.target.closest(".order-type-btn");

    if (!button) return;

    setOrderType(button.dataset.type);
  });

  // Area dropdown: update the delivery fee, total and "type your area" box.
  $("customer-area").addEventListener("change", syncOrderForm);

  // Quantity changes and item removal.
  $("cart-items").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

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
  });

  // Auto-grow the notes field.
  $("customer-notes").addEventListener("input", (event) => {
    const textarea = event.target;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });

  // Recheck checkout requirements whenever fields change.
  $("cart-footer").addEventListener("input", updateSendButton);
  $("cart-footer").addEventListener("change", updateSendButton);

  // Escape closes the cart.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("cart-drawer").hidden) {
      closeCart();
    }
  });
}


/* ==========================================================================
   19. ACTIVE CATEGORY HIGHLIGHT
   ========================================================================== */

function setupActiveCategoryTracking() {
  const navigation = $("category-nav");
  const navigationBar = document.querySelector(".category-nav");

  if (!navigation || !navigationBar) return;

  const buttons = Array.from(document.querySelectorAll(".nav-pill"));
  const navigationHeight = navigationBar.offsetHeight;

  function setActiveCategory(categoryId) {
    buttons.forEach((button) => {
      const isActive = button.dataset.target === categoryId;

      button.classList.toggle("active", isActive);

      button.setAttribute("aria-selected", isActive ? "true" : "false");

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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-" + (navigationHeight + 20) + "px 0px -70% 0px",
      threshold: 0
    }
  );

  MENU_DATA.forEach((category) => {
    const section = $(category.id);

    if (section) {
      observer.observe(section);
    }
  });

  if (MENU_DATA.length) {
    setActiveCategory(MENU_DATA[0].id);
  }
}


/* ==========================================================================
   20. INITIALIZE THE PAGE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryNavigation();
  renderMenu();

  setupActiveCategoryTracking();

  cart = loadCart();

  setupEvents();

  syncOrderForm();
  refreshCart();

  $("year").textContent = new Date().getFullYear();
});
