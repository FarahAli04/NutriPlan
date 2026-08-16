import { displayLoggedFood } from "./displayLoggedFood.js";

export function getloggedMeals(){
    const loggedMeals = localStorage.getItem("loggedItems");
    return loggedMeals ? JSON.parse(loggedMeals) : [];
}

export function logMeal(meal){
   const loggedMeals = getloggedMeals();
   loggedMeals.push(meal);
   localStorage.setItem("loggedItems",JSON.stringify(loggedMeals));
}

export function deleteTodayLoggedItems(){
    const allFood = getloggedMeals();
    const todayDate = new Date().toISOString().split('T')[0];
    const remaining = allFood.filter(e=>{e.date.split('T')[0] !== todayDate});
    localStorage.setItem('loggedItems',JSON.stringify(remaining))
}

export function deleteSingleLoggedItem(itemId) {
    const loggedMeals = getloggedMeals();
    const filtered = loggedMeals.filter(item => item.id !== itemId);
    localStorage.setItem("loggedItems", JSON.stringify(filtered));
}