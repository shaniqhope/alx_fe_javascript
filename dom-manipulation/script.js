// Simulate a mock server with JSONPlaceholder
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API for quotes
let localSyncInterval;
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

/// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
  }
  
  // Function to notify user that quotes were synced successfully
  function notifySyncSuccess() {
    const syncNotification = document.getElementById('sync-status');
    
    // Display the notification message
    syncNotification.innerText = 'Quotes synced with server!';
    syncNotification.style.display = 'block';
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
      syncNotification.style.display = 'none';
    }, 3000);
  }
  
  // Fetch quotes from the server
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch(API_URL);
      const serverQuotes = await response.json();
      return serverQuotes.map(item => ({ text: item.title, category: "General" }));
    } catch (error) {
      console.error('Error fetching quotes from the server:', error);
      return [];
    }
  }
  
  // Sync quotes between local and server
  async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
  
    // Merge server quotes with local quotes (without duplicates)
    serverQuotes.forEach(serverQuote => {
      if (!quotes.some(localQuote => localQuote.text === serverQuote.text)) {
        quotes.push(serverQuote);
      }
    });
  
    saveQuotes();
    populateCategories();
    filterQuotes();
  
    // Notify the user
    alert('Quotes synced with server!');
  }
  
  // Add the rest of your functions here as needed
  
  // Load existing quotes and start sync on page load
  document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    filterQuotes();
    
    document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);
    
    // Start server sync
    startSync();
  });
  



  

