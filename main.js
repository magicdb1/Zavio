document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

      const isOpen = navMenu.classList.contains("active");
      hamburger.setAttribute(
        "aria-label",
        isOpen ? "Menü schließen" : "Menü öffnen",
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-label", "Menü öffnen");
      });
    });
  }

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const type = document.getElementById("type").value;
      const message = document.getElementById("message").value.trim();

      const typeText = {
        support: "Support",
        bug: "Bug melden",
        feature: "Feature-Wunsch",
        other: "Sonstiges",
      };

      const subject = encodeURIComponent(`Zavio Kontakt: ${typeText[type]}`);
      const body = encodeURIComponent(
        `Name: ${name}\nE-Mail: ${email}\nAnliegen: ${typeText[type]}\n\nNachricht:\n${message}`,
      );

      window.location.href = `mailto:dominik.birchler@icloud.com?subject=${subject}&body=${body}`;

      formStatus.textContent =
        "Dein E-Mail-Programm wurde geöffnet. Bitte sende die Nachricht dort ab.";
    });
  }

  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");

  if (banner && acceptBtn && declineBtn) {
    if (localStorage.getItem("cookiesChoice")) {
      banner.classList.add("hidden");
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesChoice", "accepted");
      banner.classList.add("hidden");
    });

    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesChoice", "declined");
      banner.classList.add("hidden");
    });
  }
});
