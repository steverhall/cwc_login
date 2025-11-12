// Array to store login entries (in-memory only, not persisted)
let logins = [];

// DOM elements
const loginForm = document.getElementById('loginForm');
const loginsList = document.getElementById('loginsList');
const loginCount = document.getElementById('loginCount');

// Initialize the app
function init() {
    // Add form submit event listener
    loginForm.addEventListener('submit', handleFormSubmit);
    
    // Render the initial state
    renderLogins();
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const website = document.getElementById('website').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Create new login object
    const newLogin = {
        id: Date.now(), // Simple unique ID
        website: website,
        username: username,
        password: password,
        createdAt: new Date().toLocaleString()
    };
    
    // Add to logins array
    logins.push(newLogin);
    
    // Show success message
    showSuccessMessage(`Login for "${website}" added successfully!`);
    
    // Reset form
    loginForm.reset();
    
    // Re-render the logins list
    renderLogins();
}

// Delete a login entry
function deleteLogin(id) {
    // Find the login to get its website name for the confirmation
    const login = logins.find(l => l.id === id);
    
    if (login && confirm(`Are you sure you want to delete the login for "${login.website}"?`)) {
        // Remove from array
        logins = logins.filter(l => l.id !== id);
        
        // Re-render
        renderLogins();
        
        // Show success message
        showSuccessMessage('Login deleted successfully!');
    }
}

// Render all logins to the page
function renderLogins() {
    // Update count
    loginCount.textContent = `(${logins.length})`;
    
    // Clear the list
    loginsList.innerHTML = '';
    
    // If no logins, show empty message
    if (logins.length === 0) {
        loginsList.innerHTML = '<p class="empty-message">No logins saved yet. Add your first login above!</p>';
        return;
    }
    
    // Create and append login cards
    logins.forEach(login => {
        const card = createLoginCard(login);
        loginsList.appendChild(card);
    });
}

// Create a login card element
function createLoginCard(login) {
    const card = document.createElement('div');
    card.className = 'login-card';
    
    // Create info section
    const infoDiv = document.createElement('div');
    infoDiv.className = 'login-info';
    
    const websiteTitle = document.createElement('h3');
    websiteTitle.textContent = login.website;
    
    const usernameText = document.createElement('p');
    usernameText.textContent = `Username: ${login.username}`;
    
    const passwordText = document.createElement('p');
    passwordText.className = 'password-display';
    passwordText.textContent = `Password: ${'•'.repeat(login.password.length)}`;
    
    const dateText = document.createElement('p');
    dateText.style.fontSize = '0.85em';
    dateText.style.color = '#999';
    dateText.textContent = `Added: ${login.createdAt}`;
    
    infoDiv.appendChild(websiteTitle);
    infoDiv.appendChild(usernameText);
    infoDiv.appendChild(passwordText);
    infoDiv.appendChild(dateText);
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteLogin(login.id);
    
    // Assemble card
    card.appendChild(infoDiv);
    card.appendChild(deleteBtn);
    
    return card;
}

// Show success message
function showSuccessMessage(message) {
    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = 'success-message';
    msgDiv.textContent = message;
    
    // Insert at the top of the container
    const container = document.querySelector('.container');
    const firstChild = container.firstElementChild;
    container.insertBefore(msgDiv, firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        msgDiv.style.transition = 'opacity 0.3s';
        msgDiv.style.opacity = '0';
        setTimeout(() => msgDiv.remove(), 300);
    }, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
