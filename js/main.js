// =========================================================
// Wires up config.js values into the page + handles the
// inquiry form submission via Web3Forms (free tier).
// =========================================================
(function () {
  const cfg = window.SITE_CONFIG || {};

  // --- Inject contact info from config ---
  const emailLink = document.getElementById("emailContactLink");
  const emailValue = document.getElementById("emailContactValue");
  if (emailLink && cfg.contactEmail) {
    emailLink.href = "mailto:" + cfg.contactEmail;
    if (emailValue) emailValue.textContent = cfg.contactEmail;
  }

  const wechatValue = document.getElementById("wechatContactValue");
  if (wechatValue && cfg.wechatId) wechatValue.textContent = cfg.wechatId;

  function buildWhatsappUrl() {
    const number = (cfg.whatsappNumber || "").replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      "Hi, I'm interested in your products and would like a quote."
    );
    return "https://wa.me/" + number + "?text=" + text;
  }

  const waLink = document.getElementById("whatsappContactLink");
  if (waLink) waLink.href = buildWhatsappUrl();

  const waFloat = document.getElementById("floatWhatsapp");
  if (waFloat) waFloat.href = buildWhatsappUrl();

  const web3key = document.getElementById("web3formsAccessKey");
  if (web3key && cfg.web3formsKey) web3key.value = cfg.web3formsKey;

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
  }

  // --- Inquiry form submission (Web3Forms) ---
  const form = document.getElementById("inquiryForm");
  const statusEl = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const key = (cfg.web3formsKey || "").trim();
      if (!key || key === "YOUR_WEB3FORMS_ACCESS_KEY") {
        statusEl.textContent =
          "Form is not fully configured yet — please contact us directly via email or WhatsApp above.";
        statusEl.className = "form-status error";
        return;
      }

      const submitBtn = form.querySelector(".submit-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        const formData = new FormData(form);
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        const result = await res.json();

        if (result.success) {
          statusEl.textContent = "Thank you! Your inquiry has been sent — we'll get back to you shortly.";
          statusEl.className = "form-status success";
          form.reset();
        } else {
          statusEl.textContent = "Something went wrong. Please try again or contact us via email/WhatsApp.";
          statusEl.className = "form-status error";
        }
      } catch (err) {
        statusEl.textContent = "Network error. Please try again or contact us via email/WhatsApp.";
        statusEl.className = "form-status error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Inquiry";
      }
    });
  }
})();
