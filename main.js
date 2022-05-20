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
    });
});