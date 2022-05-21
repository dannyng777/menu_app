let drinks = ()=>{
    fetch('www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    .then(response => response.json())
    .then(data => console.log(data.drinks));
}

drinks();