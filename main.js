function getRandomNum(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min)+min);
}

const checkRecipeOptions = (meal, cuisine, protein) => {
    document.getElementById('message-meal').innerHTML = '';
    document.getElementById('meal').style.borderColor = '';
    document.getElementById('message-cuisine').innerHTML = '';
    document.getElementById('cuisine').style.borderColor = '';
    document.getElementById('message-protein').innerHTML = '';
    document.getElementById('protein').style.borderColor = '';
    if (meal === '') {
        document.getElementById('message-meal').innerHTML = 'Please choose a meal type.';
        document.getElementById('meal').style.borderColor = 'red';
        document.getElementById('meal').classList.add('shake');
        setTimeout(() => {
            document.getElementById('meal').classList.remove('shake');
        }, 1000)
        
    }
    
    if (cuisine === '') {
        document.getElementById('message-cuisine').innerHTML = 'Please choose a cuisine.';
        document.getElementById('cuisine').style.borderColor = 'red';
        document.getElementById('cuisine').classList.add('shake');
        setTimeout(() => {
            document.getElementById('cuisine').classList.remove('shake');
        }, 1000)
    }
    
    if (protein === '') {
        document.getElementById('message-protein').innerHTML = 'Please choose a protein.';
        document.getElementById('protein').style.borderColor = 'red';
        document.getElementById('protein').classList.add('shake');
        setTimeout(() => {
            document.getElementById('protein').classList.remove('shake');
        }, 1000)
    }

    if (meal === '' || cuisine === '' || protein === '') {
        return true;
    }

    return false;
}

