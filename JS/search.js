// search.js
document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById('searchInput');
    const doctorsGrid = document.getElementById('doctorsGrid');
  
    function displayDoctors(doctors) {
      doctorsGrid.innerHTML = '';
  
      if (doctors.length === 0) {
        doctorsGrid.innerHTML = '<p>No doctors found.</p>';
        return;
      }
  
      doctors.forEach(doctor => {
        const card = document.createElement('div');
        card.classList.add('doctor-card');
        card.innerHTML = `
          <img src="${doctor.photo}" alt="${doctor.name}">
          <h4>${doctor.name}</h4>
          <p>${doctor.specialty}</p>
        `;
        doctorsGrid.appendChild(card);
      });
    }
  
    function filterDoctors(event) {
      const searchText = event.target.value.toLowerCase();
      const filtered = staticDoctors.filter(doc =>
        doc.name.toLowerCase().includes(searchText) ||
        doc.specialty.toLowerCase().includes(searchText)
      );
  
      displayDoctors(filtered);
    }
  
    searchInput.addEventListener('input', filterDoctors);
  
    // Show all doctors initially
    displayDoctors(staticDoctors);
  });
  