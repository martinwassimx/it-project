document.addEventListener("DOMContentLoaded", () => {
  const totalDoctors = document.getElementById("totalDoctors");
  const totalAppointments = document.getElementById("totalAppointments");
  const totalReviews = document.getElementById("totalReviews");

  const doctors = staticDoctors || [];
  const appointments = JSON.parse(localStorage.getItem("medinova_appointments")) || [];
  const reviews = JSON.parse(localStorage.getItem("medinova_reviews")) || [];

  totalDoctors.textContent = doctors.length;
  totalAppointments.textContent = appointments.length;
  totalReviews.textContent = reviews.length;
});
