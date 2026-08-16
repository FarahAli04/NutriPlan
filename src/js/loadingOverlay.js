export function showLoadingOverlay() {
    const overlay = document.getElementById("app-loading-overlay");
    overlay.classList.remove("loading");
}

export function hideLoadingOverlay() {
    const overlay = document.getElementById("app-loading-overlay");
    overlay.classList.add("loading")

    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 500);
}

export function spinnerHTML() {
    return `
    <div class="flex items-center justify-center py-12 col-span-full">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>`;
}