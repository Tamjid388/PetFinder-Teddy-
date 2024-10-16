// Fetch Api to show   catagory buttons
const showCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => category(data.categories))
    .catch((error) => console.log(error));
};

// Fetch Api to show  ONLY catagory based pets
function petsBycategory(categoory) {

const spinner=document.getElementById("spinner")
spinner.classList.remove("hidden")


  console.log(categoory);
  fetch(` https://openapi.programming-hero.com/api/peddy/category/${categoory}`)
    .then((res) => res.json())
    .then((data) =>{
      
      setTimeout(
        ()=>{
          spinner.classList.add("hidden")
 
          ShowAllPets(data.data)
        },2000
      )

    }
      
      
    )
    .catch((error) => {
      console.log(error)
      spinner.classList.add("hidden")
    });
}









const loadDetails=async (petId)=>{

const url=`https://openapi.programming-hero.com/api/peddy/pet/${petId}`

const res= await fetch(url)
const data=await res.json()
displayModal(data);
}

const displayModal=(data)=>{
  console.log(data);
  const {pet_name,gender,vaccinated_status,date_of_birth,breed,price,image,pet_details}  =data.petData  
  document.getElementById("modal-content").innerHTML=`
     <img src="${image}" class="rounded-lg w-full mb-2
     " alt="">
      <h1 class="text-2xl font-bold">${pet_name}</h1>
     <div class="grid grid-cols-1 md:grid-cols-2  gap-2">
    
     <div class="flex items-center space-x-1">
             <i class="fa-solid fa-shield-dog"></i>
             <p>Breed: ${breed}</p>
     
             </div>



                <div class="flex items-center space-x-1">
          <i class="fa-solid fa-venus"></i>
             <p>Gender: ${gender}</p>
     
             </div>


  <div class="flex items-center space-x-1">
          <i class="fa-solid fa-venus"></i>
             <p>vaccinated status: ${vaccinated_status}</p>
     
             </div>
  <div class="flex items-center space-x-1">
           <i class="fa-solid fa-cake-candles"></i>
             <p>Birth: ${date_of_birth}</p>
     
             </div>

              <div class="flex items-center space-x-1">
        <i class="fa-solid fa-dollar-sign"></i>
             <p>Price: ${price}</p>
     
             </div>
     
     </div>
     <hr>
       <h1 class="text-2xl font-bold">Details Information</h1>
      <h1 class="">${pet_details}</h1>


  `
  console.log("Category:", category,pet_name,breed);
  document.getElementById('my_modal_5').showModal()

}

const likeButton=(img)=>{
console.log(img);
const rightBox=document.getElementById("right-div")

const imgBox=document.createElement("div")
imgBox.classList.add('p-2')
imgBox.innerHTML=`

<img class="rounded-lg" src="${img}"/>



`


rightBox.appendChild(imgBox)


}



const category = (data) => {
  console.log(data);
  const categoryDIV = document.getElementById("category");

  for (item of data) {
    // console.log(item.category, item.id);
    const btns = document.createElement("button");
    btns.innerHTML = `
    <button onclick='petsBycategory("${item.category}")' class=" space-x-1  flex justify-center items-center py-4 px-8 rounded-lg border-2 border-[#0E7A81] hover:bg-[#129198]">
    
    <img src="${item.category_icon}" class="w-8" alt="">
   <span class="font-bold text-2xl">${item.category}</span>
  </button>
    
    `;
    categoryDIV.appendChild(btns);
  }
};

const allPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => ShowAllPets(data.pets))
    .catch((error) => console.log(error));
};

 function adoptModal(){
 let addoptbtn= document.getElementById('adoptionmsg')
 addoptbtn.showModal()
 let countdown=document.getElementById('countdown')

 let counter=3
  // setTimeout(
  //   ()=>{
  //     addoptbtn.close()
  //   },2000
  // )
  countdown.style.setProperty('--value', counter); 

  function updateCountdown() {
   
    counter--; 

    countdown.style.setProperty('--value', counter); 

    if (counter < 1) {
      clearInterval(countdownInterval);
      addoptbtn.close(); 
    }
  }

  
  const countdownInterval = setInterval(updateCountdown, 1000);
 }







// Fetch Api to show  all the pets
const ShowAllPets = (data) => {


  let isSorted = false;

  
  const PriceButton = document.getElementById("sortByPrice");
  PriceButton.addEventListener("click", () => {
    data.sort((a, b) => b.price - a.price);
    isSorted = true;
    ShowAllPets(data);
  });


  console.log(data);







  const cardContainer = document.getElementById("left-div");
  cardContainer.innerHTML = "";

  if(data.length==0)
  {
    cardContainer.classList.remove("grid")
    cardContainer.innerHTML =`
    <div class="flex flex-col justify-center items-center">
    <img class="max-w-full max-h-[500px] object-contain" src="images/error.webp"/>
    <h1 class="font-bold text-2xl py-3">No Information Available</h1>

    <p class="text-center opacity-80">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    
    `
   return
  }
  else{
    cardContainer.classList.add("grid")
  }

  for (item of data) {
    const card = document.createElement("div");
    card.innerHTML = `
           
          <div class="card card-compact bg-base-100  shadow-xl ">
            <figure class="aspect-w-16 h-[200px]">
              <img class="h-full w-full"
                src="${item.image}"
                alt="" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${item.pet_name}</h2>

             <div class="flex items-center space-x-1">
             <i class="fa-solid fa-shield-dog"></i>
           <p>Breed: ${item.breed || 'Info not available'}</p>
     
             </div>

             <div class="flex items-center space-x-1">
           <i class="fa-solid fa-cake-candles"></i>
          <p>Birth: ${item.date_of_birth !== null && item.date_of_birth !== undefined ? item.date_of_birth : 'Info not available'}</p>

     
             </div>
             <div class="flex items-center space-x-1">
          <i class="fa-solid fa-venus"></i>
           <p>Gender: ${item.gender !== null && item.gender !== undefined ? item.gender : 'Info not available'}</p>
             </div>
             <div class="flex items-center space-x-1">
        <i class="fa-solid fa-dollar-sign"></i>
            <p>Price: ${item.price !== null && item.price !== undefined ? item.price : 'Info not available'}</p>
     
             </div>




              <div class=" flex flex-row justify-between">
                <button onclick="likeButton('${item.image}')" class="btn text-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>
                <button onclick="adoptModal()" class="btn text-[#0E7A81] font-bold">Adopt</button>
                <button onclick="loadDetails('${item.petId}')" class="btn text-[#0E7A81] font-bold">Details</button>
              </div>
            </div>
          </div>
    
    `;
    cardContainer.appendChild(card);
  }



  
};










// Calling the functions

allPets();
showCategory();
