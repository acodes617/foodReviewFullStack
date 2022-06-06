let favorite = document.getElementsByClassName("fa-solid fa-star");
let needsWork = document.getElementsByClassName("fa-solid fa-star-half-stroke");
let trash = document.getElementsByClassName("fa-ban");
let feedBack = document.getElementsByClassName("submit");
document.getElementById("submit").addEventListener("click", getIngredients);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
    "X-RapidAPI-Key": "11768ef5dfmshd06127c1ccad9a9p119cc0jsn41acb94f82b9",
  },
};
function getIngredients() {
  let lookUp = document.getElementById("lookUp").value;

  fetch(
    `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${lookUp}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let object1 = data[0].ingredients;
      document.getElementById(
        "displayHere"
      ).innerHTML = `<form action="/savedToDatabase" method="POST"> 
      <input type="text" value="${lookUp}: ${object1}" name="recipe" class="input1">
      <button type="submit">SAVE INGREDIENTS</button>
    </form>`;
      console.log(object1);
    });
}
Array.from(favorite).forEach(function (element) {
  element.addEventListener("click", function () {
    const recipe = this.parentNode.parentNode.childNodes[1].innerText;
    const favorite = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("savedToDatabase", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe: recipe,
        favorite: favorite,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(recipe);
        window.location.reload(true);
      });
  });
});

Array.from(needsWork).forEach(function (element) {
  element.addEventListener("click", function () {
    const recipe = this.parentNode.parentNode.childNodes[1].innerText;
    const needsWork = this.parentNode.parentNode.childNodes[4].innerText;
    fetch("savedToDatabase2", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe: recipe,
        needsWork: needsWork,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(recipe);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const recipe = this.parentNode.parentNode.childNodes[1].innerText;
    fetch("savedToDatabase", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: recipe,
      }),
    }).then(function (response) {
      window.location.reload(true);
    });
  });
});
