import { setActiveButton, setStartSection, mealbtn } from "./sidebar.js"
import { displayRecipes } from "./displayRecipes.js"
import { displayAvailableCuisine, displayCategories } from "./searchMeal.js";
export async function onStartPage() {
    setStartSection();
    setActiveButton(mealbtn);
    await displayRecipes();
    await displayAvailableCuisine();
    await displayCategories();
}