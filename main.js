// main.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const outputSection = document.querySelector('.output');
    const outputTableBody = document.querySelector('.output tbody');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form inputs
        const quantity = document.querySelector('input[name="quantity"]').value;
        const currency = document.querySelector('select[name="currency"]').value;

        if (!quantity || !currency) {
            alert('Please enter a valid quantity and select a currency.');
            return;
        }

        // Fetch exchange rates from an API
        fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
            .then(response => response.json())
            .then(data => {
                // Clear the previous output
                outputTableBody.innerHTML = '';

                // Show the output section
                outputSection.style.display = 'block';

                // Extract the rates and create rows in the table
                const rates = data.rates;
                for (let key in rates) {
                    const convertedValue = (quantity * rates[key]).toFixed(2);

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${getCurrencyName(key)}</td>
                        <td>${key}</td>
                        <td>${convertedValue}</td>
                    `;
                    outputTableBody.appendChild(row);
                }
            })
            .catch(error => {
                alert('Error fetching exchange rates. Please try again later.');
                console.error(error);
            });
    });

    // Helper function to get currency names for display purposes
    function getCurrencyName(code) {
        const currencyNames = {
            "INR": "Indian Rupee",
            "USD": "US Dollar",
            "EUR": "Euro",
            "GBP": "British Pound",
            "JPY": "Japanese Yen",
            // Add more currencies as needed
        };
        return currencyNames[code] || code;
    }
});
