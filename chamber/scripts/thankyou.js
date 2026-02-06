document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const detailsDiv = document.getElementById('submission-details');
    const nameSpan = document.getElementById('applicant-name');

    // Mapped to match the 'name' attributes in the join.html form
    const requiredFields = {
        'fname': "First Name",
        'lname': "Last Name",
        'email': "Email Address",
        'phone': "Mobile Phone",
        'orgname': "Business/Organization", // Updated from bizname to orgname
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
                    const date = new Date(value);
                    // Checks if date is valid before formatting
                    if (!isNaN(date.getTime())) {
                        value = date.toLocaleDateString('en-US', { dateStyle: 'medium' }) +
                            ' at ' +
                            date.toLocaleTimeString('en-US', { timeStyle: 'short' });
                    }
                } catch (e) {
                    console.error("Timestamp formatting failed", e);
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
        detailsDiv.innerHTML = '<p>No application data was found. Please ensure you submitted the form correctly.</p>';
        nameSpan.textContent = 'valued applicant';
    }
});