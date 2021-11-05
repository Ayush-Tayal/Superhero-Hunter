const input = document.querySelector("#input");
const seachResult = document.querySelector(".search-result");
input.onkeyup =  debounced(supereherofunc, 500);

var id ;

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
      <button  id=${superhero.id} class="search">Search</button>
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
    // location.href = "./details.html"
    console.log("Searched Clicked");
    id = e.target.id;
    // console.log(id);
    superheroDetails(id);

  }
  else if(e.target.classList.contains("addToFav")) {
    location.href = "./favourites.html"
    console.log("Add to Fav Clicked");
  }

})

// const details = document.querySelector("#details")
// console.log(details);

const superheroDetails = async ()=>{
  const response2 = await fetch(`https://www.superheroapi.com/api.php/3023624931288669/${id}`); 
  const data2 = await response2.json();
  console.log(data2);

  // details.innerHTML += `<img src="${data2.image.url}" alt="">
  //                       <div id="fav-btn"><button>Favourite</button></div>
  //                       <h1 id="power-stats">Power Stats</h1>
                        
  //                       <div id="intelligence">
  //                           <h4>Intelligence</h4>
  //                           <h4>${data2.powerstats.intelligence}</h4>
  //                       </div>
                        
  //                       <div id="strength">
  //                           <h4>Strength</h4>
  //                           <h4>${data2.powerstats.strength}</h4>
  //                       </div> `


}