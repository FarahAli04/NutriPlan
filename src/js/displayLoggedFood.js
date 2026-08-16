import { getloggedMeals , deleteTodayLoggedItems ,deleteSingleLoggedItem} from "./foodlog.js";
import { mealSection, categorySection, searchSection, productsSection, foodLogSection, mealDetailSection } from "./sidebar.js";
import { setActiveButton, mealbtn, productbtn,setStartSection } from "./sidebar.js";
const todayKey = new Date().toISOString().split('T')[0];

export function displayLoggedFood() {
    const todaysNutrition = document.getElementById("foodlog-today-section");
    const loggedMeals = getloggedMeals();

    const todayFood = loggedMeals.filter(entry=>{
        const entryDateKey = entry.date.split("T")[0];
    return entryDateKey === todayKey;
    })

    let totalCal = 0, totalPro = 0, totalCarb = 0, totalFat = 0;
    todayFood.forEach((element) => {
        const nutrition = element.nutrition || {};
        let calories = 0, protein = 0, carbs = 0, fat = 0;
        
        
        if (nutrition.recipeName || nutrition.perServing) {
           
            const perServing = nutrition.perServing || {};
            calories = perServing.calories || 0;
            protein = perServing.protein || 0;
            carbs = perServing.carbs || 0;
            fat = perServing.fat || 0;
        } else {
            
            calories = nutrition.calories || 0;
            protein = nutrition.protein || 0;
            carbs = nutrition.carbs || 0;
            fat = nutrition.fat || 0;
        }
        
        totalCal += calories;
        totalPro += protein;
        totalCarb += carbs;
        totalFat += fat;
    });

    const itemsHTML = todayFood.length > 0
        ? todayFood.map(itemCardHTML).join("")
        : `<div class="text-center py-12">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-utensils text-3xl text-gray-300"></i>
                </div>
                <p class="text-gray-500 font-medium mb-2">No food logged today</p>
                <p class="text-gray-400 text-sm mb-4">Start tracking your nutrition by logging meals or scanning products</p>
                <div class="flex justify-center gap-3">
                    <a href="#all-recipes-section" class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all" id="browseBtn">
                        <i class="fa-solid fa-plus"></i> Browse Recipes
                    </a>
                    <a href="#products-section" class="nav-link inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all" id="scanBtn">
                        <i class="fa-solid fa-barcode"></i> Scan Product
                    </a>
                </div>
           </div>`;

    todaysNutrition.innerHTML = `
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          <i class="fa-solid fa-fire text-orange-500 mr-2"></i>
          Today's Nutrition
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-emerald-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Calories</span>
              <span class="text-sm text-gray-500">${totalCal.toFixed(0)} / 2000 kcal</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-emerald-500 h-2.5 rounded-full" style="width: ${Math.min(100, (totalCal / 2000) * 100)}%"></div>
            </div>
          </div>
          <div class="bg-blue-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Protein</span>
              <span class="text-sm text-gray-500">${totalPro.toFixed(1)} / 50 g</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-blue-500 h-2.5 rounded-full" style="width: ${Math.min(100, (totalPro / 50) * 100)}%"></div>
            </div>
          </div>
          <div class="bg-amber-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Carbs</span>
              <span class="text-sm text-gray-500">${totalCarb.toFixed(1)} / 250 g</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-amber-500 h-2.5 rounded-full" style="width: ${Math.min(100, (totalCarb / 250) * 100)}%"></div>
            </div>
          </div>
          <div class="bg-purple-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Fat</span>
              <span class="text-sm text-gray-500">${totalFat.toFixed(1)} / 65 g</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-purple-500 h-2.5 rounded-full" style="width: ${Math.min(100, (totalFat / 65) * 100)}%"></div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-gray-700">Logged Items (${todayFood.length})</h4>
            <button id="clear-foodlog" class="text-red-500 hover:text-red-600 text-sm font-medium" style="display: ${todayFood.length > 0 ? 'block' : 'none'}">
              <i class="fa-solid fa-trash mr-1"></i>Clear All
            </button>
          </div>
          <div id="logged-items-list" class="space-y-2">
            ${itemsHTML}
          </div>
        </div>
    `;
     attachEventListeners();
     
}

