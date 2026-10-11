/* ==========================================================================
   BARAZA RESTAURANT & CAFE — ORDER PAGE SCRIPT (index2.html)
   Menu + choices (Fried/BBQ, side) + cart + Delivery / Pickup + WhatsApp order
   ========================================================================== */

/* ---------- Settings (edit here) ---------- */

const WHATSAPP_NUMBER = "255789100555";
const RESTAURANT_NAME = "Baraza Restaurant & Cafe";
const CART_STORAGE_KEY = "barazaCart";

/* Sides offered for dishes "served with chips, rice, noodles or naan" */
const SIDES = ["Chips", "Rice", "Noodles", "Naan"];
const SERVED = "Served with chips, rice, noodles or naan.";

/* Delivery: the customer types their area and address; the fee is confirmed on WhatsApp. */

const TYPE_LABELS = {
  delivery: "Delivery",
  pickup: "Pickup"
};

/* ---------- Menu data ---------- */
/* sides: true  -> customer must choose a side before adding to cart */

/* A row can have a 3rd value: choices the customer must make BEFORE the side
   (e.g. Fried or BBQ). Each choice shows as its own dropdown. */
const FRIED_BBQ = [{ label: "Fried or BBQ", values: ["Fried", "BBQ"] }];
const PROTEIN = [{ label: "Chicken, Beef or Veg", values: ["Chicken", "Beef", "Veg"] }];

const list = (rows, desc) => rows.map(([name, price, opts]) => ({ name, price, desc, opts }));

