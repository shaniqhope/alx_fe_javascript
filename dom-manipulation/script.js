ddocument.addEventListener('DOMContentLoaded', () => {
    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');
    const categoryInput = document.getElementById('category');
    const addQuoteBtn = document.getElementById('add-quote-btn');
    const quoteList = document.getElementById('quote-list');
    const showNewQuoteBtn = document.getElementById('show-new-quote-btn');

    loadQuotes();

    addQuoteBtn.addEventListener('click', addQuote);
    showNewQuoteBtn.addEventListener('click', displayRandomQuote);

    function loadQuotes() {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedQuotes.forEach(addQuoteToDOM);
    }
    function displayRandomQuote() {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');

        if (storedQuotes.length === 0) {
            document.getElementById('random-quote').textContent = 'No quotes available.';
            return;
        }
    function addQuoteToDOM(quoteObj) {
        const li = document.createElement('li');
        li.innerHTML = `
            "${quoteObj.text}" - ${quoteObj.author} [Category: ${quoteObj.category}]
            <button class="remove-btn">Remove</button>
        `;
        li.querySelector('.remove-btn').addEventListener('click', () => {
            removeQuote(quoteObj.text);
            li.remove();
        });
        quoteList.appendChild(li);
    }

    function saveQuoteToLocalStorage(quoteObj) {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedQuotes.push(quoteObj);
        localStorage.setItem('quotes', JSON.stringify(storedQuotes));
    }

    function removeQuote(quoteText) {
        let storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedQuotes = storedQuotes.filter(quote => quote.text !== quoteText);
        localStorage.setItem('quotes', JSON.stringify(storedQuotes));
    }

    function addQuote() {
        const quoteText = quoteInput.value.trim();
        const authorText = authorInput.value.trim();
        const categoryText = categoryInput.value.trim(); 

        if (quoteText && authorText && categoryText) {
            const newQuote = {
                text: quoteText,
                author: authorText,
                category: categoryText, 
            };

            addQuoteToDOM(newQuote);
            saveQuoteToLocalStorage(newQuote);

            quoteInput.value = '';
            authorInput.value = '';
            categoryInput.value = ''; 
        } else {
            alert('Please enter a quote, author, and category.');
        }
    }

        const randomIndex = Math.floor(Math.random() * storedQuotes.length);
        const randomQuote = storedQuotes[randomIndex];

        document.getElementById('random-quote').textContent = `"${randomQuote.text}" - ${randomQuote.author} [Category: ${randomQuote.category}]`;
    }
});