function itemCardHTML(item) {
   
    const nutrition = item.nutrition || {};
    
  
    let calories = 0, protein = 0, carbs = 0, fat = 0;
    
   
    if (nutrition.recipeName || nutrition.perServing) {
        
        const perServing = nutrition.perServing || {};
        calories = perServing.calories || 0;
        protein = perServing.protein || 0;
        carbs = perServing.carbs || 0;
        fat = perServing.fat || 0;
    } else {
       
        calories = nutrition.calories || 0;
        protein = nutrition.protein || 0;
        carbs = nutrition.carbs || 0;
        fat = nutrition.fat || 0;
    }

    let subtitle = '';
    if (item.type === 'meal') {
        const servings = item.servings || 1;
        subtitle = `${servings} serving${servings !== 1 ? 's' : ''} <span class="mx-1">•</span> <span class="text-emerald-600">Recipe</span>`;
    } else if (item.type === 'product') {
        subtitle = `${item.brand || ''} <span class="mx-1">•</span> <span class="text-blue-600">Product</span>`;
    } else {
        subtitle = `<span class="text-gray-500">Logged item</span>`;
    }

    let timeString = '';
    if (item.time) {
        timeString = item.time;
    } else if (item.date) {
        try {
            timeString = new Date(item.date).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
            });
        } catch (e) {
            timeString = 'Time unknown';
        }
    }

    return `
    <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
        <div class="flex items-center gap-4">
            <img src="${item.img || ''}" alt="${item.name || 'Item'}" class="w-14 h-14 rounded-xl object-cover">
            <div>
                <p class="font-semibold text-gray-900">${item.name || 'Unknown Item'}</p>
                <p class="text-sm text-gray-500">${subtitle}</p>
                <p class="text-xs text-gray-400 mt-1">${timeString}</p>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="text-right">
                <p class="text-lg font-bold text-emerald-600">${calories.toFixed(0)}</p>
                <p class="text-xs text-gray-500">kcal</p>
            </div>
            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                <span class="px-2 py-1 bg-blue-50 rounded">${protein.toFixed(1)}g P</span>
                <span class="px-2 py-1 bg-amber-50 rounded">${carbs.toFixed(1)}g C</span>
                <span class="px-2 py-1 bg-purple-50 rounded">${fat.toFixed(1)}g F</span>
            </div>
            <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-log-id="${item.id || ''}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>`;
}

// clear all btn

function attachEventListeners(){
    document.getElementById("clear-foodlog").addEventListener("click", () => {
    swal.fire({
        title: "Clear All Logged Items?",
        text: "This will remove all food items logged for today. This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, clear all",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteTodayLoggedItems();
            refreshFoodLogUI();
          }
    });
});

// clear one item btn 

  document.querySelectorAll(".remove-foodlog-item").forEach(btn => {
        // Remove old listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener("click", (e) => {
            const logId = e.currentTarget.getAttribute("data-log-id");
            if (logId) {
                deleteSingleLoggedItem(logId);
               refreshFoodLogUI();
            }
        });
    });

  
        const browseBtn = document.getElementById("browseBtn");
    if (browseBtn) {
        browseBtn.addEventListener("click", () => {
            // Make sure these variables are accessible
            if (typeof productsSection !== 'undefined') productsSection.classList.add("hidden");
            if (typeof foodLogSection !== 'undefined') foodLogSection.classList.add("hidden");
            if (typeof categorySection !== 'undefined') categorySection.classList.remove("hidden");
            if (typeof searchSection !== 'undefined') searchSection.classList.remove("hidden");
            if (typeof mealSection !== 'undefined') mealSection.classList.remove("hidden");
            
            // Set active button if function exists
            if (typeof setActiveButton === 'function' && typeof mealbtn !== 'undefined') {
                setActiveButton(mealbtn);
            }
            
            // Update header
            const headerTitle = document.querySelector("#header h1");
            const headerDesc = document.querySelector("#header p");
            if (headerTitle) headerTitle.innerHTML = "Meals & Recipes";
            if (headerDesc) headerDesc.innerHTML = "Discover delicious and nutritious recipes tailored for you";
        });
    }

    // Scan Product button - with null check
    const scanBtn = document.getElementById("scanBtn");
    if (scanBtn) {
        scanBtn.addEventListener("click", () => {
            if (typeof productsSection !== 'undefined') productsSection.classList.remove("hidden");
            if (typeof foodLogSection !== 'undefined') foodLogSection.classList.add("hidden");
            if (typeof categorySection !== 'undefined') categorySection.classList.add("hidden");
            if (typeof searchSection !== 'undefined') searchSection.classList.add("hidden");
            if (typeof mealSection !== 'undefined') mealSection.classList.add("hidden");
            if (typeof mealDetailSection !== 'undefined') mealDetailSection.classList.add("hidden");
            
            if (typeof setActiveButton === 'function' && typeof productbtn !== 'undefined') {
                setActiveButton(productbtn);
            }
            
            const headerTitle = document.querySelector("#header h1");
            const headerDesc = document.querySelector("#header p");
            if (headerTitle) headerTitle.innerHTML = "Product Scanner";
            if (headerDesc) headerDesc.innerHTML = "Search packaged foods by name or barcode";
        });
    }

}

function getNutritionValues(item) {
    const nutrition = item.nutrition || {};
    if (nutrition.recipeName || nutrition.perServing) {
        const perServing = nutrition.perServing || {};
        return {
            calories: perServing.calories || 0,
            protein: perServing.protein || 0,
            carbs: perServing.carbs || 0,
            fat: perServing.fat || 0
        };
    }
    return {
        calories: nutrition.calories || 0,
        protein: nutrition.protein || 0,
        carbs: nutrition.carbs || 0,
        fat: nutrition.fat || 0
    };
}

