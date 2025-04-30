// /JS/login.js
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
  
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("login-message");
  
    togglePassword.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      togglePassword.textContent = type === "password" ? "SHOW" : "HIDE";
    });
  
    document.getElementById("login-form").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
  
      message.textContent = "";
  
      const patients = JSON.parse(localStorage.getItem('medinova_patients')) || [];
  
      const matchedUser = patients.find(patient => 
        patient.email.toLowerCase() === email.toLowerCase() && patient.password === password
      );
  
      if (matchedUser) {
        // Save current session
        localStorage.setItem('medinova_logged_in_user', JSON.stringify(matchedUser));
  
        message.textContent = "Login successful! Redirecting...";
        message.style.color = "green";
  
        setTimeout(() => {
          window.location.href = "dashboard.html"; // or dashboard.html if you create it
        }, 2000);
      } else {
        message.textContent = "Invalid email or password.";
        message.style.color = "red";
      }
    });
  });
  