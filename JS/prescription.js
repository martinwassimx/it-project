document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("prescription-form");
    const prescriptionList = document.getElementById("prescription-list");
  
    // Load prescriptions from localStorage
    let prescriptions = JSON.parse(localStorage.getItem('medinova_prescriptions')) || [];
  
    // Display existing prescriptions
    renderPrescriptions();
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const newPrescription = {
        patientName: document.getElementById("patientName").value.trim(),
        doctorName: document.getElementById("doctorName").value.trim(),
        medicine: document.getElementById("medicine").value.trim(),
        dosage: document.getElementById("dosage").value.trim(),
        date: document.getElementById("date").value,
        id: Date.now() // Unique ID
      };
  
      prescriptions.push(newPrescription);
      localStorage.setItem('medinova_prescriptions', JSON.stringify(prescriptions));
  
      form.reset();
      renderPrescriptions();
    });
  
    function renderPrescriptions() {
      prescriptionList.innerHTML = "";
  
      if (prescriptions.length === 0) {
        prescriptionList.innerHTML = "<p>No prescriptions found.</p>";
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
          <button class="logout-btn" onclick="deletePrescription(${prescription.id})">Delete</button>
        `;
  
        prescriptionList.appendChild(card);
      });
    }
  
    // Delete prescription
    window.deletePrescription = (id) => {
      prescriptions = prescriptions.filter(pres => pres.id !== id);
      localStorage.setItem('medinova_prescriptions', JSON.stringify(prescriptions));
      renderPrescriptions();
    };
  });
  