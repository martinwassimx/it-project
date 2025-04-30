document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.getElementById("messagesContainer");
    const deleteAllMessagesButton = document.getElementById("deleteAllMessages");

    const messages = JSON.parse(localStorage.getItem("medinova_contacts")) || [];

    if (messages.length === 0) {
      messagesContainer.innerHTML = "<tr><td colspan='4'>No messages yet.</td></tr>";
      return;
    }

    function renderMessages() {
      messagesContainer.innerHTML = ""; 
  
      messages.forEach((message, index) => {
        const messageRow = document.createElement("tr");
  
        messageRow.innerHTML = `
          <td>${message.name}</td>
          <td>${message.email}</td>
          <td>${message.message}</td>
          <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;

        const deleteBtn = messageRow.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => deleteMessage(index));
  
        messagesContainer.appendChild(messageRow);
      });
    }

    function deleteMessage(index) {
      messages.splice(index, 1); 
      localStorage.setItem("medinova_contacts", JSON.stringify(messages));
      renderMessages(); 
    }
  
    // Function to delete all messages
    deleteAllMessagesButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all messages?")) {
        localStorage.removeItem("medinova_contacts"); 
        renderMessages();
      }
    });

    renderMessages();
  });
  