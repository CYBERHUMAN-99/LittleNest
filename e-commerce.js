/* =========================================================
   LittleNest — site interactions and order request form
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNavigation();
  setCurrentYear();
  setupOrderForm();
});

function setupMobileNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  if (!menuButton || !navigation) return;

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

function setupOrderForm() {
  const form = document.getElementById("order-form");
  const quantityField = document.getElementById("package-quantity");
  const totalElement = document.getElementById("order-total");
  const totalInput = document.getElementById("order-total-value");
  const feedback = document.getElementById("form-feedback");
  const submitButton = document.getElementById("order-submit");
  if (!form || !quantityField || !totalElement || !totalInput || !feedback || !submitButton) return;

  // Edit these values in config.js. The endpoint is public by design; never put
  // a Formspree API key, password, or other private credential in frontend code.
  const settings = window.LITTLENEST_CONFIG || {};
  const unitPrice = Number(settings.unitPriceNGN) || 148500;
  const endpoint = String(settings.formspreeEndpoint || "").trim();
  const currency = settings.currency || "NGN";

  const formatMoney = (amount) => new Intl.NumberFormat("en-NG", {
    style: "currency", currency, maximumFractionDigits: 0
  }).format(amount);

  const updateTotal = () => {
    const quantity = Math.max(1, Number(quantityField.value) || 1);
    const total = quantity * unitPrice;
    totalElement.textContent = formatMoney(total);
    totalInput.value = `${currency} ${total}`;
  };

  const showFeedback = (message, type) => {
    feedback.textContent = message;
    feedback.className = `form-feedback is-visible ${type}`;
  };

  quantityField.addEventListener("change", updateTotal);
  quantityField.addEventListener("input", updateTotal);
  updateTotal();

  if (endpoint.startsWith("https://formspree.io/f/")) {
    form.action = endpoint;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    feedback.className = "form-feedback";
    feedback.textContent = "";

    if (!form.reportValidity()) return;

    const honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value.trim()) return;

    if (!endpoint.startsWith("https://formspree.io/f/")) {
      showFeedback("The form is not connected yet. Add the store owner's Formspree form endpoint in config.js before accepting real requests.", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending your request…";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        let detail = "The form service could not accept the request.";
        try {
          const result = await response.json();
          if (result.errors?.length) detail = result.errors.map((item) => item.message).join(" ");
        } catch (_) { /* Keep the safe generic message. */ }
        throw new Error(detail);
      }

      form.reset();
      updateTotal();
      showFeedback("Thank you! Your order request has been sent. The store will contact you to confirm the details. No payment has been taken and the order is not confirmed yet.", "success");
    } catch (error) {
      showFeedback(`${error.message || "We couldn't send your request."} Please try again or contact the store directly.`, "error");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit order request <span aria-hidden="true">→</span>';
    }
  });
}
