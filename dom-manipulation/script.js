// Step 2: Initial Setup

// Array of quote objects
const quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
  ];
  
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
  }
  
  // Attach event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Display a random quote when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm(); // Dynamically create the form on page load
  });
  


