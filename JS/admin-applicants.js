document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("applicantsTable");
    const deleteAllBtn = document.getElementById("deleteAllApplicants");
    const exportBtn = document.getElementById("exportCSV");
  
    function loadApplicants() {
      const applicants = JSON.parse(localStorage.getItem("medinova_applicants")) || [];
      table.innerHTML = "";
  
      if (applicants.length === 0) {
        table.innerHTML = "<tr><td colspan='7'>No applications found.</td></tr>";
        return;
      }
  
      applicants.forEach((app, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${app.position}</td>
          <td>${app.fullName}</td>
          <td>${app.email}</td>
          <td>${app.phone}</td>
          <td>${app.resumeName}</td>
          <td>${app.date}</td>
          <td><button class="action-btn" onclick="deleteApplicant(${index})">Delete</button></td>
        `;
        table.appendChild(row);
      });
    }
  
    window.deleteApplicant = function (index) {
      const applicants = JSON.parse(localStorage.getItem("medinova_applicants")) || [];
      applicants.splice(index, 1);
      localStorage.setItem("medinova_applicants", JSON.stringify(applicants));
      loadApplicants();
    };
  
    deleteAllBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all applications?")) {
        localStorage.removeItem("medinova_applicants");
        loadApplicants();
      }
    });
  
    exportBtn.addEventListener("click", () => {
      const applicants = JSON.parse(localStorage.getItem("medinova_applicants")) || [];
      if (applicants.length === 0) {
        alert("No data to export.");
        return;
      }
  
      let csv = "Position,Full Name,Email,Phone,Resume,Date\n";
      applicants.forEach(app => {
        const row = [
          app.position,
          app.fullName,
          app.email,
          app.phone,
          app.resumeName,
          app.date
        ].map(value => `"${value}"`).join(",");
        csv += row + "\n";
      });
  
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Medinova_Applicants.csv";
      a.click();
      URL.revokeObjectURL(url);
    });
  
    loadApplicants();
  });
  