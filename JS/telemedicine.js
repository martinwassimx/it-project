document.addEventListener("DOMContentLoaded", () => {
    const telemedicineForm = document.getElementById("telemedicineForm");
    const bookingMessage = document.getElementById("bookingMessage");
  
    // Event listener for form submission
    telemedicineForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Capture form data
      const patientName = document.getElementById("patientName").value.trim();
      const email = document.getElementById("email").value.trim();
      const specialty = document.getElementById("specialty").value;
      const appointmentDate = document.getElementById("appointmentDate").value;
      const appointmentTime = document.getElementById("appointmentTime").value;
  
      // Validate the form data
      if (!patientName || !email || !specialty || !appointmentDate || !appointmentTime) {
        bookingMessage.textContent = "❗ Please fill in all fields.";
        bookingMessage.style.color = "red";
        return;
      }
  
      // Create a new consultation object
      const newConsultation = {
        patientName,
        email,
        specialty,
        appointmentDate,
        appointmentTime,
        dateBooked: new Date().toLocaleString()
      };
  
      // Log the consultation data to the console
      console.log("New Telemedicine Consultation Submitted:", newConsultation);
  
      // Retrieve existing consultations or initialize an empty array
      const consultations = JSON.parse(localStorage.getItem("medinova_consultations")) || [];
  
      // Add the new consultation to the array
      consultations.push(newConsultation);
  
      // Save the updated consultations array to localStorage
      localStorage.setItem("medinova_consultations", JSON.stringify(consultations));
  
      // Show success message
      bookingMessage.textContent = "Your Telemedicine Consultation request has been submitted! Our team will contact you shortly.";
      bookingMessage.style.color = "green";
  
      // Reset the form
      telemedicineForm.reset();
    });
  });
  