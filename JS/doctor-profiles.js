// /JS/doctor-profiles.js
document.addEventListener("DOMContentLoaded", () => {
    const doctorsContainer = document.getElementById('doctors-container');
  
    staticDoctors.forEach(doctor => {
      const doctorCard = document.createElement('div');
      doctorCard.className = 'doctor-card';
  
      doctorCard.innerHTML = `
        <img src="${doctor.photo}" alt="${doctor.name}">
        <h4>${doctor.name}</h4>
        <p><strong>Specialty:</strong> ${doctor.specialty}</p>
        <p><strong>Location:</strong> ${doctor.location}</p>
        <p><strong>Experience:</strong> ${doctor.experience}</p>
        <p><strong>About:</strong> ${doctor.bio}</p>
      `;
  
      doctorsContainer.appendChild(doctorCard);
    });
  });
  