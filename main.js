document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    });
  }

  // Payment Modal
  const openPayment = document.getElementById("openPayment");
  const closePayment = document.getElementById("closePayment");
  const paymentModal = document.getElementById("paymentModal");

  if (openPayment && closePayment && paymentModal) {
    openPayment.addEventListener("click", () => {
      paymentModal.style.display = "flex";
    });

    closePayment.addEventListener("click", () => {
      paymentModal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === paymentModal) {
        paymentModal.style.display = "none";
      }
    });
  }
});
