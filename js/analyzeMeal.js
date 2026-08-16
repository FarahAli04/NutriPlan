
export async function analyzeMeal(data) {
    const ingredientStrings = data.ingredients.map(item => `${item.measure} ${item.ingredient}`);
        const response = await fetch("https://nutriplan-api.vercel.app/api/nutrition/analyze", {
            method: "POST",
            headers: {
                "x-api-key": "o0Va8lcVKX6rSrT8Pdu60gqC6bmDoXuM0DV1I8bM",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                recipeName: data.name,
                ingredients: ingredientStrings
            })
        });

        const result = await response.json();
        // console.log("Nutrition analysis:", result);
        return result;
   
}