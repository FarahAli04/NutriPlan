const mealSection = document.getElementById("all-recipes-section");
const productsSection = document.getElementById("products-section");
const foodLogSection = document.getElementById("foodlog-section");
let categorySection = document.getElementById("meal-categories-section");
let searchSection = document.getElementById("search-filters-section");
export const mealbtn = document.getElementById("meals-link");
const productbtn = document.getElementById("products-link");
const foodlogbtn = document.getElementById("foodlog-link");


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
    setActiveButton(productbtn);
    document.querySelector("#header h1").innerHTML = "Product Scanner"
    document.querySelector("#header p").innerHTML = "Search packaged foods by name or barcode"
});

foodlogbtn.addEventListener("click",()=>{
    productsSection.classList.add("hidden");
    foodLogSection.classList.remove("hidden");
    categorySection.classList.add("hidden");
    searchSection.classList.add("hidden");
    mealSection.classList.add("hidden");
    setActiveButton(foodlogbtn);
        document.querySelector("#header h1").innerHTML = "Food Log"
    document.querySelector("#header p").innerHTML = "Track your daily nutrition and food intake"
});


