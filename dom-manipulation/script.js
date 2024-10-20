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

  document.getElementById('sync-status').innerText = 'Data synced successfully!';
}

// Post a new quote to the server (simulated)
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: quote.text })
    });

    if (response.ok) {
      console.log('Quote posted to server successfully.');
    } else {
      console.error('Failed to post quote to the server.');
    }
  } catch (error) {
    console.error('Error posting quote to the server:', error);
  }
}

// Add a new quote and sync it to the server
function addQuote(newQuoteText, newQuoteCategory) {
  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();

  // Post the new quote to the server
  postQuoteToServer(newQuote);
}

// Periodically sync with the server every 30 seconds
function startSync() {
  localSyncInterval = setInterval(syncQuotes, 30000); // 30 seconds
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

