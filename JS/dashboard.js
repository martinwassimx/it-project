document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("medinova_logged_in_user"));
  const userName = document.getElementById("user-name");
  const emailDisplay = document.getElementById("email-display");
  const usernameDisplay = document.getElementById("username-display");
  const phoneDisplay = document.getElementById("phone-display");
  const ageDisplay = document.getElementById("age-display");

  if (!user) {
    window.location.href = "login-dashbourd.html"; // Redirect if not logged in
    return;
  }

  userName.textContent = user.username;
  emailDisplay.textContent = user.email;
  usernameDisplay.textContent = user.username;
  phoneDisplay.textContent = user.phone;
  ageDisplay.textContent = user.age;

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("medinova_logged_in_user");
    window.location.href = "login-dashbourd.html";
  });
});