const MENU_DATA = [
  {
    id: "bbq-combos",
    name: "BBQ Combos",
    items: [
      {
        name: "BBQ Buffet",
        price: 30000,
        desc: "Includes Chicken Sekela, Chicken Malai Boti, Chicken Sausages on weekdays, Chicken Lollipops on weekends, Chicken Gizzards, Beef Nundu, Beef Mishkaki, Beef Maini, Mutton Chops, Mutton and Beef Seekh Kebabs, Mutton Mishkaki, Paneer Tikka, BBQ Pineapple, BBQ Corn, Ndizi Choma, Veg Fried Rice, Veg Hakka Noodles, Butter Naan, Plain and Masala Chips, salads and assorted sauces. Subject to availability."
      },
      {
        name: "Singles Platter",
        price: 24000,
        desc: "2 sticks Mishkaki, 2 sticks Nundu, 1 stick Malai Boti, 2 pieces Chicken Lollipop, 1/4 chicken, 1 piece Mutton Chop, 1 Naan and 1 Chips."
      }
    ]
  },
  {
    id: "starters",
    name: "Starters",
    items: list([
      ["BBQ Chicken Wings", 15000], ["Poussin Chicken Wings", 15000], ["Chicken Kebab", 15000],
      ["Chicken Malai Boti (5 Sticks)", 15000], ["Chicken Lollipop", 15000], ["Beef Seekh Kebab", 12000],
      ["Beef Mishkaki", 12000], ["BBQ Nundu", 12000], ["Maini", 10000], ["Masala Paneer", 14000],
      ["Paneer Tikka", 14000], ["Mutton Mishkaki", 15000], ["Mutton Chops", 15000],
      ["Chicken Tikka Boti (5 Sticks)", 15000], ["Chilli Chicken", 18000], ["Crispy Chicken", 18000],
      ["Chicken Manchurian", 18000], ["Hot Garlic Prawns", 22000], ["Chilli Paneer", 14000]
    ])
  },
  {
    id: "kuku-nusu",
    name: "Kuku Nusu",
    sides: true,
    items: list([
      ["Sekela Chicken", 10000], ["Gajjar Chicken", 10000], ["Lemon Chicken", 10000],
      ["Choma Chicken", 10000], ["Schezwan Chicken", 15000], ["Extra Hot Chicken", 15000]
    ], SERVED)
  },
  {
    id: "chicken-mzinga",
    name: "Chicken Mzinga",
    sides: true,
    items: list([
      ["Pilipili Chicken", 24000, FRIED_BBQ], ["Peri-Peri Chicken", 24000, FRIED_BBQ],
      ["Crunchy Chicken (Fried)", 24000], ["Chicken Poussin (Fried)", 24000], ["Chilly Milly", 26000]
    ], SERVED)
  },
  {
    id: "seafood",
    name: "Seafood",
    sides: true,
    items: list([
      ["Fish Boti (4 Sticks Per Plate)", 18000], ["Fish Fillet", 24000, FRIED_BBQ],
      ["Masala Prawns", 24000, FRIED_BBQ], ["Garlic Butter Prawns", 24000, FRIED_BBQ],
      ["Garlic Butter Fish (Fried)", 24000], ["Schezwan Prawns (Fried)", 24000]
    ], SERVED)
  },
  {
    id: "chips",
    name: "Chips",
    items: list([
      ["Plain Chips", 4000], ["Masala Chips", 5000], ["Garlic Chips", 6000],
      ["Schezwan Chips", 6000], ["Poussin Chips", 6000], ["Baraza Special Chips", 8000]
    ])
  },
  {
    id: "naan",
    name: "Naan",
    items: list([["Plain Naan", 2000], ["Butter Naan", 3000], ["Garlic Naan", 3000], ["Chilly Naan", 3000]])
  },
  {
    id: "noodles",
    name: "Noodles",
    items: list([
      ["Veg Hakka Noodles", 7000], ["Chicken Hakka Noodles", 12000], ["Beef Hakka Noodles", 10000],
      ["Prawns Hakka Noodles", 17000], ["Fish Hakka Noodles", 15000]
    ])
  },
  {
    id: "rice",
    name: "Rice",
    items: list([
      ["Steamed Rice", 5000], ["Jeera Rice", 7000], ["Vegetable Fried Rice", 8000],
      ["Chicken Fried Rice", 12000], ["Beef Fried Rice", 10000], ["Prawns Fried Rice", 15000],
      ["Fish Fried Rice", 13000], ["Schezwan Fried Rice", 10000, PROTEIN]
    ])
  },
  {
    id: "drinks",
    name: "Drinks",
    items: list([
      ["Small Water", 1000], ["Big Water", 3000], ["Seasonal Fresh Juice", 5000],
      ["Soda", 3000], ["Milkshake", 10000], ["Mojito", 10000]
    ])
  }
];

/* ---------- Helpers ---------- */

const $ = (id) => document.getElementById(id);
const fmt = (n) => "TSh " + Number(n).toLocaleString("en-US") + "/=";
const val = (id) => ($(id) ? $(id).value.trim() : "");

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

let cart = [];
let orderType = null; /* "delivery" | "pickup" | null */

/* ==========================================================================
   MENU RENDERING
   ========================================================================== */

function renderNav() {
  const nav = $("category-nav");
  MENU_DATA.forEach((cat) => {
    const btn = el("button", "nav-pill");
    btn.type = "button";
    btn.textContent = cat.name;
    btn.dataset.target = cat.id;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "false");
    btn.addEventListener("click", () => {
      const target = $(cat.id);
      if (!target) return;
      const offset = document.querySelector(".category-nav").offsetHeight + 12;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    });
    nav.appendChild(btn);
  });
}

