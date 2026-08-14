// Meals API
export async function fetchMeals() {
    const response = await fetch("https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25");
    const MealData = await response.json();
    console.log(MealData.results);
    return MealData.results;
}

export async function fetchCuisine() {
const availableCuisine = await fetch(`https://nutriplan-api.vercel.app/api/meals/areas`);
const data = await availableCuisine.json();
// mapping !!!
 return data.results.map(area=>area.name);
}

export async function fetchCategory() {
const availableCuisine = await fetch(`https://nutriplan-api.vercel.app/api/meals/categories`);
const data = await availableCuisine.json();
// mapping !!!
 return data.results.map(category => category.name).slice(0,12);
}