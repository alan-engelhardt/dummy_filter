const container = document.querySelector("main");
const h2 = document.querySelector("h2");
const selectCuisine = document.querySelector("#cuisine");
const selectMealType = document.querySelector("#mealType");
selectCuisine.addEventListener("change", filterCuisine);
selectMealType.addEventListener("change", filterMealType);
const url = "https://dummyjson.com/recipes";

let allRecipes,
  listeData,
  cuisine = "all",
  mealType = "all";

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      listeData = allRecipes;
      visListe(allRecipes);
    });
}

hentData();

//img src="${opskrift.image}" alt="meal">

function visListe(data) {
  //console.log(data);
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
  h2.textContent = cuisine;
  if (cuisine == "All") {
    visListe(listeData);
  } else {
    listeData = allRecipes.filter((recipe) => recipe.cuisine == cuisine);
    visListe(listeData);
  }
}

function filterMealType(event) {
  mealType = event.target.value;
  h2.textContent = cuisine + " > " + mealType;
  if (mealType == "All") {
    visListe(listeData);
  } else {
    listeData = listeData.filter((recipe) => recipe.mealType.includes(mealType));
    visListe(listeData);
  }
}