async function callRecipeApi (meal, cuisine, protein) {

    await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${protein}&app_id=455fdd1b&app_key=%20e4256eb4241155c86b0aa96877050a3b&cuisineType=${cuisine}&mealType=${meal}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
          let result = data.hits[getRandomNum(0,data.hits.length)].recipe;
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
            <p><strong>Calories / Serving: </strong><span id="calories">${Math.round(calories)}g</span></p>
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
const fetchDrinks = ()=>{
    let drink = document.getElementById('drink').value;
    fetch(`https://www.thecocktaildb.com/api/json/v2/1/filter.php?i=${drink}`) /**,${modifiers[mod1].value},${modifiers[mod2].value} */
        .then(response => response.json())
        .then(data => {
            //get random num to get random drink
            // console.log(getRandomNum(0 , data.drinks.length))
            const drinkID = data.drinks[getRandomNum(0,data.drinks.length)].idDrink
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`) /*178366*/
            .then(response => response.json())
            .then(exactDrink =>{
                let drinkIngName =[exactDrink.drinks[0].strIngredient1,exactDrink.drinks[0].strIngredient2,exactDrink.drinks[0].strIngredient3,exactDrink.drinks[0].strIngredient4,exactDrink.drinks[0].strIngredient5,exactDrink.drinks[0].strIngredient6,exactDrink.drinks[0].strIngredient7,exactDrink.drinks[0].strIngredient8,exactDrink.drinks[0].strIngredient9,exactDrink.drinks[0].strIngredient10,exactDrink.drinks[0].strIngredient11,exactDrink.drinks[0].strIngredient12,exactDrink.drinks[0].strIngredient13,exactDrink.drinks[0].strIngredient14,exactDrink.drinks[0].strIngredient15]
                let drinkIngMeas = [exactDrink.drinks[0].strMeasure1,exactDrink.drinks[0].strMeasure2,exactDrink.drinks[0].strMeasure3,exactDrink.drinks[0].strMeasure4,exactDrink.drinks[0].strMeasure5,exactDrink.drinks[0].strMeasure6,exactDrink.drinks[0].strMeasure7,exactDrink.drinks[0].strMeasure8,exactDrink.drinks[0].strMeasure9,exactDrink.drinks[0].strMeasure10,exactDrink.drinks[0].strMeasure11,exactDrink.drinks[0].strMeasure12,exactDrink.drinks[0].strMeasure13,exactDrink.drinks[0].strMeasure14,exactDrink.drinks[0].strMeasure15]
                let drinkIng =[];
                document.getElementById('drinkIngri').innerText="" /* Wiping ingridient for follow up searches */
                for(i=0;i<15;i++){
                    if(drinkIngName[i]==null||drinkIngName[i]===""){ /* checking for null and empty strings drinkID 178366 for ex*/
                        break;
                    }
                    if(drinkIngMeas[i]==null){
                        drinkIng.push(drinkIngName[i])
                    }else{
                    drinkIng.push(drinkIngMeas[i]+ " - " + drinkIngName[i])}
                    let appendDrinkHtml = document.createElement("li")
                    appendDrinkHtml.innerHTML = drinkIng[i]
                    document.getElementById("drinkIngri").appendChild(appendDrinkHtml)
                }
                document.getElementById('drinkName').innerText=exactDrink.drinks[0].strDrink
                document.getElementById('drinkImg').src=exactDrink.drinks[0].strDrinkThumb
                document.getElementById('drinkInstructions').innerHTML=exactDrink.drinks[0].strInstructions
                document.getElementById('glass').innerHTML=`<strong>Glass: </strong>${exactDrink.drinks[0].strGlass}`
                console.log(exactDrink.drinks[0])
            })
        });
};
const cantFindDrink = ()=>{
    document.getElementById('error').innerHTML=(`Invalid combination. Our suggestion with your Spirit`)
};
const drinkValidation=()=>{
    document.getElementById('message-drink').innerHTML = ''
    document.getElementById('drink').style.borderColor = ""
    let x = document.getElementById("drink").value;
    if (x == "") {
      document.getElementById("message-drink").innerHTML = 'Please choose a spirit';
      document.getElementById('drink').style.borderColor = 'red';
      document.getElementById('drink').classList.add('shake');
      setTimeout(() => {
          document.getElementById('drink').classList.remove('shake');
      }, 1000)
      return false;
    }
  }
/** https://www.thecocktaildb.com/api/json/v2/1/filter.php?i=Gin,Tequila (multiple searches) */ 
/** Start by switching spirits to checkbox and redo */
const callDrinkApi = ()=>{
    let drink = document.getElementById('drink').value;
    let modifiers = document.getElementsByClassName('form-check-input');
    let modifiersCheck = [];
    console.log(checkedBoxes);
    if (checkedBoxes == 0) {
        fetchDrinks();
    } else if(checkedBoxes==1){
        for(i=0;i<modifiers.length;i++){
            if (modifiers[i].checked==true){
                modifiersCheck.push(i)
                console.log(modifiersCheck)
            }
        }
        /** must select 2 modifiers as of now */
        let mod1 = modifiersCheck[0];
        console.log(modifiers[mod1].value)
        console.log(drink)
        fetch(`https://www.thecocktaildb.com/api/json/v2/1/filter.php?i=${drink},${modifiers[mod1].value}`) /**,${modifiers[mod1].value},${modifiers[mod2].value} */
        .then(response => response.json())
        .then(data => {
            //get random num to get random drink
            // console.log(getRandomNum(0 , data.drinks.length))
            if(data.drinks=="None Found"){
                cantFindDrink();
                fetchDrinks();
            }else{
                const drinkID = data.drinks[getRandomNum(0,data.drinks.length)].idDrink
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`) /*178366*/
                .then(response => response.json())
                .then(exactDrink =>{
                    let drinkIngName =[exactDrink.drinks[0].strIngredient1,exactDrink.drinks[0].strIngredient2,exactDrink.drinks[0].strIngredient3,exactDrink.drinks[0].strIngredient4,exactDrink.drinks[0].strIngredient5,exactDrink.drinks[0].strIngredient6,exactDrink.drinks[0].strIngredient7,exactDrink.drinks[0].strIngredient8,exactDrink.drinks[0].strIngredient9,exactDrink.drinks[0].strIngredient10,exactDrink.drinks[0].strIngredient11,exactDrink.drinks[0].strIngredient12,exactDrink.drinks[0].strIngredient13,exactDrink.drinks[0].strIngredient14,exactDrink.drinks[0].strIngredient15]
                    let drinkIngMeas = [exactDrink.drinks[0].strMeasure1,exactDrink.drinks[0].strMeasure2,exactDrink.drinks[0].strMeasure3,exactDrink.drinks[0].strMeasure4,exactDrink.drinks[0].strMeasure5,exactDrink.drinks[0].strMeasure6,exactDrink.drinks[0].strMeasure7,exactDrink.drinks[0].strMeasure8,exactDrink.drinks[0].strMeasure9,exactDrink.drinks[0].strMeasure10,exactDrink.drinks[0].strMeasure11,exactDrink.drinks[0].strMeasure12,exactDrink.drinks[0].strMeasure13,exactDrink.drinks[0].strMeasure14,exactDrink.drinks[0].strMeasure15]
                    let drinkIng =[];
                    document.getElementById('drinkIngri').innerText="" /* Wiping ingridient for follow up searches */
                    for(i=0;i<15;i++){
                        if(drinkIngName[i]==null||drinkIngName[i]===""){ /* checking for null and empty strings drinkID 178366 for ex*/
                            break;
                        }
                        if(drinkIngMeas[i]==null){
                            drinkIng.push(drinkIngName[i])
                        }else{
                        drinkIng.push(drinkIngMeas[i]+ " - " + drinkIngName[i])}
                        let appendDrinkHtml = document.createElement("li")
                        appendDrinkHtml.innerHTML = drinkIng[i]
                        document.getElementById("drinkIngri").appendChild(appendDrinkHtml)
                    }
                    document.getElementById('drinkName').innerText=exactDrink.drinks[0].strDrink
                    document.getElementById('drinkImg').src=exactDrink.drinks[0].strDrinkThumb
                    document.getElementById('drinkInstructions').innerHTML=exactDrink.drinks[0].strInstructions
                    document.getElementById('glass').innerHTML=`<strong>Glass: </strong>${exactDrink.drinks[0].strGlass}`
                    console.log(exactDrink.drinks[0])
                })
            }
        });
    } else if(checkedBoxes==2){
        for(i=0;i<modifiers.length;i++){
            if (modifiers[i].checked==true){
                modifiersCheck.push(i)
                console.log(modifiersCheck)
            }
        }
        /** must select 2 modifiers as of now */
        let mod1 = modifiersCheck[0];
        let mod2 = modifiersCheck[1];
        console.log(modifiers[mod1].value)
        console.log(modifiers[mod2].value)
        console.log(drink)
        fetch(`https://www.thecocktaildb.com/api/json/v2/1/filter.php?i=${drink},${modifiers[mod1].value},${modifiers[mod2].value}`) /**,${modifiers[mod1].value},${modifiers[mod2].value} */
        .then(response => response.json())
        .then(data => {
            //get random num to get random drink
            // console.log(getRandomNum(0 , data.drinks.length))
            console.log(data.drinks);
            console.log(typeof(data.drinks))
            // if(data.drinks==)
            if(data.drinks=="None Found"){
                fetchDrinks();
                cantFindDrink();
            }else{
                const drinkID = data.drinks[getRandomNum(0,data.drinks.length)].idDrink
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`) /*178366*/
                .then(response => response.json())
                .then(exactDrink =>{
                    let drinkIngName =[exactDrink.drinks[0].strIngredient1,exactDrink.drinks[0].strIngredient2,exactDrink.drinks[0].strIngredient3,exactDrink.drinks[0].strIngredient4,exactDrink.drinks[0].strIngredient5,exactDrink.drinks[0].strIngredient6,exactDrink.drinks[0].strIngredient7,exactDrink.drinks[0].strIngredient8,exactDrink.drinks[0].strIngredient9,exactDrink.drinks[0].strIngredient10,exactDrink.drinks[0].strIngredient11,exactDrink.drinks[0].strIngredient12,exactDrink.drinks[0].strIngredient13,exactDrink.drinks[0].strIngredient14,exactDrink.drinks[0].strIngredient15]
                    let drinkIngMeas = [exactDrink.drinks[0].strMeasure1,exactDrink.drinks[0].strMeasure2,exactDrink.drinks[0].strMeasure3,exactDrink.drinks[0].strMeasure4,exactDrink.drinks[0].strMeasure5,exactDrink.drinks[0].strMeasure6,exactDrink.drinks[0].strMeasure7,exactDrink.drinks[0].strMeasure8,exactDrink.drinks[0].strMeasure9,exactDrink.drinks[0].strMeasure10,exactDrink.drinks[0].strMeasure11,exactDrink.drinks[0].strMeasure12,exactDrink.drinks[0].strMeasure13,exactDrink.drinks[0].strMeasure14,exactDrink.drinks[0].strMeasure15]
                    let drinkIng =[];
                    document.getElementById('drinkIngri').innerText="" /* Wiping ingridient for follow up searches */
                    for(i=0;i<15;i++){
                        if(drinkIngName[i]==null||drinkIngName[i]===""){ /* checking for null and empty strings drinkID 178366 for ex*/
                            break;
                        }
                        if(drinkIngMeas[i]==null){
                            drinkIng.push(drinkIngName[i])
                        }else{
                        drinkIng.push(drinkIngMeas[i]+ " - " + drinkIngName[i])}
                        let appendDrinkHtml = document.createElement("li")
                        appendDrinkHtml.innerHTML = drinkIng[i]
                        document.getElementById("drinkIngri").appendChild(appendDrinkHtml)
                    }
                    document.getElementById('drinkName').innerText=exactDrink.drinks[0].strDrink
                    document.getElementById('drinkImg').src=exactDrink.drinks[0].strDrinkThumb
                    document.getElementById('drinkInstructions').innerHTML=exactDrink.drinks[0].strInstructions
                    document.getElementById('glass').innerHTML=`<strong>Glass: </strong>${exactDrink.drinks[0].strGlass}`
                })
            }
        });
    }
}
let flip = false
switchDisplay=()=>{
    console.log(flip)
    searchScr = document.getElementById('selection-screen')
    resultScr = document.getElementById('results-screen')
    switch(flip){
        case true: searchScr.style="", resultScr.style="display:none"
        flip = false
        break;
        case false: searchScr.style="display:none", resultScr.style=""
        flip=true
        break;
    }
}

//     // Code to only allow 3 checked boxes
let checkedBoxes = 0;
document.addEventListener('click', (event) => {
    //only do something if it's a checkbox
    if (event.target.type == 'checkbox') {
        // if it's being unchecked, subtract from counter
        if (event.target.checked == false) {
            checkedBoxes -= 1
        }
        // don't do anything if 2 boxes are already checked
        if (checkedBoxes == 2) {
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
    let meal = document.getElementById('meal').value;
    let cuisine = document.getElementById('cuisine').value;
    let protein = document.getElementById('protein').value;
    if (checkRecipeOptions(meal, cuisine, protein) || document.getElementById('drink').value =="") {
        checkRecipeOptions(meal, cuisine, protein);
        drinkValidation();
        return;
    } else if (document.getElementById('drink').value ==""){
        drinkValidation();
        return;
    } else if(checkRecipeOptions(meal, cuisine, protein)){
        checkRecipeOptions(meal, cuisine, protein);
        return;
    };
    callDrinkApi();
    callRecipeApi(meal,cuisine,protein);
    switchDisplay()
});

document.getElementById('reset').addEventListener('click', (event) => {
    event.preventDefault();
    drinkValidation()
    switchDisplay()
});
document.getElementById('refresh').addEventListener('click', (event) => {
    event.preventDefault();
    drinkValidation();
    callDrinkApi();
});