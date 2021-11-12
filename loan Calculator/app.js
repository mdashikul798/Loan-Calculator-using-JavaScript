document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Hide Result
    document.getElementById('result').style.display = 'none';

    // Show Loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateLoan, 2000);
    e.preventDefault();
});

function calculateLoan() {
    console.log('calculat');
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const year = document.getElementById('year');

    const monthlyPay = document.getElementById('monthly-pay');
    const totalPay = document.getElementById('total-pay');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(year.value) * 12;

    // Calculate Monthly Interest
    const x = Math.pow(1 + calculateInterest, calculatedPayments);
    const monthly = (principal * x * calculateInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPay.value = monthly.toFixed(2);
        totalPay.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Show Result
        document.getElementById('result').style.display = 'block';
        // Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your number!');

    }

}

// Show Error
function showError(error) {
    // Show Result
    document.getElementById('result').style.display = 'none';
    // Hide Loader
    document.getElementById('loading').style.display = 'none';
    // Create Div
    const errorDiv = document.createElement('div');
    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Create Class
    errorDiv.className = 'alert alert-danger';
    // Create Text Node and Append into Div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error above the Heading
    card.insertBefore(errorDiv, heading);

    // Clear Error After 3 Seconds
    setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}