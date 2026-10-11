
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
    items: [
      { name: "BBQ Chicken Wings", price: 15000 },
      { name: "Poussin Chicken Wings", price: 15000 },
      { name: "Chicken Kebab", price: 15000 },
      { name: "Chicken Malai Boti (5 Sticks)", price: 15000 },
      { name: "Chicken Lollipop", price: 15000 },
      { name: "Beef Seekh Kebab", price: 12000 },
      { name: "Beef Mishkaki", price: 12000 },
      { name: "BBQ Nundu", price: 12000 },
      { name: "Maini", price: 10000 },
      { name: "Masala Paneer", price: 14000 },
      { name: "Paneer Tikka", price: 14000 },
      { name: "Mutton Mishkaki", price: 15000 },
      { name: "Mutton Chops", price: 15000 },
      { name: "Chicken Tikka Boti (5 Sticks)", price: 15000 },
      { name: "Chilli Chicken", price: 18000 },
      { name: "Crispy Chicken", price: 18000 },
      { name: "Chicken Manchurian", price: 18000 },
      { name: "Hot Garlic Prawns", price: 22000 },
      { name: "Chilli Paneer", price: 14000 }
    ]
  },
  {
    id: "kuku-nusu",
    name: "Kuku Nusu",
    items: [
      { name: "Sekela Chicken", price: 10000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Gajjar Chicken", price: 10000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Lemon Chicken", price: 10000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Choma Chicken", price: 10000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Schezwan Chicken", price: 15000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Extra Hot Chicken", price: 15000, desc: "Served with chips, rice, noodles or naan." }
    ]
  },
  {
    id: "chicken-mzinga",
    name: "Chicken Mzinga",
    items: [
      { name: "Pilipili Chicken (Fried or BBQ)", price: 24000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Peri-Peri Chicken (Fried or BBQ)", price: 24000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Crunchy Chicken (Fried)", price: 24000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Chicken Poussin (Fried)", price: 24000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Chilly Milly", price: 26000, desc: "Served with chips, rice, noodles or naan." }
    ]
  },
  {
    id: "seafood",
    name: "Seafood",
    items: [
      { name: "Fish Boti (4 Sticks Per Plate)", price: 18000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Fish Fillet (Fried or BBQ)", price: 24000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Masala Prawns (Fried or BBQ)", price: 24000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Garlic Butter Prawns (Fried or BBQ)", price: 24000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Garlic Butter Fish (Fried)", price: 24000, desc: "Served with chips, rice, noodles or naan." },
      { name: "Schezwan Prawns (Fried)", price: 24000, desc: "Served with chips, rice, noodles or naan." }
    ]
  },
  {
    id: "chips",
    name: "Chips",
    items: [
      { name: "Plain Chips", price: 4000 },
      { name: "Masala Chips", price: 5000 },
      { name: "Garlic Chips", price: 6000 },
      { name: "Schezwan Chips", price: 6000 },
      { name: "Poussin Chips", price: 6000 },
      { name: "Baraza Special Chips", price: 8000 }
    ]
  },
  {
    id: "naan",
    name: "Naan",
    items: [
      { name: "Plain Naan", price: 2000 },
      { name: "Butter Naan", price: 3000 },
      { name: "Garlic Naan", price: 3000 },
      { name: "Chilly Naan", price: 3000 }
    ]
  },
  {
    id: "noodles",
    name: "Noodles",
    items: [
      { name: "Veg Hakka Noodles", price: 7000 },
      { name: "Chicken Hakka Noodles", price: 12000 },
      { name: "Beef Hakka Noodles", price: 10000 },
      { name: "Prawns Hakka Noodles", price: 17000 },
      { name: "Fish Hakka Noodles", price: 15000 }
    ]
  },
  {
    id: "rice",
    name: "Rice",
    items: [
      { name: "Steamed Rice", price: 5000 },
      { name: "Jeera Rice", price: 7000 },
      { name: "Vegetable Fried Rice", price: 8000 },
      { name: "Chicken Fried Rice", price: 12000 },
      { name: "Beef Fried Rice", price: 10000 },
      { name: "Prawns Fried Rice", price: 15000 },
      { name: "Fish Fried Rice", price: 13000 },
      { name: "Schezwan Fried Rice (Chicken, Beef or Veg)", price: 10000 }
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    items: [
      { name: "Small Water", price: 1000 },
      { name: "Big Water", price: 3000 },
      { name: "Seasonal Fresh Juice", price: 5000 },
      { name: "Soda", price: 3000 },
      { name: "Milkshake", price: 10000 },
      { name: "Mojito", price: 10000 }
    ]
  }
];

/* ---------- Helpers ---------- */

function formatPrice(n) {
  return "TSh " + n.toLocaleString("en-US") + "/=";
}

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

/* ---------- Render category navigation ---------- */

function renderNav() {
  const nav = document.getElementById("category-nav");
  MENU_DATA.forEach((cat) => {
    const btn = el("button", "nav-pill");
    btn.type = "button";
    btn.textContent = cat.name;
    btn.dataset.target = cat.id;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "false");
    btn.addEventListener("click", () => {
      const target = document.getElementById(cat.id);
      if (!target) return;
      const headerOffset = document.querySelector(".category-nav").offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
    nav.appendChild(btn);
  });
}

/* ---------- Render menu sections ---------- */

function renderMenu() {
  const main = document.getElementById("menu-content");

  MENU_DATA.forEach((cat) => {
    const section = el("section", "category-section");
    section.id = cat.id;
    section.setAttribute("aria-labelledby", cat.id + "-heading");

    const heading = el("h2", "category-heading");
    heading.id = cat.id + "-heading";
    heading.textContent = cat.name;
    section.appendChild(heading);

    if (cat.note) {
      section.appendChild(el("p", "category-note", cat.note));
    }

    const list = el("div", "item-list");

    cat.items.forEach((item) => {
      const row = el("article", "menu-item");

      const info = el("div", "menu-item-info");
      info.appendChild(el("h3", "menu-item-name", item.name));
      if (item.desc) {
        info.appendChild(el("p", "menu-item-desc", item.desc));
      }
      row.appendChild(info);

      if (cat.sizeLabels) {
        const priceWrap = el("div", "menu-item-price menu-item-price--dual");
        const small = el("div", "price-option");
        small.innerHTML =
          '<span class="price-option-label">' +
          cat.sizeLabels[0] +
          '</span><span class="price-option-value">' +
          formatPrice(item.small) +
          "</span>";
        const large = el("div", "price-option");
        large.innerHTML =
          '<span class="price-option-label">' +
          cat.sizeLabels[1] +
          '</span><span class="price-option-value">' +
          formatPrice(item.large) +
          "</span>";
        priceWrap.appendChild(small);
        priceWrap.appendChild(large);
        row.appendChild(priceWrap);
      } else {
        const price = el("div", "menu-item-price", formatPrice(item.price));
        row.appendChild(price);
      }

      list.appendChild(row);
    });

    section.appendChild(list);
    main.appendChild(section);
  });
}

/* ---------- Active category highlighting on scroll ---------- */

function setupActiveTracking() {
  const pills = Array.from(document.querySelectorAll(".nav-pill"));
  const sections = MENU_DATA.map((c) => document.getElementById(c.id));
  const navEl = document.querySelector(".category-nav");

  function setActive(id) {
    pills.forEach((p) => {
      const isActive = p.dataset.target === id;
      p.classList.toggle("active", isActive);
      p.setAttribute("aria-selected", isActive ? "true" : "false");
      if (isActive) {
        p.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: `-${navEl.offsetHeight + 20}px 0px -70% 0px`,
      threshold: 0,
    }
  );

  sections.forEach((s) => s && observer.observe(s));

  // Set initial active state
  if (sections[0]) setActive(sections[0].id);
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderMenu();
  setupActiveTracking();

  document.getElementById("year").textContent = new Date().getFullYear();
});
