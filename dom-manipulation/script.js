// Step 2: Initial Setup

// Array of quote objects (Initial quotes, could be overwritten by stored quotes)
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
  
      // Clear input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Provide feedback that the quote was added successfully
      alert('New quote added successfully!');
  
      // Optionally, show the newly added quote
      showRandomQuote();
    } else {
      alert('Please enter both a quote and a category.');
    }
  
    // Function to show a random quote and save it to sessionStorage
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Display the quote
    document.getElementById('quoteDisplay').innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
    
    // Save the last viewed quote in sessionStorage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
  }
  
  // Load the last viewed quote from sessionStorage when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
      const parsedQuote = JSON.parse(lastViewedQuote);
      document.getElementById('quoteDisplay').innerHTML = `<p>"${parsedQuote.text}" - ${parsedQuote.category}</p>`;
    } else {
      showRandomQuote();
    }
    createAddQuoteForm(); // Dynamically create the form on page load
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
  
  // Add event listener to the file input for importing JSON
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  // Add event listener to the Export Quotes button
  document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);
  
  
  // Attach event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Load existing quotes from localStorage and display a random quote when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm(); // Dynamically create the form on page load
  });
  


