// scripts/date.js

// Dynamically set the current year for the copyright
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Dynamically set the last modified date
// Note: document.lastModified returns a string and requires no manipulation per instructions.
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;