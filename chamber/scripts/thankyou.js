//Thankyou.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const detailsDiv = document.getElementById('submission-details');
    const nameSpan = document.getElementById('applicant-name');

    // Define a map of the required field names to their display labels
    const requiredFields = {
        'fname': "First Name",
        'lname': "Last Name",
        'email': "Email Address",
        'phone': "Mobile Phone",
        'bizname': "Business/Organization",
        'timestamp': "Submission Date/Time"
    };

    let html = '<ul>';
    let dataFound = false;
    let firstName = '';
    let lastName = '';

    for (const [key, label] of Object.entries(requiredFields)) {
        if (params.has(key)) {
            dataFound = true;
            let value = decodeURIComponent(params.get(key));

            if (key === 'fname') firstName = value;
            if (key === 'lname') lastName = value;

            // Special formatting for the timestamp
            if (key === 'timestamp') {
                try {
                    // Format the ISO timestamp into a more human-readable format
                    const date = new Date(value);
                    value = date.toLocaleDateString('en-US', { dateStyle: 'medium' }) + ' at ' + date.toLocaleTimeString('en-US', { timeStyle: 'short' });
                } catch (e) {
                    // Keep original value if formatting fails
                }
            }

            html += `<li><strong>${label}:</strong> <span>${value}</span></li>`;
        }
    }

    html += '</ul>';

    if (dataFound) {
        detailsDiv.innerHTML = html;
        if (firstName || lastName) {
            nameSpan.textContent = `${firstName} ${lastName}`.trim();
        } else {
            nameSpan.textContent = 'valued applicant';
        }
    } else {
        detailsDiv.innerHTML = '<p>No required form data was found. Please ensure the form submission was successful.</p>';
        nameSpan.textContent = 'valued applicant';
    }
});
