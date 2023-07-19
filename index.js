//to get the input Refrence
let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

//here we are creating the value array with respective value;
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
    //this is used set the value to value.
  input.value = value;
  removeElements();
}
//IT remove all the element from the dom element with id listContainer.
function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  //if length of input chracter is less than 4 then it simply return false.
  if (input.value.length < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
  //The await keyword tells the JavaScript interpreter to wait until 
  //the fetch function completes before 
  const response = await fetch(url);
  //response.json() is used to parse JSON data in JavaScript.
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");

    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });

});

button.addEventListener("click",(getRsult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=
    ${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    //the fetch() method returns a promise,which is a javascript Object.

    const response = await fetch(url);

    //The await keyword is used to wait for the promise to resolve before continuing with the rest of the code.

    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
    });
  })
);

window.onload = () => {
  
  //it is used to make a request to API.
   getRsult();
};