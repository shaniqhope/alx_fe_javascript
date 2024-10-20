// Step 2: Initial Setup

// Simulate a mock server with JSONPlaceholder
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Server endpoint for simulation
let localSyncInterval;

// Array of quotes (loaded from localStorage or populated with initial quotes)
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
}

// Populate categories dynamically from quotes
function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);
  
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
  } else {
    document.getElementById('quoteDisplay').innerHTML = '<p>No quotes available for this category.</p>';
  }
}

// Function to add a new quote
function addQuote(newQuoteText, newQuoteCategory) {
  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes();
  populateCategories();
  filterQuotes();
}

// Sync data with server
async function syncWithServer() {
  try {
    // Fetch data from the server (simulated)
    const response = await fetch(API_URL);
    const serverQuotes = await response.json();
    
    // Simulate conflict resolution (Server data takes precedence)
    if (serverQuotes.length > quotes.length) {
      alert("Server data has been updated. Syncing with local data.");
      quotes = serverQuotes.map(item => ({ text: item.title, category: "General" })); // Mock categories for now
      saveQuotes();
      populateCategories();
      filterQuotes();
    }
    
    document.getElementById('sync-status').innerText = 'Data synced successfully!';
  } catch (error) {
    console.error('Error syncing with server:', error);
    document.getElementById('sync-status').innerText = 'Error syncing with server!';
  }
}

// Periodically sync with the server every 30 seconds
function startSync() {
  localSyncInterval = setInterval(syncWithServer, 30000); // 30 seconds
}

// UI for exporting quotes as JSON
function exportQuotesToJson() {
  const quotesJson = JSON.stringify(quotes);
  const blob = new Blob([quotesJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert('Quotes imported successfully!');
    } catch (error) {
      alert('Error parsing JSON file.');
    }
  };
  
  fileReader.readAsText(event.target.files[0]);
}

// Load existing quotes and start sync on page load
document.addEventListener('DOMContentLoaded', () => {
  populateCategories();
  filterQuotes();
  
  document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  // Start server sync
  startSync();
});
