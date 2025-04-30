document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  const messageBox = document.getElementById("review-message");
  const reviewContainer = document.getElementById("all-reviews");

  // Function to load and display reviews from localStorage
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("medinova_reviews")) || [];
    reviewContainer.innerHTML = "";

    if (reviews.length === 0) {
      reviewContainer.innerHTML = "<p>No reviews yet.</p>";
      console.log("No reviews found.");
      return;
    }

    reviews.reverse().forEach((review) => {
      const card = document.createElement("div");
      card.className = "doctor-card";
      card.innerHTML = `
        <h4>${review.fullName} (${review.type})</h4>
        <p>${review.message}</p>
        <small>${review.date}</small>
      `;
      reviewContainer.appendChild(card);

      // Display each review in the console
      console.log("Review loaded:", review);
    });
  }

  loadReviews();

  if (!form || !messageBox) return;

  // Event listener for form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const type = document.getElementById("type").value;
    const userMessage = document.getElementById("message").value.trim();

    if (!fullName || !email || !type || !userMessage) {
      messageBox.textContent = "Please fill in all fields.";
      messageBox.style.color = "red";
      return;
    }

    const review = {
      fullName,
      email,
      type,
      message: userMessage,
      date: new Date().toLocaleString()
    };

    // Log the new review to the console
    console.log("New review submitted:", review);

    // Save the review to localStorage
    const allReviews = JSON.parse(localStorage.getItem("medinova_reviews")) || [];
    allReviews.push(review);
    localStorage.setItem("medinova_reviews", JSON.stringify(allReviews));

    messageBox.textContent = `Thank you for your ${type.toLowerCase()}!`;
    messageBox.style.color = "green";
    form.reset();
    loadReviews();  // Reload and display the updated reviews
  });
});
