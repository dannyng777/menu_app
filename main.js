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
        let ingredientList = result.ingredientLines;
          let recipeLink = result.url;
          let calories = result.calories;
          let fat = Math.round(result.totalNutrients.FAT.quantity);
          let carbs = Math.round(result.totalNutrients.CHOCDF.quantity);
          let protein = Math.round(result.totalNutrients.PROCNT.quantity);

          ingredientList.map(ingredient => {
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
            <button src="${recipeLink}" class="btn btn-primary">Full Recipe Instructions</button>`;
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
let flip = 'on'
switchDisplay=()=>{
    console.log(flip)
    searchScr = document.getElementById('selection-screen')
    resultScr = document.getElementById('results-screen')
    switch(flip){
        case 'off': searchScr.style="display:block", resultScr.style="display:none"
        break;
        case 'on' : searchScr.style="display:none", resultScr.style="display:block"
        break;
    }
    flip = 'off'
}


document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('submit').addEventListener('click', (event) => {
    //     event.preventDefault();
  
    //     callDrinkApi();
    //     callRecipeApi();


    // });

    // Code to only allow 3 checked boxes
    let checkedBoxes = 0;
    document.addEventListener('click', (event) => {
        //only do something if it's a checkbox
        if (event.target.type == 'checkbox') {
            // if it's being unchecked, subtract from counter
            if (event.target.checked == false) {
                checkedBoxes -= 1
                
            }
            // don't do anything if 3 boxes are already checked
            if (checkedBoxes == 3) {
                event.preventDefault();
                return
            }
            // else check the box
            if (event.target.checked == true) {
                checkedBoxes += 1;
            }
        }
    })
    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault();
        
        callDrinkApi();
        // callRecipeApi();
        switchDisplay()
    });
    document.getElementById('reset').addEventListener('click', (event) => {
        event.preventDefault();
        switchDisplay()
    });    
});