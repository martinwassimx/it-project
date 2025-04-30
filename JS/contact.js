document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("formMessage");
  
    if (!form || !formMessage) {
      console.error("Form or message box not found.");
      return;
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";
        return;
      }
  
      // ✅ Save to localStorage
      const newMessage = { name, email, message };
      const contacts = JSON.parse(localStorage.getItem("medinova_contacts")) || [];
      contacts.push(newMessage);
      localStorage.setItem("medinova_contacts", JSON.stringify(contacts));
  
      // ✅ Console Display
      console.log("New Contact Form Submission:");
      console.log("Full Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);
  
      formMessage.textContent = "Thank you for contacting us!";
      formMessage.style.color = "green";
      form.reset();
    });
  });
  