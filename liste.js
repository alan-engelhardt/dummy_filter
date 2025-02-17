const container = document.querySelector("main");
const h2 = document.querySelector("h2");
const selectCuisine = document.querySelector("#cuisine");
const selectMealType = document.querySelector("#mealType");
selectCuisine.addEventListener("change", filterCuisine);
selectMealType.addEventListener("change", filterMealType);
const url = "https://dummyjson.com/recipes?limit=0";

let allRecipes,
  listeData,
  uniqueCuisines,
  cuisine = "all",
  mealType = "all";

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      listeData = allRecipes;
      buildSelects();
      visListe(allRecipes);
    });
}

hentData();

function buildSelects() {
  uniqueCuisines = Array.from(new Set(allRecipes.map((recipe) => recipe.cuisine)));
  let markup = uniqueCuisines.map((cuisine) => ` <option value="${cuisine}">${cuisine}</option>`).join("");
  selectCuisine.innerHTML += markup;
  uniqueMTypes = Array.from(new Set(allRecipes.map((recipe) => recipe.mealType[0])));
  let markup2 = uniqueMTypes.map((element) => ` <option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML = ' <option value="All">All</option>' + markup2;
}

//img src="${opskrift.image}" alt="meal">

function visListe(data) {
  console.log(data.length);
  if (data.length > 0) {
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
  } else {
    container.innerHTML = `<h2>No ${cuisine} ${mealType}</h2>`;
  }
}

function filterCuisine(event) {
  cuisine = event.target.value;
  h2.textContent = cuisine;
  if (cuisine == "All") {
    listeData = allRecipes;
  } else {
    listeData = allRecipes.filter((recipe) => recipe.cuisine == cuisine);
  }
  visListe(listeData);

  uniqueMTypes = Array.from(new Set(listeData.map((recipe) => recipe.mealType[0])));
  let markup = uniqueMTypes.map((element) => ` <option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML = ' <option value="All">All</option>' + markup;
}

function filterMealType(event) {
  mealType = event.target.value;
  h2.textContent = cuisine + " > " + mealType;
  if (mealType == "All") {
    visListe(listeData);
  } else {
    const liste2Data = listeData.filter((recipe) => recipe.mealType.includes(mealType));
    visListe(liste2Data);
  }
}
