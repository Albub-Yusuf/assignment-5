const searchBtn = document.getElementById('search-btn');
const menulList = document.getElementById('menu');
const mealIngredientList = document.getElementById('wrapper');

function getSearchInput() {

    let seachValue = document.getElementById('meal-input').value;
    selectURL(seachValue);

}

//select API URL based on search keyword
function selectURL(search) {

    const searchKeyword = search;
    let selectedURL = "";
    //check for single alphabet based api url
    if (searchKeyword.length < 2) {
        selectedURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchKeyword}`
        getmenulList(selectedURL);
    }

    //check for category based api url
    if (searchKeyword === "beef" || searchKeyword === "breakfast" || searchKeyword === "chicken" || searchKeyword === "dessert" || searchKeyword === "goat" || searchKeyword === "lamb" || searchKeyword === "miscellaneous" || searchKeyword === "pasta" || searchKeyword === "pork" || searchKeyword === "seafood" || searchKeyword === "side" || searchKeyword === "starter" || searchKeyword == "vegan" || searchKeyword === "vegetarian" || searchKeyword === "Beef" || searchKeyword === "Breakfast" || searchKeyword === "Chicken" || searchKeyword === "Dessert" || searchKeyword === "Goat" || searchKeyword === "Lamb" || searchKeyword === "Miscellaneous" || searchKeyword === "Pasta" || searchKeyword === "Pork" || searchKeyword === "Seafood" || searchKeyword === "Side" || searchKeyword === "Starter" || searchKeyword == "Vegan" || searchKeyword === "Vegetarian"

    ) {
        selectedURL = ` https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchKeyword}`;
        getmenulList(selectedURL);
    }

    //check for area based api url
    if (searchKeyword === "american" || searchKeyword === "british" || searchKeyword === "canadian" || searchKeyword === "chinese" || searchKeyword === "dutch" || searchKeyword === "egyptian" || searchKeyword === "french" || searchKeyword === "greek" || searchKeyword === "indian" || searchKeyword === "irish" || searchKeyword === "italian" || searchKeyword === "jamaican" || searchKeyword == "japanese" || searchKeyword === "kenyan" || searchKeyword === "malaysian" || searchKeyword === "mexican" || searchKeyword === "moroccan" || searchKeyword === "polish" || searchKeyword === "russian" || searchKeyword === "spanish" || searchKeyword === "thai" || searchKeyword === "tunisian" || searchKeyword === "turkish" || searchKeyword === "unknown" || searchKeyword === "vietnamese" || searchKeyword === "American" || searchKeyword === "British" || searchKeyword === "Canadian" || searchKeyword === "Chinese" || searchKeyword === "Dutch" || searchKeyword === "Egyptian" || searchKeyword === "French" || searchKeyword === "Greek" || searchKeyword === "Indian" || searchKeyword === "Irish" || searchKeyword === "Italian" || searchKeyword === "Jamaican" || searchKeyword == "Japanese" || searchKeyword === "Kenyan" || searchKeyword === "Malaysian" || searchKeyword === "Mexican" || searchKeyword === "Moroccan" || searchKeyword === "Polish" || searchKeyword === "Russian" || searchKeyword === "Spanish" || searchKeyword === "Thai" || searchKeyword === "Tunisian" || searchKeyword === "Turkish" || searchKeyword === "Unknown" || searchKeyword === "Vietnamese") {
        selectedURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchKeyword}`;
        getmenulList(selectedURL);
    }
    //check for name based api url 
    else {

        selectedURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKeyword}`;
        getmenulList(selectedURL);
    }


}

//function for fetching meal list
function getmenulList(URL) {

    fetch(URL)
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
    fetch(mealDetail)
        .then(res => res.json())
        .then(data => {

            let markup = "";

            if (data.meals) {
                data.meals.forEach(meal => {

                    findIngredients(name);

                    markup = `
                        <div class="mealImage rounded">
                        <img style="width: 100%; border-radius: 5px;" src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="mealDetails">
                        <div class="titles mt-2 py-2"><h3>${meal.strMeal}</h3></div>
                        <div id="ingredientsList">
                        <h5>Ingredients</h5>
                        <ul id="ingredients">
                           
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

//function for finding total ingredients of single meal except null & empty strings

function findIngredients(name) {

    const mealDetail = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`

    fetch(mealDetail)
        .then(response => response.json())
        .then(data => {

            var totalIngredients = [];
            let keys = [];
            const apK = Object.keys(data.meals[0]);
            const substring = "strIngredient";

            for (let i = 0; i < 51; i++) {
                keys[i] = apK[i];
                if ((keys[i].includes(substring))) {
                    totalIngredients.push(keys[i]);
                }
            }

            let ingredients = [];
            for (let j = 0; j < totalIngredients.length; j++) {
                const element = totalIngredients[j];
                const values = data.meals[0][element];
                if (data.meals[0][element] === null) {
                    console.log('inside null conditions');

                } else if (data.meals[0][element] === "") {
                    console.log('inside empty string condition');
                } else {
                    ingredients.push(data.meals[0][element]);
                }

            }

            //creating dynamic list

            for (let i = 0; i < ingredients.length; i++) {
                const ul = document.getElementById('ingredients');
                const ingredient = ingredients[i];
                const li = document.createElement('li');
                li.innerText = ingredient;
                ul.appendChild(li);
            }


        });

}

//search button event listener
searchBtn.addEventListener('click', function () {
    getSearchInput();
});



