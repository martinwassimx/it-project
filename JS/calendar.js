// calendar.js
document.addEventListener("DOMContentLoaded", () => {

    const daysMap = {
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
      0: 'sunday'
    };
  
    const noAppointmentsMessage = document.getElementById('noAppointmentsMessage');
  
    function loadAppointments() {
      const appointments = JSON.parse(localStorage.getItem('medinova_appointments')) || [];
  
      if (appointments.length === 0) {
        noAppointmentsMessage.style.display = 'block';
        return;
      }
  
      appointments.forEach(appt => {
        const dateObj = new Date(`${appt.date}T${appt.time}`);
        const dayNumber = dateObj.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const dayId = daysMap[dayNumber];
        const dayBox = document.getElementById(dayId);
  
        if (dayBox) {
          const appointmentInfo = document.createElement('p');
          appointmentInfo.innerHTML = `<strong>${appt.patient}</strong> with <strong>${appt.doctor}</strong><br>${appt.time}`;
          dayBox.appendChild(appointmentInfo);
        }
      });
    }
  
    loadAppointments();
  });
  