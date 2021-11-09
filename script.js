const input = document.querySelector("#input");
const seachResult = document.querySelector(".search-result");
input.onkeyup = debounced(supereherofunc, 500);
let favList = [];

async function supereherofunc() {
  let inputVal = input.value;
  const response = await fetch(
    `https://www.superheroapi.com/api.php/3023624931288669/search/${inputVal}`
  );
  const data = await response.json();
  // console.log(data);

  const superheroArray = data.results;
  // console.log(superheroArray);

  seachResult.innerHTML = " ";

  data.response === "success"
    ? superheroArray.map((superhero) => {
        seachResult.innerHTML += `<ul class="card">
      <img src="${superhero.image.url}" alt="">
      
      <div class="card-details">
      <h1>${superhero.name}</h1>
      <button  id=${superhero.id} class="search">Search</button>
      <button id=${superhero.id} class="addToFav">Add to Favourites</button>
      </div>
      </ul> `;

      })
    : `${(seachResult.innerHTML = " ")}`;
}

function debounced(para, delay) {
  let timer;

  const debouncedFunction = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      supereherofunc();
    }, delay);
  };

  return debouncedFunction;
}


seachResult.addEventListener("click", (e)=>{
  if(e.target.classList.contains("search")){
    // console.log("Searched Clicked");

    let id = e.target.id;
    console.log("id from search",id);
    searchDetails(id);
  }

  else if(e.target.classList.contains("addToFav")) {
    // console.log("Add to Fav Clicked");
    let id = e.target.id;
    // console.log("id from fav",id);
    favDetails(id);
    input.value = ""

  }

})

const searchDetails = async (id) => {
  const response = await fetch(`https://www.superheroapi.com/api.php/3023624931288669/${id}`);
  const data = await response.json();
  console.log(data);

  let search = JSON.stringify(data);
  localStorage.setItem("search", search);
  window.location.href = "./details.html";
};

const favDetails = async (id)=>{
  const response = await fetch(`https://www.superheroapi.com/api.php/3023624931288669/${id}`);
  const data = await response.json();
  // console.log(data);


  let getItems = JSON.parse(localStorage.getItem("favList"));
  // console.log(getItems);

  let flag = true; // data is present

  if(getItems == undefined || getItems.length == 0){
    alert(`${data.name} added to the Favourite List`);
    favList.push(data);
    localStorage.setItem("favList", JSON.stringify(favList));

  }
  else{
    let list = [];
    
    getItems.map((element)=>{
      if(element.id===data.id){
        flag= false;
        alert(`${element.name} is already present in the Favourite List`);
      }
    })
    
    if(flag){
      alert(`${data.name} added to the Favourite List`);
      list = [data,...getItems];
      console.log("list ",list); 
      localStorage.setItem("favList", JSON.stringify(list));
    }
  }
}

