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
  
  // Add a new quote to the array and update the DOM
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Show feedback
      alert('New quote added successfully!');
    } else {
      alert('Please enter both a quote and a category.');
    }
  }
  
  // Attach event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Display a random quote when the page loads
  document.addEventListener('DOMContentLoaded', showRandomQuote);
  
  


