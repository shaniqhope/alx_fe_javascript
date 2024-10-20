// Step 2: Initial Setup

// Array of quote objects (Initial quotes or loaded from localStorage)
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
  ];
  
  // Function to save the quotes array to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
  }
  
  // Function to populate the categories dropdown dynamically
  function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
    const categoryFilter = document.getElementById('categoryFilter');
  
    // Clear existing options and add "All Categories" option
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore the last selected filter from localStorage
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      categoryFilter.value = savedCategory;
      filterQuotes();
    }
  }
  
  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Save the selected filter to localStorage
    localStorage.setItem('selectedCategory', selectedCategory);
  
    // Filter quotes based on the selected category
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
    // Display the filtered quotes
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      document.getElementById('quoteDisplay').innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
    } else {
      document.getElementById('quoteDisplay').innerHTML = '<p>No quotes available for this category.</p>';
    }
  }
  
  // Function to dynamically create the form for adding quotes
  function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    
    formDiv.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteButton">Add Quote</button>
    `;
    
    document.body.appendChild(formDiv);
    
    // Add event listener to the new "Add Quote" button
    document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  }
  
  // Function to add a new quote to the array and update the DOM
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Save the updated quotes to localStorage
      saveQuotes();
  
      // Update the categories in the dropdown
      populateCategories();
  
      // Clear input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Provide feedback that the quote was added successfully
      alert('New quote added successfully!');
  
      // Optionally, show the newly added quote
      filterQuotes();
    } else {
      alert('Please enter both a quote and a category.');
    }
  }
  
  // Function to export quotes as a JSON file
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
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    
    fileReader.onload = function(event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          populateCategories();
          alert('Quotes imported successfully!');
        } else {
          alert('Invalid JSON format. Please upload a valid quotes array.');
        }
      } catch (error) {
        alert('Error parsing JSON file.');
      }
    };
    
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Add event listener to the Export Quotes button
  document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);
  
  // Add event listener to the file input for importing JSON
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  // Load existing quotes and initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    populateCategories(); // Dynamically populate categories
    createAddQuoteForm(); // Dynamically create the form on page load
    filterQuotes(); // Apply the filter based on the last selected category
  });
  