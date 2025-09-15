let cardContainer = document.querySelector(".card-container")
let allBtn = document.querySelector(".all-btn")
let mode = document.querySelector(".mode")
let body = document.body

let navItems = document.querySelectorAll(".nav-item")
let isActiveData;
let isInActiveData;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark")
}

let data;
async function getData() {
    const response = await fetch("./data.json")
     data = await response.json()
    displayData(data)

isActiveData = data.filter((el)=>{
  return el.isActive == true
})

isInActiveData = data.filter((el)=>{
  return el.isActive == false
})
console.log(isActiveData);
}
function displayData(data) {
    let ExtentionDetails = ""
    for (let i = 0; i < data.length; i++) {
        let extention = data[i];
        ExtentionDetails += `
            <div class="card">
          <div class="flex">
            <img src=${extention.logo} alt="dev-lens-logo">
            <div class="text">
              <h3>${extention.name}</h3>
              <p>${extention.description}</p>
            </div>
          </div>
          <div class="card-box-btns">
            <button class="remove-btn" onclick="removeExtention(${i})">Remove</button>
            <div class="switch-to-active">
              <input type="checkbox" class="checkbox" id="active-${i}">
              <label for="active${i}" class="${extention.isActive ? "isActive" : ""} label"></label>
            </div>
          </div>
        </div>
    `;

    }
    cardContainer.innerHTML = ExtentionDetails
    toggleSwitch(data)
}
getData()
function toggleSwitch(data) {
    const labels = document.querySelectorAll(".label")
    // console.log(labels);

    for (let i = 0; i < labels.length; i++) {
        labels[i].addEventListener("click", function () {

            if (data[i].isActive == true) {
                data[i].isActive = false;
                labels[i].classList.remove("isActive")
            } else {
                data[i].isActive = true;
                labels[i].classList.add("isActive")
            }
        })
    }

}
function getActiveData(isActiveData){
console.log("all Data");
displayData(isActiveData)
}
function getInActiveData(isInActiveData){
console.log("Inactive Data");
displayData(isInActiveData)
}
function removeExtention(index){
  document.querySelectorAll(".card")[index].classList.add("removing")
  setTimeout(()=>{
    data.splice(index,1)
    cardContainer.innerHTML=""
    displayData(data)  
  },300)

}
for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click",function(e){
    const activeBtn = document.querySelector(".active-btn")
    activeBtn.classList.remove("active-btn")
    e.target.classList.add("active-btn")
  })
  
}




mode.addEventListener("click",function(){
  body.classList.toggle("dark")
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme","dark")
    mode.querySelector("img").setAttribute("src","./assets/images/icon-sun.svg") ;
    
  }
  else{
        localStorage.setItem("theme","light")
            mode.querySelector("img").setAttribute("src","./assets/images/icon-moon.svg") ;
  }


})