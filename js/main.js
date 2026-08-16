import { onStartPage } from './startPage.js';
import { searchMeals } from './searchMeal.js';
import { fireRecipeInstruction } from "./recipeInstruction.js"; 
import { mealSection,categorySection,searchSection } from './sidebar.js';
import "./searchProduct.js";
import {openModal} from "./searchProduct.js"
import { fetchProductByBarcode } from './api/productsdb.js';
import { getloggedMeals } from './foodlog.js';
import { hideLoadingOverlay,showLoadingOverlay } from './loadingOverlay.js';
// Start Page
showLoadingOverlay();
await onStartPage();
hideLoadingOverlay();
// search logic
searchMeals();

document.getElementById("recipes-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return; 
    fireRecipeInstruction(card.getAttribute("data-meal-id"));
    document.getElementById("meal-details").classList.remove("hidden");
    mealSection.classList.add("hidden");
    categorySection.classList.add("hidden");
    searchSection.classList.add("hidden");
});

document.getElementById("products-grid").addEventListener("click", async (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const barcode = card.getAttribute("data-barcode");

    if (!barcode) return;

    const product = await fetchProductByBarcode(barcode);

    if (!product) {
        showToast("error", "Product not found.");
        return;
    }

    openModal(product);
});

// foodLog section
document.getElementById("foodlog-date").innerHTML = new Date().toLocaleDateString('en-US',{
    weekday: 'long', 
    month: 'short',  
    day: 'numeric' 
});