function renderMenu() {
  const main = $("menu-content");

  MENU_DATA.forEach((cat) => {
    const section = el("section", "category-section");
    section.id = cat.id;
    section.setAttribute("aria-labelledby", cat.id + "-heading");

    const heading = el("h2", "category-heading");
    heading.id = cat.id + "-heading";
    heading.textContent = cat.name;
    section.appendChild(heading);

    const listEl = el("div", "item-list");

    cat.items.forEach((item) => {
      const row = el("article", "menu-item");
      row.dataset.cat = cat.id;
      row.dataset.name = item.name;
      row.dataset.price = item.price;

      /* top row: name, description, price */
      const top = el("div", "menu-item-top");
      const info = el("div", "menu-item-info");
      info.appendChild(el("h3", "menu-item-name", item.name));
      if (item.desc) info.appendChild(el("p", "menu-item-desc", item.desc));
      top.appendChild(info);
      top.appendChild(el("div", "menu-item-price", fmt(item.price)));
      row.appendChild(top);

      /* actions row: side choice (if needed) + add button */
      const actions = el("div", "menu-item-actions");

      /* 1) choices first (Fried or BBQ / Chicken, Beef or Veg) */
      (item.opts || []).forEach((opt) => {
        const select = el("select", "side-select opt-select");
        select.setAttribute("aria-label", opt.label + " for " + item.name);
        select.innerHTML =
          '<option value="">Choose: ' + opt.label + " *</option>" +
          opt.values.map((v) => '<option value="' + v + '">' + v + "</option>").join("");
        select.addEventListener("change", () => select.classList.remove("needs-side"));
        actions.appendChild(select);
      });

      /* 2) then the side */
      if (cat.sides) {
        const select = el("select", "side-select side-pick");
        select.setAttribute("aria-label", "Choose a side for " + item.name);
        select.innerHTML =
          '<option value="">Choose your side *</option>' +
          SIDES.map((s) => '<option value="' + s + '">with ' + s + "</option>").join("");
        select.addEventListener("change", () => select.classList.remove("needs-side"));
        actions.appendChild(select);
      }

      const btn = el("button", "add-cart-btn", "+ Add to Cart");
      btn.type = "button";
      btn.setAttribute("aria-label", "Add " + item.name + " to cart");
      actions.appendChild(btn);

      row.appendChild(actions);
      listEl.appendChild(row);
    });

    section.appendChild(listEl);
    main.appendChild(section);
  });
}

/* Add-to-cart clicks (one listener for the whole menu) */
function handleMenuClick(e) {
  const btn = e.target.closest(".add-cart-btn");
  if (!btn) return;

  const row = btn.closest(".menu-item");
  const optSelects = Array.from(row.querySelectorAll(".opt-select"));
  const sideSelect = row.querySelector(".side-pick");

  /* every choice is required, in order: options first, then side */
  const missing = optSelects.concat(sideSelect ? [sideSelect] : []).find((s) => !s.value);
  if (missing) {
    missing.classList.add("needs-side");
    missing.focus();
    return;
  }

  let name = row.dataset.name;
  if (optSelects.length) name += " (" + optSelects.map((s) => s.value).join(", ") + ")";
  if (sideSelect) name += " with " + sideSelect.value;

  addToCart(row.dataset.cat + "::" + name, name, Number(row.dataset.price));

  /* auto-refresh: clear all choices so the customer can pick again */
  row.querySelectorAll("select").forEach((s) => { s.selectedIndex = 0; });

  btn.classList.add("added");
  btn.textContent = "Added ✓";
  setTimeout(() => {
    btn.classList.remove("added");
    btn.textContent = "+ Add to Cart";
  }, 900);
}

/* ==========================================================================
   CART
   ========================================================================== */

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((i) => i && typeof i.key === "string" && typeof i.name === "string" &&
      typeof i.price === "number" && typeof i.qty === "number" && i.qty > 0);
  } catch (err) {
    return [];
  }
}

function saveCart() {
  try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch (err) { /* cart still works this session */ }
}

function addToCart(key, name, price) {
  const existing = cart.find((i) => i.key === key);
  if (existing) existing.qty += 1;
  else cart.push({ key, name, price, qty: 1 });
  refreshCart();
}

function changeQty(key, delta) {
  const item = cart.find((i) => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.key !== key);
  refreshCart();
}

function removeFromCart(key) {
  cart = cart.filter((i) => i.key !== key);
  refreshCart();
}

