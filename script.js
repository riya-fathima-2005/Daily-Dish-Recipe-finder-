// STEP 1: SEARCH RECIPES
async function searchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    const res = await fetch(url);
    const data = await res.json();

    displayRecipes(data.meals);
}

// STEP 2: DISPLAY RECIPES
const container = document.getElementById("recipeContainer");

function displayRecipes(meals) {
    container.innerHTML = "";

    if (!meals) {
        container.innerHTML = "<h2>No recipes found</h2>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><b>Category:</b> ${meal.strCategory}</p>
            <p><b>Area:</b> ${meal.strArea}</p>
            <button onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
        `;

        container.appendChild(card);
    });
}

// STEP 3: VIEW FULL RECIPE
async function viewRecipe(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();

    const meal = data.meals[0];

    alert(meal.strInstructions);
}


async function viewRecipe(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    // Collect Ingredients
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        let item = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        if (item && item.trim() !== "") {
            ingredients += `<li>${item} - ${measure}</li>`;
        }
    }

    // Insert HTML
    document.getElementById("recipeView").innerHTML = `
        <img src="${meal.strMealThumb}">
        <h2>${meal.strMeal}</h2>
        <p><b>Category:</b> ${meal.strCategory}</p>
        <p><b>Area:</b> ${meal.strArea}</p>

        <h3>Ingredients</h3>
        <ul>${ingredients}</ul>

        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;

    // Show card
    document.getElementById("recipeView").classList.remove("hidden");
}


// STEP 4: LIVE SEARCH
document.getElementById("searchBar").addEventListener("keyup", function () {
    const text = this.value.trim();

    if (text.length > 0) {
        searchRecipes(text);
    } else {
        container.innerHTML = "";
    }
});

