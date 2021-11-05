const input = document.querySelector("#input");
const seachResult = document.querySelector(".search-result");
input.onkeyup =  debounced(supereherofunc, 500);


async function supereherofunc(){
    let inputVal = input.value;
    const response = await fetch(`https://www.superheroapi.com/api.php/3023624931288669/search/${inputVal}`);
    const data = await response.json();
    console.log(data);
    
    const superheroArray = data.results;
    console.log(superheroArray);
    
    seachResult.innerHTML = " ";
  
    data.response === "success" ?
    superheroArray.map((superhero)=>{
      seachResult.innerHTML += `<ul class="card">
      <img src="${superhero.image.url}" alt="">
      
      <div class="card-details">
      <h1>${superhero.name}</h1>
      <button class="search">Search</button>
      <button class="addToFav">Add to Favourites</button>
      </div>
      </ul> `
      
    }):`${seachResult.innerHTML = " "}`

    
  }
  
function debounced(para, delay) {
    let timer;

    const debouncedFunction = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        supereherofunc();
      }, delay);
    };

    return debouncedFunction; }
    

seachResult.addEventListener("click", (e)=>{
  if(e.target.classList.contains("search")){
    console.log("Searched Clicked");
  }
  else if(e.target.classList.contains("addToFav")) {
    console.log("Add to Fav Clicked");
  }

})