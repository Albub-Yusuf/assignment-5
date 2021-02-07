const searchBtn = document.getElementById('search-btn');
const menulList = document.getElementById('menu');
const mealIngredientList = document.getElementById('wrapper');


function getmenulList() {
    let searchInputTxt = document.getElementById('meal-input').value;
    console.log(searchInputTxt.length);


    fetch(` https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(res => res.json())
        .then(data => {

            let markup = "";

            if (data.meals) {
                data.meals.forEach(meal => {

                markup += ` 
                 <div onclick="getIngredients('${meal.strMeal}')" class="card" style="width: 18rem;">
                 <img class="card-img-top" src="${meal.strMealThumb}" alt="Card image cap">
                 <div class="card-body">
                 <span class="text-center">${meal.strMeal}</span>
                 </div>
                 </div>
                 `;

                });

            } else {

                alert('Sorry searched item not found!');

            }

            menulList.innerHTML = markup;

        });
}

//function for fetching ingredients

function getIngredients(name) {

    const mealDetail = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    console.log(mealDetail);
    fetch(mealDetail)
        .then(res => res.json())
        .then(data => {

            let markup = "";

            if (data.meals) {
                data.meals.forEach(meal => {

                    markup = `
                        <div class="mealImage rounded">
                        <img style="width: 60%; border-radius: 5px;" src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="mealDetails">
                        <div class="titles mt-2 py-2"><h3>${meal.strMeal}</h3></div>
                        <div id="ingredientsList">
                        <h5>Ingredients :</h5>
                        <ul id="ingredients">
                            <li>${meal.strIngredient1}</li>
                            <li>${meal.strIngredient2}</li>
                            <li>${meal.strIngredient3}</li>
                            <li>${meal.strIngredient4}</li>
                            <li>${meal.strIngredient5}</li>
                            <li>${meal.strIngredient6}</li>
                            <li>${meal.strIngredient7}</li>
                            <li>${meal.strIngredient8}</li>
                            <li>${meal.strIngredient9}</li>
                            <li>${meal.strIngredient10}</li> 
                        </ul>
                        </div>
                        </div>
                        ` ;
                });

            } else {
                alert('Ingredients not found!!!');
            }

            mealIngredientList.innerHTML = markup;


        });
}



//search button event listener

searchBtn.addEventListener('click', function () {

    getmenulList();
});
