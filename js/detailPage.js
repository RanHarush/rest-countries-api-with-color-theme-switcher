let cardWrapper = document.querySelector(".card-wrapper");
let backBtn = document.querySelector(".back-btn");
let countryName = localStorage.getItem("countryName");
let rootVar = document.querySelector(":root");

window.addEventListener("load", () => {
  loadAPI(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
  document.querySelector(".myBtn").addEventListener("click", switchTheLight);
});

backBtn.addEventListener("click", () => {
  location.assign("google.com");
});

const loadAPI = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let [data1] = data;
      displayDetailPageCard(data1);
    });
};

const displayDetailPageCard = (obj) => {
  let a;
  let b;
  for (let item in obj.name.nativeName) {
    a = item;
  }
  for (let item1 in obj.currencies) {
    b = item1;
  }
  let c = Object.values(obj.languages);
  c += "";
  c = c.replaceAll(",", ` ,`);

  cardWrapper.innerHTML = `
      <img src="${obj.flags.png}" alt="${obj.name.common}">
            <div class="card-details">
              <div class="left-details">
                <h2 class="mb-5">${obj.name.common}</h2>
                <p><b>Native Name:</b> ${obj.name.nativeName[a].common}</p>
                <p><b>Population:</b> ${obj.population}</p>
                <p><b>Region:</b> ${obj.region}</p>
                <p><b>Sub Region:</b> ${obj.subregion}</p>
                <p><b>Capital:</b> ${obj.capital}</p>
              </div>
              <div class="right-details mt-3">
                <p><b>Top Level Domain:</b> ${obj.tld}</p>
                <p><b>Currencies:</b> ${obj.currencies[b].name}</p>
                <p id="languageDisplay"><b>Languages:</b> ${c}</p>
              </div>
              <div class="border-details" id="display-border">
                <span>Border Countries:</span>
              </div>
            </div>
    `;

  const displayBtn = (data) => {
    let displayBorder = document.querySelector("#display-border");
    let btn = document.createElement("button");
    btn.setAttribute("class", "py-1 px-4");
    btn.setAttribute("onclick", `loadAPI("https://restcountries.com/v3.1/name/${data.name.common}?fullText=true")`);
    btn.innerHTML += `
    ${data.name.common}
  `;
    displayBorder.appendChild(btn);
  };

  const loadApiByCountryCode = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let [data1] = data;
        displayBtn(data1);
      });
  };
  for (let item of obj.borders) {
    loadApiByCountryCode(`https://restcountries.com/v3.1/alpha/${item}`);
  }
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
