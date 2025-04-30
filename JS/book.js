document.addEventListener("DOMContentLoaded", () => {

  const doctorSelect = document.getElementById('doctorSelect');
  const appointmentForm = document.getElementById('appointmentForm');
  const bookingMessage = document.getElementById('bookingMessage');

  function loadDoctors() {
    staticDoctors.forEach(doctor => {
      const option = document.createElement('option');
      option.value = doctor.name;
      option.textContent = `${doctor.name} (${doctor.specialty})`;
      doctorSelect.appendChild(option);
    });
  }

  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const patient = document.getElementById('patientName').value.trim();
    const doctor = doctorSelect.value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;

    if (patient && doctor && date && time) {
      if (!isFutureDate(date, time)) {
        bookingMessage.textContent = "Appointment must be in the future.";
        bookingMessage.style.color = "red";
        return;
      }

      const newAppointment = { patient, doctor, date, time };
      const appointments = JSON.parse(localStorage.getItem('medinova_appointments')) || [];
      appointments.push(newAppointment);
      localStorage.setItem('medinova_appointments', JSON.stringify(appointments));

      // Log the new appointment details to the console
      console.log("New Appointment Booked:", newAppointment);

      bookingMessage.textContent = "Appointment booked successfully!";
      bookingMessage.style.color = "green";

      appointmentForm.reset();
    } else {
      bookingMessage.textContent = "Please fill all fields.";
      bookingMessage.style.color = "red";
    }
  });

  function isFutureDate(date, time) {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    return selectedDateTime > now;
  }

  loadDoctors();
});
