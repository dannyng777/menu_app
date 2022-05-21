const callRecipeApi = () => {
  let meal = document.getElementById('meal').value;
  let cuisine = document.getElementById('cuisine').value;
  let protein = document.getElementById('protein').value;

    fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${protein}&app_id=455fdd1b&app_key=%20e4256eb4241155c86b0aa96877050a3b&cuisineType=${cuisine}&mealType=${meal}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.hits[0].recipe);
          let result = data.hits[0].recipe;
          let title = result.label;
          let image = result.image;
        let ingredients = result.ingredientLines;
          let recipeLink = result.url;
          let calories = result.calories;
          let fat = Math.round(result.totalNutrients.FAT.quantity);
          let carbs = Math.round(result.totalNutrients.CHOCDF.quantity);
          let protein = Math.round(result.totalNutrients.PROCNT.quantity);

          let ingredientList = ingredients.map(ingredient => {
              return `<li>${ingredient}</li>`;
          }).join('');

          document.getElementById('recipe-result').innerHTML = `
            <h3><span id="recipe-title">${title}</span></h3>
            <img class="mb-1" width="100%" src="${image}" alt="${title} srcset="">
            <p><strong>Calories / Serving: </strong><span id="calories">${calories}g</span></p>
            <p><strong>Fat: </strong><span id="fat">${fat}g</span></p>
            <p><strong>Carbs: </strong><span id="carbs">${carbs}g</span></p>
            <p><strong>Protein: </strong><span id="protein">${protein}g</span></p>
            <Strong>Ingredients:</Strong>
            <ul id="ingredients-list">
                ${ingredientList}  
            </ul>
            <a href="${recipeLink}"><button class="btn btn-primary">Full Recipe Instructions</button></a>`;
        });
}

callDrinkApi = ()=>{
    let drink = document.getElementById('drink').value;
    console.log(drink)
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.drinks[0].idDrink)
        const drinkID = data.drinks[0].idDrink
        console.log(drinkID)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
        .then(response => response.json())
        .then(exactDrink =>{
            let drinkName = exactDrink.drinks[0].strDrink
            let drinkIns = exactDrink.drinks[0].strInstructions
            let drinkIngr = exactDrink.drinks[0].strIngredient1 /* need to add more Ingr*/
            let drinkImg = exactDrink.drinks[0].strDrinkThumb
            console.log(exactDrink.drinks[0])
        })
    });
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault();
  
        callDrinkApi();
        callRecipeApi();
    });
});