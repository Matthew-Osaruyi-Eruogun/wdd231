// Function to handle form submission
const handleFormSubmit = (event) => {
    event.preventDefault();

    // 1. Capture Form Data
    const fabricName = document.getElementById('fabricName').value;
    const fabricCost = parseFloat(document.getElementById('fabricCost').value);
    const tailorFee = parseFloat(document.getElementById('tailorFee').value);

    // 2. Simple Validation
    if (isNaN(fabricCost) || isNaN(tailorFee)) {
        alert("Please enter valid numeric amounts for costs.");
        return;
    }

    // 3. Create Unique Outfit Object
    const newOutfit = {
        id: `outfit-${Date.now()}`, // Unique ID using timestamp
        name: fabricName,
        cost: fabricCost,
        fee: tailorFee,
        total: fabricCost + tailorFee,
        date: new Date().toLocaleDateString()
    };

    // 4. Save to localStorage
    saveToStorage(newOutfit);

    // 5. Reset form and provide feedback
    document.getElementById('outfitForm').reset();
    alert("Outfit logged successfully!");
};

// Helper function to manage localStorage
const saveToStorage = (outfit) => {
    // Get existing data or initialize empty array
    const currentData = JSON.parse(localStorage.getItem('asoEbiData')) || [];

    // Add new outfit to the array
    currentData.push(outfit);

    // Save back to localStorage as a JSON string
    localStorage.setItem('asoEbiData', JSON.stringify(currentData));
};

// Event Listener
document.getElementById('outfitForm').addEventListener('submit', handleFormSubmit);