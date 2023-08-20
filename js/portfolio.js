import { portfolioData } from "./portfolioData.js";

const workList = document.querySelector("[data-work-list]");
const buttonList = document.querySelector(".button__list");

const filteredPortfolio = (type = "Все") =>
  portfolioData.filter((card, _, array) => {
    if (type === "Все") return array;
    if (type === "Приложения") type = "Приложение";
    if (type === "Веб-сайты") type = "Веб-сайт";
    return card.desc === type;
  });

let staticMarkup = filteredPortfolio("Все");
const markup = (array = portfolioData) => {
  return (staticMarkup = array
    .map(
      (card) => `<li class="works__item">
    <div class="works__img">
      <a href="/">
        <picture>
          <source media="(min-width: 1200px)"
          srcset=${card.src.src1200}
          />
          <source media="(min-width: 768px)"
          srcset=${card.src.src768}
          />
          <source media="(max-width: 767px)"
          srcset=${card.src.src767}
          />
          <img class="portfolio-img" src=${card.src.src} alt="Изображение" />
        </picture>
        <div class="overlay">
          <p class="overlay__text">${card.text}
          </p>
        </div>
      </a>
    </div>
    <div class="border">
      <h2 class="works__title">${card.desc}</h2>
      <p class="works__text">${card.title}</p>
    </div>
    </li>`
    )
    .join(" "));
};
markup();

const handleButtonClick = (event) => {
  if (event.target.nodeName !== "BUTTON") return;
  workList.innerHTML = "";
  const filteredArr = filteredPortfolio(event.target.innerText);
  staticMarkup = markup(filteredArr);
  workList.insertAdjacentHTML("beforeend", staticMarkup);
  return staticMarkup;
};
buttonList.addEventListener("click", handleButtonClick);
workList.insertAdjacentHTML("beforeend", staticMarkup);
