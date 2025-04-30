document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("contactMessagesTable");
    const deleteAllBtn = document.getElementById("deleteAllContacts");
  
    function loadMessages() {
      const messages = JSON.parse(localStorage.getItem("medinova_contacts")) || [];
      table.innerHTML = "";
  
      if (messages.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No contact messages found.</td></tr>";
        return;
      }
  
      messages.forEach((msg, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.message}</td>
          <td><button class="action-btn" onclick="deleteMessage(${index})">Delete</button></td>
        `;
        table.appendChild(row);
      });
    }
  
    window.deleteMessage = function(index) {
      const messages = JSON.parse(localStorage.getItem("medinova_contacts")) || [];
      messages.splice(index, 1);
      localStorage.setItem("medinova_contacts", JSON.stringify(messages));
      loadMessages();
    };
  
    deleteAllBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all contact messages?")) {
        localStorage.removeItem("medinova_contacts");
        loadMessages();
      }
    });
  
    loadMessages();
  });
  