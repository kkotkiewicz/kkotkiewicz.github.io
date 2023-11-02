const mainPageButton = document.querySelector("#main-page");
const aboutPageButton = document.querySelector("#about-us");
const contactPageButton = document.querySelector("#contact");

mainPageButton.addEventListener("click", (event) => {location.replace("./index.html")});
aboutPageButton.addEventListener("click", (event) => {location.replace("./o_nas.html")});
contactPageButton.addEventListener("click", (event) => {location.replace("./contact.html")});