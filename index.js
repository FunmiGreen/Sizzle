let logo = document.getElementById("logo");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let modalOverlay = document.getElementById("modal-overlay");
let closeIcon = document.getElementById("close-icon");
let staticCardsContainer = document.getElementById("static-cards-container");
let viewRecipe = document.getElementById("view-recipe");
let modalTitle = document.getElementById("modal-title");
let cookingTimeIcon = document.getElementById("cooking-time-icon");
let cardImage = document.getElementById("card-image");
let cardText = document.getElementById("card-text");
let searchResultsContainer = document.getElementById("search-results-container");
let firstCard = document.getElementById("first-card-container")
let searchCardsContainer = document.getElementById("search-cards-container")
let cardTextButton = document.getElementById("card-text-button");




// Dynamic landing page
// Fetch and display meals when the page loads
document.addEventListener("DOMContentLoaded", () => {
    recipeFinder(); 
});

function recipeFinder() {
    const endPoint = `https://themealdb.com/api/json/v1/1/search.php?s=`;
    staticCardsContainer.innerHTML = ``; 

    fetch(endPoint)
        .then((response) => response.json())
        .then((recipe) => {
            if (recipe.meals) {
                displayMeals(recipe.meals);
            } else {
                staticCardsContainer.innerHTML = `<p>No recipes found.</p>`;
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}

function displayMeals(meals) {
    staticCardsContainer.innerHTML = ""; 

    meals.forEach((meal) => {
        const firstCard = document.createElement("div");
        firstCard.classList.add("first-card-container");

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.src = meal.strMealThumb;

        const cardTextButton = document.createElement("div");
        cardTextButton.classList.add("card-text-button");

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = meal.strMeal;

        const cookingTime = document.createElement("div");
        cookingTime.classList.add("cooking-time");

        const timerIcon = document.createElement("img");
        timerIcon.src = "./Images/material-symbols_timer-outline-rounded.svg";

        const cookingTimeText = document.createElement("p");
        cookingTimeText.classList.add("cooking-time-text");
        cookingTimeText.textContent = `30mins`;

        firstCard.appendChild(cardImage);
        firstCard.appendChild(cardTextButton);
        cardTextButton.append(cardText, cookingTime);
        cookingTime.append(timerIcon, cookingTimeText);

        // firstCard.addEventListener("click", revealModalOverlay);

        firstCard.addEventListener("click", () => revealModalOverlay(meal));
        staticCardsContainer.appendChild(firstCard);
    });
}



// Search results from the search bar
searchButton.addEventListener(`click`, handleSearchResults)
function handleSearchResults(event){
    event.preventDefault();

    let searchResults = searchInput.value

    staticCardsContainer.style.display = "none";
    searchResultsContainer.style.display = "block";

    searchRecipes(searchResults)
}
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleSearchResults(event);
    }
});

// Dynamic search page content
function searchRecipes(searchResults) {
    searchResultsContainer.innerHTML = ""; // Clear previous results

    const endPoint = `https://themealdb.com/api/json/v1/1/search.php?s=${searchResults}`;

    fetch(endPoint)
        .then((response) => response.json())
        .then((results) => {
            if (!results.meals) {
                searchResultsContainer.innerHTML = `<p>No recipes found for "${searchResults}".</p>`;
                return;
            }

            results.meals.forEach((meal) => {
                const firstCard = document.createElement("div");
                firstCard.classList.add("first-card-container");

                const cardImage = document.createElement("img");
                cardImage.classList.add("card-image");
                cardImage.src = meal.strMealThumb;

                const cardTextButton = document.createElement("div");
                cardTextButton.classList.add("card-text-button");

                const cardText = document.createElement("p");
                cardText.classList.add("card-text");
                cardText.textContent = meal.strMeal;

                const cookingTime = document.createElement("div");
                cookingTime.classList.add("cooking-time");

                const timerIcon = document.createElement("img");
                timerIcon.src = "./Images/material-symbols_timer-outline-rounded.svg";

                const cookingTimeText = document.createElement("p");
                cookingTimeText.classList.add("cooking-time-text");
                cookingTimeText.textContent = `30mins`;

                cookingTime.append(timerIcon, cookingTimeText);
                cardTextButton.append(cardText, cookingTime);
                firstCard.append(cardImage, cardTextButton);

                firstCard.addEventListener("click", () => revealModalOverlay(meal));

                searchResultsContainer.appendChild(firstCard);
            });

            searchResultsContainer.style.display = "flex";
        })
        .catch((error) => {
            console.error("Error fetching search results:", error);
            searchResultsContainer.innerHTML = `<p>Something went wrong. Please try again.</p>`;
        });

}

