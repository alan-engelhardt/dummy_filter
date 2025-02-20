const id = new URLSearchParams(document.location.search).get("id");
const endpoint = `https://dummyjson.com/recipes/${id}`;

function getData() {
  console.log(endpoint);
  fetch(endpoint)
    .then((res) => res.json())
    .then(show);
}

getData();

function show(data) {
  console.log(data);
  document.querySelector("main").innerHTML = `
 <article>
        <h2>${data.name}</h2>
        <details>
            <summary>Ingredients</summary>
        <ul id="ingredientlist">${data.ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
           </details>
           <details>
            <summary>Instructions</summary>
            <ol id="instructionslist">${data.instructions.map((instr) => `<li>${instr}</li>`).join("")}</ol>
        </details>
    </article>`;
}

//<img src="${data.image}" alt="the meal">
