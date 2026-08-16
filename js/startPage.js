import { setActiveButton, setStartSection, mealbtn } from "./sidebar.js"
import { displayRecipes } from "./displayRecipes.js"
import { displayAvailableCuisine, displayCategories } from "./searchMeal.js";
import { displayProducts } from "./displayProducts.js";
import {displayProductsCategories} from'./displayProductsCatergories.js'
import { displayLoggedFood,displayWeeklyOverview } from "./displayLoggedFood.js";
export async function onStartPage() {
    setStartSection();
    setActiveButton(mealbtn);
    await displayRecipes();
    await displayAvailableCuisine();
    await displayCategories();
    await displayProducts();
    await displayProductsCategories();
    displayLoggedFood();
    displayWeeklyOverview();
}