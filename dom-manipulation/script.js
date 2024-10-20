document.addEventListener('DOMContentLoaded', () => {
    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');
    const addQuoteBtn = document.getElementById('add-quote-btn');
    const quoteList = document.getElementById('quote-list');

    // Load quotes from local storage when the page loads
    loadQuotes();

    // Add event listener for adding a new quote
    addQuoteBtn.addEventListener('click', () => {
        const quoteText = quoteInput.value.trim();
        const authorText = authorInput.value.trim();

        if (quoteText && authorText) {
            const newQuote = {
                quote: quoteText,
                author: authorText,
            };

            // Add the new quote to the list and local storage
            addQuoteToDOM(newQuote);
            saveQuoteToLocalStorage(newQuote);

            // Clear the input fields
            quoteInput.value = '';
            authorInput.value = '';
        } else {
            alert('Please enter both a quote and an author.');
        }
    });

    // Load saved quotes from local storage
    function loadQuotes() {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedQuotes.forEach(addQuoteToDOM);
    }

    // Add quote to the DOM
    function addQuoteToDOM(quoteObj) {
        const li = document.createElement('li');
        li.innerHTML = `
            "${quoteObj.quote}" - ${quoteObj.author}
            <button class="remove-btn">Remove</button>
        `;
        li.querySelector('.remove-btn').addEventListener('click', () => {
            removeQuote(quoteObj.quote);
            li.remove();
        });
        quoteList.appendChild(li);
    }

    // Save quote to local storage
    function saveQuoteToLocalStorage(quoteObj) {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedQuotes.push(quoteObj);
        localStorage.setItem('quotes', JSON.stringify(storedQuotes));
    }

    // Remove quote from local storage
    function removeQuote(quoteText) {
        let storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedQuotes = storedQuotes.filter(quote => quote.quote !== quoteText);
        localStorage.setItem('quotes', JSON.stringify(storedQuotes));
    }
});
