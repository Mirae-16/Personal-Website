document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Stop default form refresh
  
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  const messagesList = document.getElementById('messagesList');
  const noMessagesText = document.getElementById('noMessages');

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) return;

  // Remove the default "No messages yet" text if present
  if (noMessagesText) {
    noMessagesText.remove();
  }

  // Create a new message card element
  const messageCard = document.createElement('div');
  messageCard.className = 'message-card';

  // Get current time
  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Safely insert content using textContent to prevent HTML injection
  const header = document.createElement('div');
  header.className = 'message-header';
  
  const authorSpan = document.createElement('span');
  authorSpan.className = 'message-author';
  authorSpan.textContent = name;
  
  const timeSpan = document.createElement('span');
  timeSpan.textContent = ` • ${timeString}`;
  
  header.appendChild(authorSpan);
  header.appendChild(timeSpan);

  const body = document.createElement('div');
  body.className = 'message-body';
  body.textContent = message;

  messageCard.appendChild(header);
  messageCard.appendChild(body);

  // Insert the new message at the top of the list
  messagesList.prepend(messageCard);

  // Reset inputs
  nameInput.value = '';
  messageInput.value = '';
});