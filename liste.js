const container = document.querySelector("main");
const h2 = document.querySelector("h2");
const selectCuisine = document.querySelector("#cuisine");
const selectMealType = document.querySelector("#mealType");
selectCuisine.addEventListener("change", filterCuisine);
selectMealType.addEventListener("change", filterMealType);
const url = "https://dummyjson.com/recipes?limit=0";

let allRecipes,
  filteredData,
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

function visListe(data) {
  const markup = data
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
  h2.textContent = cuisine + " (" + data.length + ")";
}

function filterCuisine(event) {
  cuisine = event.target.value;
  if (cuisine == "All") {
    filteredData = allRecipes;
  } else {
    filteredData = allRecipes.filter((recipe) => recipe.cuisine == cuisine);
  }
  visListe(filteredData);
  h2.textContent = cuisine + " (" + filteredData.length + ")";

  const uniqueMTypes = Array.from(new Set(filteredData.map((recipe) => recipe.mealType[0])));
  const markup = uniqueMTypes.map((element) => `<option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML = '<option value="All">All</option>' + markup;
}

function filterMealType(event) {
  mealType = event.target.value;
  if (mealType == "All") {
    visListe(filteredData);
  } else {
    const filter2data = filteredData.filter((recipe) => recipe.mealType.includes(mealType));
    visListe(filter2data);
    h2.textContent = cuisine + " / " + mealType + "  (" + filter2data.length + ")";
  }
}
