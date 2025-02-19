const container = document.querySelector("main");
const h2 = document.querySelector("h2");
const selectCuisine = document.querySelector("#cuisine");
const selectMealType = document.querySelector("#mealType");
selectCuisine.addEventListener("change", (e) => visListe(allRecipes, e));
selectMealType.addEventListener("change", (e) => visListe(allRecipes, e));
const url = "https://dummyjson.com/recipes?limit=0";

let allRecipes,
  filteredData,
  currrentListData,
  cuisine = "All",
  mealType = "All";

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      filteredData = allRecipes;
      buildSelects();
      visListe(allRecipes);
    });
}

hentData();

function buildSelects() {
  const uniqueCuisines = Array.from(new Set(allRecipes.map((recipe) => recipe.cuisine)));
  const markup = uniqueCuisines.map((cuisine) => ` <option value="${cuisine}">${cuisine}</option>`).join("");
  selectCuisine.innerHTML += markup;
  const uniqueMTypes = Array.from(new Set(allRecipes.map((recipe) => recipe.mealType[0])));
  const markup2 = uniqueMTypes.map((element) => ` <option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML += markup2;
}

//<img src="${opskrift.image}" alt="meal">

function visListe(data, event) {
  const markup = data
    .filter((opskrift) => {
      if (event) {
        if (event.target.id == "cuisine") {
          cuisine = event.target.value;
          if (cuisine == "All") {
            return true;
          } else {
            return opskrift.cuisine == cuisine;
          }
        } else if (event.target.id == "mealType") {
          mealType = event.target.value;
          if (mealType == "All") {
            return true;
          } else {
            return opskrift.mealType[0] == mealType;
          }
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
    <h2>${opskrift.name}</h2>
            <p>${opskrift.cuisine}</p>
            <p>${opskrift.mealType}</p>
        </article>`
    )
    .join("");
  container.innerHTML = markup;
  h2.textContent = cuisine + mealType;
}

function filterMeals(event) {}

function old(event) {
  console.log(event.target.id);
  if (event.target.id == "cuisine" && event.target.id != "All") {
    cuisine = event.target.value;
    const uniqueCuisines = Array.from(new Set(filteredData.map((recipe) => recipe.cuisine)));
    const markup = uniqueCuisines.map((element) => `<option value="${element}">${element}</option>`).join("");
    selectCuisine.innerHTML = '<option value="All">All</option>' + markup;
    filteredData = filteredData.filter((recipe) => recipe.cuisine == cuisine);
  } else if (event.target.id == "mealType" && event.target.id != "All") {
    mealType = event.target.value;
    const uniqueMTypes = Array.from(new Set(filteredData.map((recipe) => recipe.mealType[0])));
    const markup = uniqueMTypes.map((element) => `<option value="${element}">${element}</option>`).join("");
    selectMealType.innerHTML = '<option value="All">All</option>' + markup;
    filteredData = filteredData.filter((recipe) => recipe.mealType.includes(mealType));
  } else {
    filteredData = allRecipes;
  }
  visListe(filteredData);
  h2.textContent = cuisine + " / " + mealType + "  (" + filteredMealtypeData.length + ")";
}
