document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lab-bookings-container");
    let bookings = JSON.parse(localStorage.getItem("medinova_lab_tests")) || [];
  
    function renderBookings() {
      container.innerHTML = "";
  
      if (bookings.length === 0) {
        container.innerHTML = "<p>No lab test bookings yet.</p>";
        return;
      }
  
      bookings.forEach((booking, index) => {
        const card = document.createElement("div");
        card.className = "doctor-card";
  
        card.innerHTML = `
          <h4>${booking.fullName}</h4>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Test Type:</strong> ${booking.testType}</p>
          <p><strong>Preferred Date:</strong> ${booking.testDate}</p>
          <p><em>Booked on: ${booking.dateBooked}</em></p>
          <button class="login-btn" onclick="deleteBooking(${index})">Delete</button>
        `;
  
        container.appendChild(card);
      });
    }
  
    // Global delete function
    window.deleteBooking = function(index) {
      if (confirm("Are you sure you want to delete this booking?")) {
        bookings.splice(index, 1);
        localStorage.setItem("medinova_lab_tests", JSON.stringify(bookings));
        renderBookings();
      }
    };
  
    renderBookings();
  });
  