const container = document.querySelector("main");
const selectCuisine = document.querySelector("#cuisine");
const selectMealType = document.querySelector("#mealType");
selectCuisine.addEventListener("change", filterCuisine);
selectMealType.addEventListener("change", filterMealType);
const url = "https://dummyjson.com/recipes";

let allRecipes,
  listData,
  cuisine = "all",
  mealType = "all";

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => (allRecipes = data.recipes))
    .then((data) => visListe(data));
}

hentData();

//img src="${opskrift.image}" alt="meal">

function visListe(data) {
  console.log(data);
  let markup = data
    .map(
      (opskrift) => `        
    <article>
    <h2>${opskrift.name}</h2>
            <p>${opskrift.cuisine}</p>
            <p>${opskrift.mealType}</p>
        </article>`
    )
    .join("");
  container.innerHTML = markup;
}

function filterCuisine(event) {
  cuisine = event.target.value;
  console.log(cuisine);
}

function filterMealType(event) {
  mealType = event.target.value;
  console.log(mealType);
}
