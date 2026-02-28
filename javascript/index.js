
// Saves the API key
const API_KEY = "live_2fqUbog9drU7su5QctIXN85TRIPAhfokvXF2wWn4Uws7nYjVU2sXQTJjf7q7pUH4";

// Global variable to store dog data
let allDogs = [];


// Gets form and inputs
const form = document.querySelector("#dog-form");
const breedInput = document.querySelector("#breedName");
const temperamentSelect = document.querySelector("#temperament");

// Load dog data when page loads
document.addEventListener("DOMContentLoaded", loadDogs);

function loadDogs() {
	const url = "https://api.thedogapi.com/v1/breeds";

	fetch(url, {
		headers: {
			"x-api-key": API_KEY
		}
	})
		.then((res) => res.json())
		.then((data) => {
			allDogs = data; // Save dog data globally
			console.log("Dog data loaded");
		})
		.catch((err) => console.error("API Error:", err));
}


// Event listener
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
	event.preventDefault();

	// Get user input values
	const breedValue = breedInput.value.toLowerCase();
	const temperamentValue = temperamentSelect.value.toLowerCase();

	// Search dogs based on input
	searchDogs(breedValue, temperamentValue);

	// Reset form after submission
	form.reset();
}

// Search dogs based on breed + temperament
function searchDogs(breedValue, temperamentValue) {

	let filteredDogs = allDogs;

	// If breed name is entered
	if (breedValue) {
		filteredDogs = filteredDogs.filter(dog =>
			dog.name.toLowerCase().includes(breedValue)
		);
	}

	// If temperament is selected
	if (temperamentValue) {
		filteredDogs = filteredDogs.filter(dog => {
			if (!dog.temperament) return false;

			const temperamentArray =
				dog.temperament.toLowerCase().split(", ");

			return temperamentArray.includes(temperamentValue);
		});
	}

	// Display results
	showDogs(filteredDogs);
}

// Display dogs on page
function showDogs(dogs) {
    const container = document.querySelector("#dog-container");
    container.innerHTML = "";

    // If no results found
    if (dogs.length === 0) {
        container.innerHTML = "<p>No dogs found matching your search.</p>";
        return;
    }

    // Create cards
    dogs.forEach((dog) => {
        const card = document.createElement("div");
        card.className = "dog-card";

        const imageUrl =
            dog.image?.url ||
            "https://via.placeholder.com/300x200?text=No+Image";

        card.innerHTML = `
          <img src="${imageUrl}" alt="${dog.name}">
          <div class="dog-name"><strong>${dog.name}</strong></div>
          <div><strong>Life Span:</strong> ${dog.life_span || "Unknown"}</div>
          <div><strong>Temperament:</strong> ${dog.temperament || "Unknown"}</div>
        `;

        container.appendChild(card);
    });
}