function clearCart() {
  if (!cart.length) return;
  if (!window.confirm("Are you sure you want to clear your cart?")) return;
  cart = [];
  refreshCart();
}

const foodTotal = () => cart.reduce((sum, i) => sum + i.price * i.qty, 0);
const cartCount = () => cart.reduce((sum, i) => sum + i.qty, 0);

/* ---------- Rendering ---------- */

function refreshCart() {
  saveCart();
  renderCartItems();
  renderTotals();
  updateSendButton();

  const count = cartCount();
  $("cart-count").textContent = count;
  $("cart-toggle-btn").setAttribute("aria-label", "Open cart, " + count + (count === 1 ? " item" : " items"));
}

function renderCartItems() {
  const itemsWrap = $("cart-items");
  itemsWrap.innerHTML = "";

  const empty = cart.length === 0;
  itemsWrap.hidden = empty;
  $("cart-footer").hidden = empty;
  $("cart-empty").hidden = !empty;
  if (empty) return;

  cart.forEach((item) => {
    const row = el("div", "cart-item");
    row.innerHTML =
      '<div class="cart-item-info">' +
        '<p class="cart-item-name">' + item.name + "</p>" +
        '<p class="cart-item-unit-price">' + fmt(item.price) + " each</p>" +
      "</div>" +
      '<div class="cart-item-controls">' +
        '<div class="cart-qty">' +
          '<button type="button" class="cart-qty-btn" data-action="decrease" data-key="' + item.key + '" aria-label="Decrease quantity of ' + item.name + '">−</button>' +
          '<span class="cart-qty-value" aria-live="polite">' + item.qty + "</span>" +
          '<button type="button" class="cart-qty-btn" data-action="increase" data-key="' + item.key + '" aria-label="Increase quantity of ' + item.name + '">+</button>' +
        "</div>" +
        '<p class="cart-item-subtotal">' + fmt(item.price * item.qty) + "</p>" +
        '<button type="button" class="cart-remove-btn" data-action="remove" data-key="' + item.key + '" aria-label="Remove ' + item.name + ' from cart">Remove</button>' +
      "</div>";
    itemsWrap.appendChild(row);
  });
}

function renderTotals() {
  const food = foodTotal();
  const delivery = orderType === "delivery";

  $("cart-food-total-value").textContent = fmt(food);
  $("cart-delivery-line").hidden = !delivery;
  $("cart-delivery-fee-value").textContent = "To be confirmed";
  $("cart-total-value").textContent = delivery ? fmt(food) + " + fee" : fmt(food);
}

/* ==========================================================================
   ORDER FORM: Delivery / Pickup
   ========================================================================== */

function setOrderType(type) {
  if (!TYPE_LABELS[type]) return;
  orderType = type;
  syncForm();
}

/* Shows only the fields that belong to the chosen order type */
function syncForm() {
  const t = orderType;

  $("cart-customer-fields").hidden = !t;
  $("order-type-hint").hidden = !!t;
  $("delivery-fields").hidden = t !== "delivery";

  document.querySelectorAll(".order-type-btn").forEach((b) => {
    const on = b.dataset.type === t;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", on ? "true" : "false");
  });

  renderTotals();
  updateSendButton();
}

function isOrderValid() {
  if (!cart.length || !orderType) return false;
  if (!val("customer-name") || !val("customer-contact")) return false;

  if (orderType === "delivery") return !!val("customer-area") && !!val("customer-address");

  return true; /* pickup */
}

function updateSendButton() {
  $("whatsapp-order-btn").disabled = !isOrderValid();
}

function resetOrderForm() {
  orderType = null;
  ["customer-name", "customer-contact",
   "customer-area", "customer-address", "customer-notes"].forEach((id) => { $(id).value = ""; });
  $("customer-notes").style.height = "";
  syncForm();
}

/* ==========================================================================
   WHATSAPP ORDER
   ========================================================================== */

