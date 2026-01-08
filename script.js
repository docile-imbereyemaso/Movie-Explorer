// Form and input
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Loading and error messages
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");

// Container for search results
const resultsContainer = document.getElementById("results");

// http://www.omdbapi.com/?i=tt3896198&apikey=db14ea7b

function displayMovie(movies){
resultsContainer.innerHTML ='';
movies.map((movie)=>{
    resultsContainer.innerHTML +=`
     <!-- Example of a single movie card -->
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Movie Poster -->
    <img
      src="${movie.Poster}"
      alt="${movie.Title}"
      class="w-full h-64 object-cover"
    />

    <!-- Movie Info -->
    <div class="p-4 space-y-2">
      <h2 class="text-lg font-bold text-gray-800">${movie.Title}</h2>
      <p class="text-gray-600">Year: ${movie.Year}</p>
      
    </div>
  </div>
    
    `
})
}
function showErrorMessage(error){
    errorText.classList.remove("hidden");
    errorText.textContent = error
}

async function fetchMovie(movieName) {
    try {
        
        let res = await fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=db14ea7b`);
        if(!res.ok){
            throw new Error("Movie not found");
        }
        let data = await res.json();
        
        if(data.Search!==undefined){
            errorText.classList.add("hidden");
             displayMovie(data.Search);
        }else{
            showErrorMessage("Movie not found!");
        }
        
        
    } catch (error) {
        showErrorMessage(error.message);
        console.log(error);
    }finally{
        loadingText.classList.add("hidden")
    }
}

searchForm.addEventListener("submit",(event)=>{
    event.preventDefault();
   let searchMovie = searchInput.value;
    fetchMovie(searchMovie);
    
    searchInput.value="";
})