export const mealSection = document.getElementById("all-recipes-section");
export const productsSection = document.getElementById("products-section");
export const foodLogSection = document.getElementById("foodlog-section");
export const mealDetailSection = document.getElementById("meal-details")
export let categorySection = document.getElementById("meal-categories-section");
export let searchSection = document.getElementById("search-filters-section");
export const mealbtn = document.getElementById("meals-link");
export const productbtn = document.getElementById("products-link");
export const foodlogbtn = document.getElementById("foodlog-link");
import { refreshFoodLogUI } from "./displayLoggedFood.js";

     document.querySelectorAll("section").forEach(element => {
        element.classList.add("hidden");
     });

export function setStartSection(){
    productsSection.classList.add("hidden");
    foodLogSection.classList.add("hidden");
    categorySection.classList.remove("hidden");
    searchSection.classList.remove("hidden");
    mealSection.classList.remove("hidden");
    document.querySelector("#header h1").innerHTML = "Meals & Recipes"
    document.querySelector("#header p").innerHTML = "Discover delicious and nutritious recipes tailored for you"
}

export function setActiveButton(activeButton) {
        document.querySelectorAll(".nav-link").forEach(button => {
        button.classList.remove("bg-emerald-50", "text-emerald-700");
        button.classList.add("text-gray-600", "hover:bg-gray-50");
    });

    activeButton.classList.remove("text-gray-600", "hover:bg-gray-50");
    activeButton.classList.add("bg-emerald-50", "text-emerald-700");
}
     
mealbtn.addEventListener("click",()=>{
    productsSection.classList.add("hidden");
    foodLogSection.classList.add("hidden");
    categorySection.classList.remove("hidden");
    searchSection.classList.remove("hidden");
    mealSection.classList.remove("hidden");
    setActiveButton(mealbtn);
    document.querySelector("#header h1").innerHTML = "Meals & Recipes"
    document.querySelector("#header p").innerHTML = "Discover delicious and nutritious recipes tailored for you"
 
});

productbtn.addEventListener("click",()=>{
    productsSection.classList.remove("hidden");
    foodLogSection.classList.add("hidden");
    categorySection.classList.add("hidden");
    searchSection.classList.add("hidden");
    mealSection.classList.add("hidden");
    mealDetailSection.classList.add("hidden");
    setActiveButton(productbtn);
    document.querySelector("#header h1").innerHTML = "Product Scanner"
    document.querySelector("#header p").innerHTML = "Search packaged foods by name or barcode"
});

foodlogbtn.addEventListener("click",()=>{
    productsSection.classList.add("hidden");
    foodLogSection.classList.remove("hidden");
    categorySection.classList.add("hidden");
    searchSection.classList.add("hidden");
    mealDetailSection.classList.add("hidden")
    mealSection.classList.add("hidden");
    setActiveButton(foodlogbtn);
        document.querySelector("#header h1").innerHTML = "Food Log"
    document.querySelector("#header p").innerHTML = "Track your daily nutrition and food intake"
    refreshFoodLogUI();
});


//  toggle
document.getElementById("header-menu-btn").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
    document.body.classList.toggle("sidebar-open");
});

// Close button
document.getElementById("sidebar-close-btn").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-overlay").classList.remove("active");
    document.body.classList.remove("sidebar-open");
});


document.getElementById("sidebar-overlay").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-overlay").classList.remove("active");
    document.body.classList.remove("sidebar-open");
});