document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("jobApplicationForm");
    const message = document.getElementById("formMessage");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const position = document.getElementById("position").value;
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const coverLetter = document.getElementById("coverLetter").value.trim();
      const resumeFile = document.getElementById("resume").files[0];
  
      if (!position || !fullName || !email || !phone || !coverLetter || !resumeFile) {
        message.textContent = "Please complete all fields.";
        message.style.color = "red";
        return;
      }
  
      const application = {
        position,
        fullName,
        email,
        phone,
        coverLetter,
        resumeName: resumeFile.name,
        date: new Date().toLocaleString()
      };
  
      // Save to localStorage
      const applications = JSON.parse(localStorage.getItem("medinova_applicants")) || [];
      applications.push(application);
      localStorage.setItem("medinova_applicants", JSON.stringify(applications));
  
      console.log("New Job Application Submitted:", application);
  
      message.textContent = "Application submitted successfully!";
      message.style.color = "green";
      form.reset();
    });
  });
  