function sendOrderToWhatsApp() {
  if (!isOrderValid()) return;

  const food = foodTotal();
  const notes = val("customer-notes");

  const lines = [
    "Hello " + RESTAURANT_NAME + ",",
    "",
    "I would like to place an order:",
    ""
  ];

  cart.forEach((item) => {
    lines.push(item.qty + " × " + item.name + " — " + fmt(item.price * item.qty));
  });

  lines.push("");
  lines.push("Order type: " + TYPE_LABELS[orderType]);
  lines.push("Name: " + val("customer-name"));
  lines.push("Contact: " + val("customer-contact"));

  if (orderType === "delivery") {
    lines.push("Delivery area: " + val("customer-area"));
    lines.push("Delivery address: " + val("customer-address"));
  }

  if (notes) lines.push("Additional note: " + notes);

  lines.push("");
  lines.push("Food Total: " + fmt(food));

  if (orderType === "delivery") {
    lines.push("Delivery Fee: To be confirmed");
    lines.push("Total: " + fmt(food) + " + delivery fee to be confirmed");
  } else {
    lines.push("Total: " + fmt(food));
  }

  lines.push("");
  lines.push("Please confirm my order. Thank you.");

  window.open(
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")),
    "_blank",
    "noopener"
  );

  cart = [];
  refreshCart();
  resetOrderForm();
  closeCart();
}

/* ==========================================================================
   DRAWER OPEN / CLOSE
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
   EVENTS
   ========================================================================== */

function setupEvents() {
  $("menu-content").addEventListener("click", handleMenuClick);

  $("cart-toggle-btn").addEventListener("click", openCart);
  $("cart-close-btn").addEventListener("click", closeCart);
  $("cart-overlay").addEventListener("click", closeCart);
  $("cart-browse-btn").addEventListener("click", closeCart);
  $("clear-cart-btn").addEventListener("click", clearCart);
  $("whatsapp-order-btn").addEventListener("click", sendOrderToWhatsApp);

  $("order-type-options").addEventListener("click", (e) => {
    const btn = e.target.closest(".order-type-btn");
    if (btn) setOrderType(btn.dataset.type);
  });

  /* quantity / remove buttons inside the cart */
  $("cart-items").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const { action, key } = btn.dataset;
    if (action === "increase") changeQty(key, 1);
    else if (action === "decrease") changeQty(key, -1);
    else if (action === "remove") removeFromCart(key);
  });

  /* additional note grows by itself as the customer types (no manual resizing) */
  $("customer-notes").addEventListener("input", (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  });

  /* any change in the form re-checks the required fields */
  $("cart-footer").addEventListener("input", updateSendButton);
  $("cart-footer").addEventListener("change", () => {
    syncForm(); /* e.g. "Other Area" shows its extra field */
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("cart-drawer").hidden) closeCart();
  });
}

/* ==========================================================================
   ACTIVE CATEGORY HIGHLIGHT (scrolls only the category bar, not the page)
   ========================================================================== */

function setupActiveTracking() {
  const nav = $("category-nav");
  const pills = Array.from(document.querySelectorAll(".nav-pill"));
  const navHeight = document.querySelector(".category-nav").offsetHeight;

  function setActive(id) {
    pills.forEach((p) => {
      const active = p.dataset.target === id;
      p.classList.toggle("active", active);
      p.setAttribute("aria-selected", active ? "true" : "false");
      if (active) {
        nav.scrollTo({
          left: p.offsetLeft - nav.clientWidth / 2 + p.offsetWidth / 2,
          behavior: "smooth"
        });
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: "-" + (navHeight + 20) + "px 0px -70% 0px", threshold: 0 });

  MENU_DATA.forEach((c) => { const s = $(c.id); if (s) observer.observe(s); });
  setActive(MENU_DATA[0].id);
}

/* ==========================================================================
   INIT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderMenu();
  setupActiveTracking();

  cart = loadCart();
  setupEvents();
  syncForm();
  refreshCart();

  $("year").textContent = new Date().getFullYear();
});
