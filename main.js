const callRecipeApi = () => {
  let meal = document.getElementById('meal').value;
  let cuisine = document.getElementById('cuisine').value;
  let protein = document.getElementById('protein').value;

    fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${protein}&app_id=455fdd1b&app_key=%20e4256eb4241155c86b0aa96877050a3b&diet=balanced&cuisineType=${cuisine}&mealType=${meal}&dishType=Main%20course&imageSize=REGULAR&random=true&field=uri&field=label&field=image&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType`)
        .then(response => response.json())
        .then(data => {
          console.log(data.hits[0]);
          let result = data.hits[0];
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