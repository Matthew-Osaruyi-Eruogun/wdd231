/* log.js */
const handleFormSubmit = (event) => {
    // Capture Form Data
    const fabricName = document.getElementById('fabricName').value;
    const fabricCost = parseFloat(document.getElementById('fabricCost').value);
    const tailorFee = parseFloat(document.getElementById('tailorFee').value);

    // Create Unique Outfit Object
    const newOutfit = {
        id: `outfit-${Date.now()}`,
        name: fabricName,
        total: fabricCost + tailorFee,
        date: new Date().toLocaleDateString()
    };

    // Save to localStorage (Criterion 9)
    const currentData = JSON.parse(localStorage.getItem('asoEbiData')) || [];
    currentData.push(newOutfit);
    localStorage.setItem('asoEbiData', JSON.stringify(currentData));

    // NOTE: We do NOT preventDefault() here so the browser 
    // proceeds to the Form Action Page (thankyou.html)
};

const outfitForm = document.getElementById('outfitForm');
if (outfitForm) {
    outfitForm.addEventListener('submit', handleFormSubmit);
}