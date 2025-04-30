document.addEventListener("DOMContentLoaded", () => {
    const prescriptionList = document.getElementById("prescription-list");
  
    const prescriptions = JSON.parse(localStorage.getItem('medinova_prescriptions')) || [];
  
    if (prescriptions.length === 0) {
      prescriptionList.innerHTML = "";
      return;
    }
  
    prescriptions.forEach(prescription => {
      const card = document.createElement("div");
      card.className = "info-card";
  
      card.innerHTML = `
        <h4>${prescription.patientName}</h4>
        <p><strong>Doctor:</strong> ${prescription.doctorName}</p>
        <p><strong>Medicine:</strong> ${prescription.medicine}</p>
        <p><strong>Dosage:</strong> ${prescription.dosage}</p>
        <p><strong>Date:</strong> ${prescription.date}</p>
      `;
  
      prescriptionList.appendChild(card);
    });
  });
  