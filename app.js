let addCard = document.querySelector("#add-card");
let formContainer = document.querySelector(".form-container");
let closeFormBtn = document.querySelector("#closeFormBtn");

const cardStack = document.querySelector(".card-stack")
let upBtn = document.querySelector("#upBtn");
let downBtn = document.querySelector("#downBtn");



const cardForm = document.querySelector("#cardForm");
const imageUrlInput = document.querySelector("#imageUrl");
const nameInput = document.querySelector("#name");
const hometownInput = document.querySelector("#hometown");
const purposeInput = document.querySelector("#purpose");

const categoryRadios = document.querySelectorAll('input[name="category"]');


const addCardBtn = document.querySelector("#addCardBtn");

// Function to save card data to local storage
function saveToLocalStorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldTasks = [];
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  } else {
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

addCard.addEventListener("click", function () {
  formContainer.style.display = "initial";
  closeFormBtn.addEventListener("click", function () {
    formContainer.style.display = "none";
  });
});

// Prevent form submission default behavior not refreshing the page
cardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const imageUrlValue = imageUrlInput.value.trim();
  const nameValue = nameInput.value.trim();
  const hometownValue = hometownInput.value.trim();
  const purposeValue = purposeInput.value.trim();

  let selectedCategory = false;
  categoryRadios.forEach(function (radio) {
    if (radio.checked) {
      selectedCategory = radio.value;
    }
  });
  if (!selectedCategory) {
    alert("Please select a category");
    return;
  }

  // Check if fields are empty
  if (imageUrlValue === "") {
    alert("Please enter Image URL");
    return;
  }

  if (nameValue === "") {
    alert("Please enter Name");
    return;
  }

  if (hometownValue === "") {
    alert("Please enter Home Town");
    return;
  }

  if (purposeValue === "") {
    alert("Please enter Purpose");
    return;
  }

  saveToLocalStorage({
    imageUrl: imageUrlValue,
    name: nameValue,
    hometown: hometownValue,
    purpose: purposeValue,
    category: selectedCategory,
  });
  cardForm.reset();
  formContainer.style.display = "none";
});

function addCards() {
  let allTasks = localStorage.getItem("tasks");
  allTasks = JSON.parse(allTasks);
  console.log(allTasks);

  allTasks.forEach(function (task) {
    // Create the main card div
    const card = document.createElement("div");
    card.classList.add("card");


    const img = document.createElement("img");
    img.src = task.imageUrl;
    img.alt = "Profile";
    card.appendChild(img);

  
    const h2 = document.createElement("h2");
    h2.textContent = task.name;
    card.appendChild(h2);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const hometownP = document.createElement("p");
    hometownP.innerHTML = `<span>Hometown:</span> ${task.hometown}`;
    infoDiv.appendChild(hometownP);

   
    const purposeP = document.createElement("p");
    purposeP.innerHTML = `<span>Purpose:</span> ${task.purpose}`;
    infoDiv.appendChild(purposeP);

    
    card.appendChild(infoDiv);

    
    const actionDiv = document.createElement("div");
    actionDiv.classList.add("action-btn");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.textContent = "📞 Call";
    actionDiv.appendChild(callBtn);

   
    const msgBtn = document.createElement("button");
    msgBtn.classList.add("message");
    msgBtn.textContent = "Message";
    actionDiv.appendChild(msgBtn);

    // Append action buttons to card
    card.appendChild(actionDiv);

 
    document.querySelector(".card-stack").appendChild(card);
  });
}
addCards();


// function updateCardStack(){
//     const cards = document.querySelector(".card-stack .card");

//    for(let i=0; i<3; i++) {
//          card.style.zIndex = 3 - i;
//          card.style.transform = `translateY(-${i * 10}px) scale(${1 - i * 0.05})`;
//         card.style.opacity = `${1 - i * 0.9}`;

//    }
// }

upBtn.addEventListener("click", function(){
    let lastChild = cardStack.lastElementChild;
    if(lastChild){
        cardStack.insertBefore(lastChild, cardStack.firstElementChild);
        // updateCardStack();
    }
    
    
})
downBtn.addEventListener("click", function(){
     let firstChild = cardStack.firstElementChild;
    if(firstChild){
        cardStack.appendChild(firstChild);
        // updateCardStack();
    }

})
