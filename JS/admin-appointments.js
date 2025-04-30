document.addEventListener("DOMContentLoaded", () => {
    const adminAppointmentsTable = document.getElementById('adminAppointmentsTable');
  
    function loadAppointmentsTable() {
      const appointments = JSON.parse(localStorage.getItem('medinova_appointments')) || [];
      adminAppointmentsTable.innerHTML = '';
  
      if (appointments.length === 0) {
        adminAppointmentsTable.innerHTML = "<tr><td colspan='5'>No appointments found.</td></tr>";
        return;
      }
  
      appointments.forEach((appt, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${appt.patient}</td>
          <td>${appt.doctor}</td>
          <td>${appt.date}</td>
          <td>${appt.time}</td>
          <td><button class="action-btn" onclick="deleteAppointment(${index})">Delete</button></td>
        `;
        adminAppointmentsTable.appendChild(row);
      });
    }
  
    window.deleteAppointment = function(index) {
      const appointments = JSON.parse(localStorage.getItem('medinova_appointments')) || [];
      appointments.splice(index, 1);
      localStorage.setItem('medinova_appointments', JSON.stringify(appointments));
      loadAppointmentsTable();
    };
  
    function exportAppointmentsToCSV() {
      const appointments = JSON.parse(localStorage.getItem('medinova_appointments')) || [];
  
      if (appointments.length === 0) {
        alert("❗ No appointments to export.");
        return;
      }
  
      const header = ["Patient", "Doctor", "Date", "Time"];
      const rows = appointments.map(appt => [
        appt.patient,
        appt.doctor,
        appt.date,
        appt.time
      ]);
  
      let csvContent = "data:text/csv;charset=utf-8,"
        + header.join(",") + "\n"
        + rows.map(row => row.join(",")).join("\n");
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "appointments.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    document.getElementById("exportCSV").addEventListener("click", exportAppointmentsToCSV);
  
    loadAppointmentsTable();
  });
  