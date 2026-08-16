import { fetchProducts, fetchProductsByCategory, fetchProductByBarcode } from "./api/productsdb.js";
import { displayProducts } from "./displayProducts.js";
import { logMeal } from "./foodlog.js";
import { refreshFoodLogUI } from "./displayLoggedFood.js";
import { spinnerHTML } from "./loadingOverlay.js";
const gradeColors = { a: "bg-green-500", b: "bg-lime-500", c: "bg-yellow-500", d: "bg-orange-500", e: "bg-red-500" };
const novaColors = { 1: "bg-green-500", 2: "bg-lime-500", 3: "bg-yellow-500", 4: "bg-red-500" };

let availableProducts = [];
// search bar
document.getElementById("search-product-btn").addEventListener("click", async () => {
    const searchInput = document.getElementById("product-search-input");
    const productBrand = searchInput.value.trim();

    if (!productBrand) {
        displayProducts([]);
        availableProducts = [];
        return;
    }
    document.getElementById("products-grid").innerHTML = spinnerHTML();
    availableProducts = await fetchProducts(productBrand);
    displayProducts(availableProducts);
});

// filter by nutriscore
document.getElementById("nutri-score-filters").addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".nutri-score-filter");
    if (!filterBtn) return;

    const grade = filterBtn.getAttribute("data-grade");
    const filtered = grade === ""
        ? availableProducts
        : availableProducts.filter(p => p.nutritionGrade === grade);

    displayProducts(filtered);
});
// search by category
document.getElementById("product-categories").addEventListener("click", async (e) => {
    const filterBtn = e.target.closest(".product-category-btn");
    if (!filterBtn) return;

    const category = filterBtn.getAttribute("data-category-id");
     document.getElementById("products-grid").innerHTML = spinnerHTML();
    availableProducts = await fetchProductsByCategory(category);
    displayProducts(availableProducts);
});
// search by barcode
const gradeHexColors = {
    a: "#16a34a", b: "#84cc16", c: "#eab308", d: "#f97316", e: "#dc2626"
};
const novaHexColors = {
    1: "#16a34a", 2: "#84cc16", 3: "#eab308", 4: "#dc2626"
};

const referenceIntake = { protein: 50, carbs: 260, fat: 70, sugar: 90 };

function toPercent(nutrientKey, amount) {
    return Math.min(100, ((amount || 0) / referenceIntake[nutrientKey]) * 100);
}

document.getElementById("lookup-barcode-btn").addEventListener("click", async () => {
    const searchInput = document.getElementById("barcode-input");
    const productBarcode = searchInput.value.trim();

    if (!productBarcode) {
        displayProducts([]);
        return;
    }

    const product = await fetchProductByBarcode(productBarcode);

    if (!product) {
        showToast("error", "Product not found for the given barcode.");
        return;
    }

    openModal(product)
});

export function openModal(product){
        const isKnownGrade = product.nutritionGrade && product.nutritionGrade !== "unknown";
    const gradeLabel = isKnownGrade ? product.nutritionGrade.toUpperCase() : "N/A";
    const gradeColor = gradeHexColors[product.nutritionGrade?.toLowerCase()] || "#9ca3af";

    const novaLabel = product.novaGroup ?? "N/A";
    const novaColor = novaHexColors[product.novaGroup] || "#9ca3af";

    const modal = document.getElementById("product-detail-modal");
    modal.innerHTML = `
     <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-start gap-6 mb-6">
                <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="${product.image || ''}" alt="${product.name}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1">
                    <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand || ''}</p>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
                    <p class="text-sm text-gray-500 mb-3">${product.quantity || 'per 100g'}</p>

                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${gradeColor}20">
                            <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: ${gradeColor}">
                                ${gradeLabel}
                            </span>
                            <div>
                                <p class="text-xs font-bold" style="color: ${gradeColor}">Nutri-Score</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${novaColor}20">
                            <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${novaColor}">
                                ${novaLabel}
                            </span>
                            <div>
                                <p class="text-xs font-bold" style="color: ${novaColor}">NOVA</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="close-product-modal text-gray-400 hover:text-gray-600">
                    <i class="fa-solid fa-xmark text-2xl"></i>
                </button>
            </div>

            <!-- Nutrition Facts -->
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                    Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
                </h3>

                <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                    <p class="text-4xl font-bold text-gray-900">${product.nutrients.calories.toFixed(0)}</p>
                    <p class="text-sm text-gray-500">Calories</p>
                </div>

                <div class="grid grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-emerald-500 h-2 rounded-full" style="width: ${toPercent('protein', product.nutrients.protein)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Protein</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: ${toPercent('carbs', product.nutrients.carbs)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-purple-500 h-2 rounded-full" style="width: ${toPercent('fat', product.nutrients.fat)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-purple-600">${product.nutrients.fat.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Fat</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-orange-500 h-2 rounded-full" style="width: ${toPercent('sugar', product.nutrients.sugar)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Sugar</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-emerald-200">
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${(product.nutrients.fiber ?? 0).toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Fiber</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${(product.nutrients.sodium ?? 0).toFixed(2)}g</p>
                        <p class="text-xs text-gray-500">Sodium</p>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
                <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="${product.barcode}">
                    <i class="fa-solid fa-plus mr-2"></i>Log This Food
                </button>
                <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                    Close
                </button>
            </div>
        </div>
      </div>
    `;
    modal.classList.remove("hidden");


    document.querySelectorAll(".close-product-modal").forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    });

    // Log this food
    document.querySelector(".add-product-to-log").addEventListener("click", () => {
       const addedProduct = {
    id: crypto.randomUUID(),
    type: "product",
    name: product.name,
    brand: product.brand,
    img: product.image,
    date: new Date().toISOString(),
    nutrition: {
        calories: product.nutrients.calories,
        protein: product.nutrients.protein,
        carbs: product.nutrients.carbs,
        fat: product.nutrients.fat,
        sugar: product.nutrients.sugar,
        fiber: product.nutrients.fiber ?? 0
    }
};
logMeal(addedProduct);
refreshFoodLogUI();
        showToast("success", `${product.name} logged to your daily intake!`);
        modal.classList.add("hidden");
    });

}


function showToast(icon, title) {
    swal.fire({
        icon,
        title,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });
}