document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("reviews-container");

    let reviews = JSON.parse(localStorage.getItem("medinova_reviews")) || [];

    function renderReviews() {
      container.innerHTML = "";
  
      if (reviews.length === 0) {
        container.innerHTML = "<p>No reviews submitted yet.</p>";
        return;
      }
  
      reviews.forEach((review, index) => {
        const card = document.createElement("div");
        card.className = "doctor-card";
  
        card.innerHTML = `
          <h4>${review.fullName} (${review.type.toUpperCase()})</h4>
          <p><strong>Email:</strong> ${review.email}</p>
          <p><strong>Message:</strong><br>${review.message}</p>
          <p><em>${review.date}</em></p>
          <button class="login-btn" onclick="deleteReview(${index})">Delete</button>
        `;
  
        container.appendChild(card);
      });
    }

    window.deleteReview = function(index) {
      if (confirm("Are you sure you want to delete this review?")) {
        reviews.splice(index, 1);
        localStorage.setItem("medinova_reviews", JSON.stringify(reviews));
        renderReviews();
      }
    };

    renderReviews();
  });
  