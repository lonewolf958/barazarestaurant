
/* ==========================================================================
   BARAZA RESTAURANT & CAFE
   File: script.js

   PURPOSE:
   1. Automatically display the current year in the footer.
   2. Add scroll-reveal animations to selected website sections.
   3. Respect the visitor's reduced-motion accessibility preference.
   ========================================================================== */


/* ==========================================================================
   1. INITIALIZE WEBSITE SCRIPTS
   Wait until the HTML document has been fully loaded.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================================
     2. UPDATE THE FOOTER COPYRIGHT YEAR

     Finds the HTML element with id="year" and inserts the current year.
     This means the year updates automatically without manual editing.
     ========================================================================== */

  var yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ==========================================================================
     3. SELECT SECTIONS FOR SCROLL-REVEAL ANIMATIONS

     The animation applies to:
     - Table menu and online ordering section (.choose)
     - Events and celebrations section (.about)
     - Website footer (.site-footer)

     The "reveal" class prepares each section for the animation.
     ========================================================================== */

  var sectionsToReveal = document.querySelectorAll(
    '.choose, .about, .site-footer'
  );

  sectionsToReveal.forEach(function (section) {
    section.classList.add('reveal');
  });


  /* ==========================================================================
     4. CHECK THE VISITOR'S ANIMATION PREFERENCE

     Some visitors prefer reduced motion for accessibility reasons.
     If reduced motion is enabled, the website displays sections without
     waiting for the scroll animation.
     ========================================================================== */

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


  /* ==========================================================================
     5. DISPLAY SECTIONS WHEN THEY ENTER THE VIEWPORT

     IntersectionObserver detects when a section becomes visible on screen.

     When a section enters the viewport:
     - Add the "is-visible" class.
     - Stop observing that section because the animation only runs once.

     If IntersectionObserver is unsupported, or the visitor prefers reduced
     motion, display all selected sections immediately.
     ========================================================================== */

  if (
    'IntersectionObserver' in window &&
    !prefersReducedMotion
  ) {

    var revealObserver = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            // Make the section visible.
            entry.target.classList.add('is-visible');

            // Stop observing after the section appears.
            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        // Trigger when approximately 12% of a section is visible.
        threshold: 0.12
      }
    );


    // Start observing each selected section.
    sectionsToReveal.forEach(function (section) {
      revealObserver.observe(section);
    });

  } else {

    // Show all sections immediately if animation is unnecessary
    // or the browser does not support IntersectionObserver.
    sectionsToReveal.forEach(function (section) {
      section.classList.add('is-visible');
    });

  }

});
