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
        //get random num to get random drink
        function getRandomNum(min,max){
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random()*(max-min)+min);
        }
        // console.log(getRandomNum(0 , data.drinks.length))

        const drinkID = data.drinks[getRandomNum(0,data.drinks.length)].idDrink
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
        .then(response => response.json())
        .then(exactDrink =>{
            let drinkIngName =[exactDrink.drinks[0].strIngredient1,exactDrink.drinks[0].strIngredient2,exactDrink.drinks[0].strIngredient3,exactDrink.drinks[0].strIngredient4,exactDrink.drinks[0].strIngredient5,exactDrink.drinks[0].strIngredient6,exactDrink.drinks[0].strIngredient7,exactDrink.drinks[0].strIngredient8,exactDrink.drinks[0].strIngredient9,exactDrink.drinks[0].strIngredient10,exactDrink.drinks[0].strIngredient11,exactDrink.drinks[0].strIngredient12,exactDrink.drinks[0].strIngredient13,exactDrink.drinks[0].strIngredient14,exactDrink.drinks[0].strIngredient15]
            let drinkIngMeas = [exactDrink.drinks[0].strMeasure1,exactDrink.drinks[0].strMeasure2,exactDrink.drinks[0].strMeasure3,exactDrink.drinks[0].strMeasure4,exactDrink.drinks[0].strMeasure5,exactDrink.drinks[0].strMeasure6,exactDrink.drinks[0].strMeasure7,exactDrink.drinks[0].strMeasure8,exactDrink.drinks[0].strMeasure9,exactDrink.drinks[0].strMeasure10,exactDrink.drinks[0].strMeasure11,exactDrink.drinks[0].strMeasure12,exactDrink.drinks[0].strMeasure13,exactDrink.drinks[0].strMeasure14,exactDrink.drinks[0].strMeasure15]
            let drinkIng =[];
            document.getElementById('drinkIngri').innerText=""
            for(i=0;i<15;i++){
                if(drinkIngName[i]==null){
                    break;
                }
                if(drinkIngMeas[i]==null){
                    drinkIng.push(drinkIngName[i])
                }
                drinkIng.push(drinkIngMeas[i]+ " - " + drinkIngName[i])
                let appendDrinkHtml = document.createElement("li")
                appendDrinkHtml.innerHTML = drinkIng[i]
                document.getElementById("drinkIngri").appendChild(appendDrinkHtml)
            }
            let drinkName = exactDrink.drinks[0].strDrink
            let drinkIns = exactDrink.drinks[0].strInstructions
            let drinkImg = exactDrink.drinks[0].strDrinkThumb
            document.getElementById('drinkInstructions').innerHTML=drinkIns
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