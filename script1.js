
/* ==========================================================================
   BARAZA RESTAURANT & CAFE — DIGITAL MENU
   File: script1.js

   PURPOSE:
   1. Store menu categories, meal names, descriptions, and prices.
   2. Generate the category navigation buttons.
   3. Display menu categories and items on the page.
   4. Highlight the active category while scrolling.
   5. Automatically update the footer copyright year.

   RELATED FILES:
   - index1.html: Digital menu page
   - style.css: Shared website styles
   - style1.css: Digital menu styles

   HOW TO UPDATE THE MENU:
   Edit MENU_DATA below. Keep category IDs unique and consistent.
   ========================================================================== */


/* ==========================================================================
   1. MENU DATA
   This is the main source of menu content.

   Each category contains:
   - id: Unique identifier used for navigation.
   - name: Category name displayed on the page.
   - items: Meals or drinks belonging to the category.

   Each item can contain:
   - name: Item name.
   - price: Price in Tanzanian Shillings.
   - desc: Optional description.

   Some rendering logic also supports:
   - cat.note: Optional category note.
   - cat.sizeLabels, item.small, item.large: Optional dual-size pricing.
   ========================================================================== */

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
      {
        name: "Sekela Chicken",
        price: 10000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Gajjar Chicken",
        price: 10000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Lemon Chicken",
        price: 10000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Choma Chicken",
        price: 10000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Schezwan Chicken",
        price: 15000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Extra Hot Chicken",
        price: 15000,
        desc: "Served with chips, rice, noodles or naan."
      }
    ]
  },

  {
    id: "chicken-mzinga",
    name: "Chicken Mzinga",
    items: [
      {
        name: "Pilipili Chicken (Fried or BBQ)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Peri-Peri Chicken (Fried or BBQ)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Crunchy Chicken (Fried)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Chicken Poussin (Fried)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Chilly Milly",
        price: 26000,
        desc: "Served with chips, rice, noodles or naan."
      }
    ]
  },

  {
    id: "seafood",
    name: "Seafood",
    items: [
      {
        name: "Fish Boti (4 Sticks Per Plate)",
        price: 18000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Fish Fillet (Fried or BBQ)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Masala Prawns (Fried or BBQ)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Garlic Butter Prawns (Fried or BBQ)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Garlic Butter Fish (Fried)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      },
      {
        name: "Schezwan Prawns (Fried)",
        price: 24000,
        desc: "Served with chips, rice, noodles or naan."
      }
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
      {
        name: "Schezwan Fried Rice (Chicken, Beef or Veg)",
        price: 10000
      }
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


/* ==========================================================================
   2. HELPER FUNCTIONS
   Small reusable functions used throughout the script.
   ========================================================================== */


/**
 * Format a number as a Tanzanian Shilling price.
 *
 * Example:
 * formatPrice(15000) returns "TSh 15,000/="
 *
 * To change how prices appear throughout the menu, edit this function.
 */
function formatPrice(amount) {
  return "TSh " + amount.toLocaleString("en-US") + "/=";
}


/**
 * Create an HTML element.
 *
 * @param {string} tag       HTML tag name, such as "div" or "h2".
 * @param {string} className Optional CSS class.
 * @param {string} html      Optional HTML content.
 * @returns {HTMLElement}
 *
 * Note: The html argument is interpreted as HTML.
 * Use textContent instead when displaying untrusted text.
 */
function el(tag, className, html) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (html !== undefined) {
    element.innerHTML = html;
  }

  return element;
}


/* ==========================================================================
   3. CATEGORY NAVIGATION
   Creates one navigation button for every menu category.
   Clicking a button scrolls to its corresponding section.
   ========================================================================== */

function renderNav() {
  const nav = document.getElementById("category-nav");
  const navContainer = document.querySelector(".category-nav");

  // Stop if the required HTML elements are missing.
  if (!nav || !navContainer) {
    return;
  }

  MENU_DATA.forEach((category) => {
    const button = el("button", "nav-pill");

    button.type = "button";
    button.textContent = category.name;
    button.dataset.target = category.id;

    // Accessibility attributes for category navigation.
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", "false");

    // Scroll to the selected category.
    button.addEventListener("click", () => {
      const target = document.getElementById(category.id);

      if (!target) {
        return;
      }

      // Account for the category navigation height.
      const headerOffset = navContainer.offsetHeight + 12;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });

    nav.appendChild(button);
  });
}


/* ==========================================================================
   4. MENU RENDERING
   Generates all menu categories, meal names, descriptions, and prices.

   The HTML elements are inserted into:
   <main id="menu-content"></main>

   The function supports standard prices and optional two-size prices.
   ========================================================================== */

function renderMenu() {
  const main = document.getElementById("menu-content");

  // Stop if the menu container does not exist.
  if (!main) {
    return;
  }

  MENU_DATA.forEach((category) => {

    // Create the category section.
    const section = el("section", "category-section");

    section.id = category.id;
    section.setAttribute(
      "aria-labelledby",
      category.id + "-heading"
    );

    // Create the category heading.
    const heading = el("h2", "category-heading");

    heading.id = category.id + "-heading";
    heading.textContent = category.name;

    section.appendChild(heading);

    // Display an optional category note.
    if (category.note) {
      section.appendChild(
        el("p", "category-note", category.note)
      );
    }

    // Container for all items in this category.
    const list = el("div", "item-list");

    category.items.forEach((item) => {

      // Create an individual menu item.
      const row = el("article", "menu-item");

      // Meal name and optional description.
      const info = el("div", "menu-item-info");

      const itemName = el("h3", "menu-item-name");
      itemName.textContent = item.name;

      info.appendChild(itemName);

      if (item.desc) {
        const description = el("p", "menu-item-desc");
        description.textContent = item.desc;

        info.appendChild(description);
      }

      row.appendChild(info);


      // Display two prices if the category uses size options.
      if (category.sizeLabels) {

        const priceWrap = el(
          "div",
          "menu-item-price menu-item-price--dual"
        );

        // First size and price.
        const smallPrice = el("div", "price-option");

        const smallLabel = el("span", "price-option-label");
        smallLabel.textContent = category.sizeLabels[0];

        const smallValue = el("span", "price-option-value");
        smallValue.textContent = formatPrice(item.small);

        smallPrice.appendChild(smallLabel);
        smallPrice.appendChild(smallValue);


        // Second size and price.
        const largePrice = el("div", "price-option");

        const largeLabel = el("span", "price-option-label");
        largeLabel.textContent = category.sizeLabels[1];

        const largeValue = el("span", "price-option-value");
        largeValue.textContent = formatPrice(item.large);

        largePrice.appendChild(largeLabel);
        largePrice.appendChild(largeValue);


        // Add both price options to the menu item.
        priceWrap.appendChild(smallPrice);
        priceWrap.appendChild(largePrice);

        row.appendChild(priceWrap);

      } else {

        // Standard single price.
        const price = el("div", "menu-item-price");
        price.textContent = formatPrice(item.price);

        row.appendChild(price);

      }

      list.appendChild(row);
    });

    // Add the item list to its category.
    section.appendChild(list);

    // Add the complete category to the menu page.
    main.appendChild(section);
  });
}


/* ==========================================================================
   5. ACTIVE CATEGORY TRACKING
   Highlights the category button corresponding to the section currently
   being viewed while the customer scrolls through the menu.
   ========================================================================== */

function setupActiveTracking() {
  const pills = Array.from(
    document.querySelectorAll(".nav-pill")
  );

  const sections = MENU_DATA.map((category) =>
    document.getElementById(category.id)
  );

  const navElement = document.querySelector(".category-nav");

  // Stop if there are no navigation buttons or the navigation is missing.
  if (!pills.length || !navElement) {
    return;
  }


  /**
   * Update the active category button.
   *
   * @param {string} categoryId The ID of the active category section.
   */
  function setActive(categoryId) {
    pills.forEach((pill) => {

      const isActive = pill.dataset.target === categoryId;

      pill.classList.toggle("active", isActive);

      pill.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      // Keep the active category button visible in the navigation.
      if (isActive) {
        pill.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }

    });
  }


  // Observe menu sections as they enter the viewport.
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

      // Account for the category navigation when tracking sections.
      rootMargin:
        `-${navElement.offsetHeight + 20}px 0px -70% 0px`,

      threshold: 0
    }
  );


  // Start observing all existing menu sections.
  sections.forEach((section) => {
    if (section) {
      observer.observe(section);
    }
  });


  // Highlight the first category when the page loads.
  if (sections[0]) {
    setActive(sections[0].id);
  }
}


/* ==========================================================================
   6. INITIALIZE THE DIGITAL MENU
   Runs after the HTML document has loaded.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Generate category navigation buttons.
  renderNav();

  // Generate menu categories and items.
  renderMenu();

  // Enable automatic active-category highlighting.
  setupActiveTracking();

  // Update the copyright year.
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