// Open modal when any card is clicked
function revealModalOverlay(meal) {
    
    modalOverlay.innerHTML= "";
    const modalContainer = document.createElement("div")
    modalContainer.classList.add("modal-container");


    const closeIcon = document.createElement("div")
    closeIcon.classList.add("close-icon");

    const theCloseIcon = document.createElement("img")
    theCloseIcon.classList.add("the-close-icon")
    theCloseIcon.src = "./Images/proicons_cancel.svg";

    const theModalTitle = document.createElement("h2")
    theModalTitle.classList.add("the-modal-title");
    theModalTitle.textContent = meal.strMeal;
    
    
    const modalContent = document.createElement("div")
    modalContent.classList.add("modal-content")

    const modalImage = document.createElement("img")
    modalImage.classList.add("modal-image")
    modalImage.src = meal.strMealThumb;

    const cookingTime = document.createElement("div");
    cookingTime.classList.add("cooking-time");

    const timerIcon = document.createElement("img");
    timerIcon.src = "./Images/material-symbols_timer-outline-rounded.svg";

    const cookingTimeText = document.createElement("p");
    cookingTimeText.classList.add("cooking-time-text");
    cookingTimeText.textContent = `30mins`;
    
    const ingredients = document.createElement("div")
    ingredients.classList.add("ingredients");

    const ingredientsText = document.createElement("h3")
    ingredientsText.classList.add("ingredients-text")
    ingredientsText.textContent = "Ingredients:"

    const ingredientsList = document.createElement("ul")
    ingredientsList.classList.add("ingredient-list")
    ingredientsList.innerHTML = "";
    // loop through ingredients
    for (let i = 1; i <= 20; i++) { 
        let ingredient = meal[`strIngredient${i}`];

        if (ingredient) {
            let listItem = document.createElement("li");
            listItem.textContent = `${ingredient}`;
            ingredientsList.appendChild(listItem);
        }
    }

    const instructions = document.createElement("div")
    instructions.classList.add("instructions");

    const instructionsText = document.createElement("h3")
    instructionsText.classList.add("instructions-text");
    instructionsText.textContent = "Instructions:"

    const instructionsList = document.createElement("ol")
    instructionsList.classList.add("instructions-list")
    instructionsList.innerHTML = `<li>${meal.strInstructions}</li>`

    modalContent.append(closeIcon, theModalTitle, modalImage, cookingTime, ingredients, instructions);
    closeIcon.appendChild(theCloseIcon);
    cookingTime.append(timerIcon, cookingTimeText);
    ingredients.append(ingredientsText, ingredientsList);
    instructions.append(instructionsText, instructionsList);
    modalContainer.appendChild(modalContent);
    modalOverlay.append(modalContainer)

    modalOverlay.classList.remove("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")

    closeIcon.addEventListener("click", closeModalOverlay)
}

// Close the modal when the close icon is clicked
    function closeModalOverlay() {
            modalOverlay.classList.remove("modal-overlay-visible")
            modalOverlay.classList.add("modal-overlay")
        }
    
    
        modalOverlay.addEventListener("toggle", () => {
            document.body.classList.toggle("modal-open", modal.open);
        });


// Reload the landing page when the logo is clicked
logo.addEventListener("click", function() {
    window.location.href = "index.html";
})
