let contentWrapper = document.querySelector(".content-wrapper");
let inputID = document.getElementById("inputID");
let dropdownMenu = document.querySelector(".dropdownMenu");
let rootVar = document.querySelector(":root");

window.addEventListener("load", () => {
  loadAPI("https://restcountries.com/v3.1/all");
  document.querySelector(".myBtn").addEventListener("click", switchTheLight);
});

const loadAPI = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCard(data);
      inputID.addEventListener("input", () => {
        searchByName(data);
      });
      dropdownMenu.addEventListener("change", () => {
        searchByRegion(data);
      });
    });
};

const displayCard = (obj) => {
  contentWrapper.innerHTML = "";
  for (let item of obj) {
    contentWrapper.innerHTML += `
     <div class="card mt-5" id="cardID" style="width: 21rem;">
       <img src="${item.flags.png}" class="card-img-top" id="imgID_${item.name.common}" alt="${item.name.common}">
         <div class="card-body mt-2 mb-5 ms-3">
           <h5 class="card-title py-3" id="card-title">${item.name.common}</h5>
           <p class="card-text mb-2" id="card-pop"><span>Population:</span> ${item.population}</p>
           <p class="card-text my-2" id="card-region"><span>Region:</span> ${item.region}</p>
           <p class="card-text" id="card-capital"><span>Capital:</span> ${item.capital}</p>
         </div>
     </div>
    `;
  }
  for (let item of obj) {
    document
      .getElementById(`imgID_${item.name.common}`)
      .addEventListener("click", () => {
        localStorage.setItem("countryName", `${item.name.common}`);
        location.assign("detailPage.html");
      });
  }
};

const searchByName = (obj) => {
  obj = obj.filter((item) => item.name.common.includes(inputID.value));
  displayCard(obj);
};

const searchByRegion = (obj) => {
  obj = obj.filter((item) => item.region.includes(dropdownMenu.value));
  displayCard(obj);
};

const switchTheLight = () => {
  let rs = getComputedStyle(rootVar);
  let result = rs.getPropertyValue("--light-mode-bg");
  result = result.trim();
  if (result == "#fafafa") {
    rootVar.style.setProperty("--light-mode-txt", "#ffffff");
    rootVar.style.setProperty("--light-mode-el", "#2b3945");
    rootVar.style.setProperty("--light-mode-bg", "#202c37");
    rootVar.style.setProperty("--light-mode-input", "#2b3945");
  } else {
    rootVar.style.setProperty("--light-mode-txt", "#111517");
    rootVar.style.setProperty("--light-mode-el", "#ffffff");
    rootVar.style.setProperty("--light-mode-bg", "#fafafa");
    rootVar.style.setProperty("--light-mode-input", "#858585");
  }
};