function getWeekDates() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const diffToMonday = day === 0 ? -6 : 1 - day; // if today is Sunday, go back 6 days to reach Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const week = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        week.push(d);
    }
    return week;
}

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DAILY_CALORIE_GOAL = 2000;
const GOAL_TOLERANCE = 0.1;

export function displayWeeklyOverview() {
    const container = document.getElementById("weekly-chart");
    const loggedMeals = getloggedMeals();
    const weekDates = getWeekDates();
    const todayKey = new Date().toISOString().split('T')[0];

    const daysData = weekDates.map((d, index) => {
        const dateKey = d.toISOString().split('T')[0];
        const entriesForDay = loggedMeals.filter(e => e.date.split('T')[0] === dateKey);
        const totalCal = entriesForDay.reduce((sum, e) => sum + getNutritionValues(e).calories, 0);

        return {
            label: dayLabels[index],
            dateNum: d.getDate(),
            totalCal,
            itemCount: entriesForDay.length,
            isToday: dateKey === todayKey
        };
    });

    // Render the 7 day cards
    container.className = "grid grid-cols-7 gap-2 md:gap-4 rounded-xl";
    container.innerHTML = daysData.map(day => `
        <div class="rounded-xl p-3 text-center ${day.isToday ? 'bg-indigo-100' : ''}">
            <p class="text-xs font-medium ${day.isToday ? 'text-indigo-600' : 'text-gray-500'} mb-1">${day.label}</p>
            <p class="text-sm font-bold text-gray-900 mb-3">${day.dateNum}</p>
            <p class="text-lg font-bold ${day.totalCal > 0 ? 'text-emerald-600' : 'text-gray-300'}">${day.totalCal.toFixed(0)}</p>
            <p class="text-xs ${day.totalCal > 0 ? 'text-gray-500' : 'text-gray-300'} mb-1">kcal</p>
            ${day.itemCount > 0 ? `<p class="text-xs text-gray-400">${day.itemCount} item${day.itemCount !== 1 ? 's' : ''}</p>` : ''}
        </div>
    `).join("");

    // --- Toggle between empty-state buttons and stat cards ---
    const totalItemsThisWeek = daysData.reduce((sum, d) => sum + d.itemCount, 0);
    const emptyMealsEl = document.getElementById("empty-meals");
    const nonEmptyMealsEl = document.getElementById("non-empty-meals");

    if (totalItemsThisWeek === 0) {
        emptyMealsEl.classList.remove("hidden");
        nonEmptyMealsEl.classList.add("hidden");
        return; // nothing to calculate — skip the stat math below entirely
    }

    emptyMealsEl.classList.add("hidden");
    nonEmptyMealsEl.classList.remove("hidden");

    // --- Stat calculations (only run when there's data) ---
    const totalWeekCalories = daysData.reduce((sum, d) => sum + d.totalCal, 0);
    const weeklyAverage = totalWeekCalories / 7;

    const daysOnGoal = daysData.filter(d => {
        if (d.totalCal === 0) return false;
        const lowerBound = DAILY_CALORIE_GOAL * (1 - GOAL_TOLERANCE);
        const upperBound = DAILY_CALORIE_GOAL * (1 + GOAL_TOLERANCE);
        return d.totalCal >= lowerBound && d.totalCal <= upperBound;
    }).length;

    document.getElementById("weekly-average-value").textContent = `${weeklyAverage.toFixed(0)} kcal`;
    document.getElementById("weekly-items-value").textContent = `${totalItemsThisWeek} item${totalItemsThisWeek !== 1 ? 's' : ''}`;
    document.getElementById("days-on-goal-value").textContent = `${daysOnGoal} / 7`;
}




export function refreshFoodLogUI() {
    displayLoggedFood();
    displayWeeklyOverview();
}



document.querySelector(".grid.grid-cols-1.md\\:grid-cols-3").addEventListener("click", (e) => {
    const btn = e.target.closest(".quick-log-btn");
    if (!btn) return;

    const action = btn.getAttribute("data-action");

    if (action === "log-meal") {
        setStartSection();
        setActiveButton(mealbtn);
    } else if (action === "scan-product") {
       
        document.getElementById("products-section").classList.remove("hidden");
        document.getElementById("foodlog-section").classList.add("hidden");
        document.getElementById("meal-categories-section").classList.add("hidden");
        document.getElementById("search-filters-section").classList.add("hidden");
        document.getElementById("all-recipes-section").classList.add("hidden");
        setActiveButton(productbtn);
        document.querySelector("#header h1").innerHTML = "Product Scanner";
        document.querySelector("#header p").innerHTML = "Search packaged foods by name or barcode";
    }
});