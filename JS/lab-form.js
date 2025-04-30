document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("lab-form");
    const messageBox = document.getElementById("lab-message");
  
    if (!form || !messageBox) {
      console.error("Form or message box not found.");
      return;
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const testType = document.getElementById("testType").value;
      const testDate = document.getElementById("testDate").value;
  
      if (!fullName || !email || !phone || !testType || !testDate) {
        messageBox.textContent = "Please fill in all fields.";
        messageBox.style.color = "red";
        return;
      }
  
      const booking = {
        fullName,
        email,
        phone,
        testType,
        testDate,
        dateBooked: new Date().toLocaleString()
      };
  
      // Log all booking details to the console
      console.log("Booking Details:", booking);
  
      const allBookings = JSON.parse(localStorage.getItem("medinova_lab_tests")) || [];
      allBookings.push(booking);
      localStorage.setItem("medinova_lab_tests", JSON.stringify(allBookings));
  
      messageBox.textContent = "Lab test booked successfully!";
      messageBox.style.color = "green";
      form.reset();
    });
  });
  