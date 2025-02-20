const container = document.querySelector("main");
const h2 = document.querySelector("h2");
const selectCuisine = document.querySelector("#cuisine");
const selectMealType = document.querySelector("#mealType");

selectCuisine.addEventListener("change", (e) => visListe(allRecipes, e));
selectMealType.addEventListener("change", (e) => visListe(allRecipes, e));

const url = "https://dummyjson.com/recipes?limit=0";

let allRecipes,
  cuisine = "All",
  mealType = "All";

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      buildSelects();
      visListe(allRecipes);
    });
}

hentData();

function buildSelects() {
  const uniqueCuisines = Array.from(new Set(allRecipes.map((recipe) => recipe.cuisine)));
  const markup = uniqueCuisines.map((cuisine) => ` <option>${cuisine}</option>`).join("");
  selectCuisine.innerHTML += markup;
  const uniqueMTypes = Array.from(new Set(allRecipes.map((recipe) => recipe.mealType[0])));
  const markup2 = uniqueMTypes.map((element) => ` <option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML += markup2;
}

function visListe(data, event) {
  let count = 0;
  const markup = data
    .filter((opskrift) => {
      if (event) {
        if (event.target.id == "cuisine") {
          cuisine = event.target.value;
        } else if (event.target.id == "mealType") {
          mealType = event.target.value;
        }
        if (cuisine == "All" && mealType != "All") {
          return opskrift.mealType.includes(mealType);
        } else if (mealType == "All" && cuisine != "All") {
          return opskrift.cuisine == cuisine;
        } else if (cuisine != "All" && mealType != "All") {
          return opskrift.cuisine == cuisine && opskrift.mealType.includes(mealType);
        } else {
          return true;
        }
      } else {
        return true;
      }
    })
    .map(
      (opskrift) => `        
      <article>
          <img src="${opskrift.image}" alt="meal">
          <h2>${opskrift.name}</h2>
          <p>${opskrift.cuisine}</p>
          <p>${opskrift.mealType}</p>
        </article>`
    )
    .join("");
  container.innerHTML = markup;
  if (markup == "") {
    console.log("no meals");
    h2.textContent = "Sorry, there are no " + cuisine + " " + mealType + " recipes";
  } else {
    h2.textContent = cuisine + " " + mealType;
  }
}
