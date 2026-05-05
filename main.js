document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  const savedUser = JSON.parse(localStorage.getItem("zavioUser"));
  const isLoggedIn = localStorage.getItem("zavioLoggedIn") === "true";

  /* =========================
     🔐 ROUTING / PROTECTION
  ========================= */

  if ((page === "landing" || page === "auth") && isLoggedIn && savedUser) {
    window.location.href = "dashboard.html";
    return;
  }

  if (page === "app" && (!isLoggedIn || !savedUser)) {
    window.location.href = "auth.html";
    return;
  }

  /* =========================
     🍔 MOBILE NAVBAR
  ========================= */

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* =========================
     🔁 AUTH TABS
  ========================= */

  const tabs = document.querySelectorAll(".auth-tab");
  const forms = document.querySelectorAll(".auth-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      forms.forEach((f) => f.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab + "Form").classList.add("active");
    });
  });

  /* =========================
     📝 REGISTER
  ========================= */

  const registerForm = document.getElementById("registerForm");
  const registerStatus = document.getElementById("registerStatus");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value.trim();
      const terms = document.getElementById("termsCheck");

      if (password.length < 6) {
        registerStatus.textContent =
          "Passwort muss mindestens 6 Zeichen haben.";
        return;
      }

      if (!terms.checked) {
        registerStatus.textContent =
          "Bitte akzeptiere die AGB und den Datenschutz.";
        return;
      }

      const user = { name, email, password };

      localStorage.setItem("zavioUser", JSON.stringify(user));
      localStorage.setItem("zavioLoggedIn", "true");

      window.location.href = "dashboard.html";
    });
  }

  /* =========================
     🔑 LOGIN
  ========================= */

  const loginForm = document.getElementById("loginForm");
  const loginStatus = document.getElementById("loginStatus");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const user = JSON.parse(localStorage.getItem("zavioUser"));

      if (!user) {
        loginStatus.textContent = "Kein Account gefunden. Bitte registrieren.";
        return;
      }

      if (email === user.email && password === user.password) {
        localStorage.setItem("zavioLoggedIn", "true");
        window.location.href = "dashboard.html";
      } else {
        loginStatus.textContent = "E-Mail oder Passwort ist falsch.";
      }
    });
  }

  /* =========================
     👤 DASHBOARD USER DATA
  ========================= */

  if (page === "app" && savedUser) {
    const nameEls = document.querySelectorAll("#dashboardName, #profileName");
    const emailEl = document.getElementById("profileEmail");

    nameEls.forEach((el) => (el.textContent = savedUser.name));
    if (emailEl) emailEl.textContent = savedUser.email;
  }

  /* =========================
     🚪 LOGOUT (FIXED)
  ========================= */

  const logoutButtons = document.querySelectorAll(
    "#logoutBtnTop, #logoutBtnBottom",
  );

  logoutButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 🔥 Nur Login entfernen (User bleibt!)
      localStorage.removeItem("zavioLoggedIn");

      window.location.href = "index.html";
    });
  });

  /* =========================
     📩 CONTACT FORM
  ========================= */

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const type = document.getElementById("type").value;
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent(`Zavio Kontakt: ${type}`);
      const body = encodeURIComponent(
        `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
      );

      window.location.href = `mailto:dominik.birchler@icloud.com?subject=${subject}&body=${body}`;

      formStatus.textContent = "Mail wurde geöffnet.";
    });
  }

  /* =========================
     🍪 COOKIE BANNER
  ========================= */

  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("acceptCookies");
  const decline = document.getElementById("declineCookies");

  if (banner && accept && decline) {
    if (localStorage.getItem("cookiesChoice")) {
      banner.classList.add("hidden");
    }

    accept.addEventListener("click", () => {
      localStorage.setItem("cookiesChoice", "accepted");
      banner.classList.add("hidden");
    });

    decline.addEventListener("click", () => {
      localStorage.setItem("cookiesChoice", "declined");
      banner.classList.add("hidden");
    });
  }
});
