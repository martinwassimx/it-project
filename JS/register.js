// /JS/register.js
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const message = document.getElementById("register-message");

  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "SHOW" : "HIDE";
  });

  document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Clear previous message
    message.textContent = "";

    if (password !== confirmPassword) {
      message.textContent = "Passwords do not match.";
      message.style.color = "red";
      return;
    }

    if (!validateEmail(email)) {
      message.textContent = "Invalid email format.";
      message.style.color = "red";
      return;
    }

    let patients = JSON.parse(localStorage.getItem('medinova_patients')) || [];

    const emailExists = patients.some(patient => patient.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      message.textContent = "Email already registered.";
      message.style.color = "red";
      return;
    }

    const newPatient = { username, email, phone, age, password };
    patients.push(newPatient);
    localStorage.setItem('medinova_patients', JSON.stringify(patients));

    // ===> Add console display here
    console.log(" New Patient Registered:");
    console.log(newPatient);

    message.textContent = "Registration successful! Redirecting to login...";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});
