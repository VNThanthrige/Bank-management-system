document.addEventListener("DOMContentLoaded", () => {
  const premiumBtn = document.querySelector(".premium-btn");
  const paymentModal = document.getElementById("paymentModal");
  const closePayment = document.getElementById("closePayment");
  const paymentForm = document.getElementById("paymentForm");

  if (premiumBtn && paymentModal && closePayment && paymentForm) {
    // Open modal
    premiumBtn.addEventListener("click", () => {
      paymentModal.style.display = "flex";
    });

    // Close modal
    closePayment.addEventListener("click", () => {
      paymentModal.style.display = "none";
    });

    // Close when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === paymentModal) {
        paymentModal.style.display = "none";
      }
    });

    // Handle payment
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cardName = document.getElementById("cardName").value.trim();
      const cardNumber = document.getElementById("cardNumber").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      if (!cardName || !cardNumber || !expiry || !cvv) {
        alert("Please fill in all fields");
        return;
      }

      if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        alert("Invalid card number");
        return;
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert("Invalid expiry date (MM/YY)");
        return;
      }

      if (cvv.length !== 3 || isNaN(cvv)) {
        alert("Invalid CVV");
        return;
      }

      alert("Payment successful! You are now a Premium user.");
      paymentModal.style.display = "none";
      paymentForm.reset();
    });
  }
});
