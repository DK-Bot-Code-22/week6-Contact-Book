// Global variables

let apiKey = '';
const rootPath = 'https://mysite.itvarsity.org/api/ContactBook/';

// Check if APi key exists when page loads

function checkApiKey() { 
    const storedApiKey = localStorage.getItem(key:'apiKey');
    if (storedApiKey) {
        apiKey = storedApiKey;

        // Show contacts page (Show page)

        showContacts();

        // Get contact (API call)

        getContacts()
    }
} 

// Setup the API Key and store it

function setApiKey() { 
    const inputApiKey = document.getElementById('apiKeyInput').value.trim()

    if (!inputApiKey){
        alert('Please enter an API key!');
        return;
    }

    // Validatee API key first

    fetch(rootPath + "controller/api-key/?apiKey=" + inputApiKey)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            if (data == "1") {
                apiKey = inputApiKey;
                localStorage.setItem("apiKey", apiKey);
                showContacts();
                getContacts;
            } else {
                alert("Invalid API key entered");
            }
        })

        .catch(function (error) {
            alert('Error validating your API key. Please try again.');
        });
}

// Show different pages

function showPage(pageId) { 
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // show selected page

    document.getElementById(pageId).classList.add('active');
}

function showContacts() {
    showPage('contactsPage');
}

function showAddContacts() {
    showPage('addContactPage');

    // Clear the form

    document.getElementById('addContactForm').reset();
}

function showEditContact(contactId) {
    showPage('editContactPage')

    // load contact data for editing

    loadContactForEdit(contactId);
}