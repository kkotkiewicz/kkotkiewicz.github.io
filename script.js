function createMainElementRowObject(innerText) {
    let div = document.createElement("div");
    div.classList.add("main-element-row");

    div.textContent = innerText
    return div
}

function createMainElementObject(objectData) {
    let container = document.createElement("section");
    container.classList.add("main-element");
    container.id = objectData["name"];

    let imgElement = document.createElement("img")
    imgElement.src = objectData["img-url"]

    let divImg = document.createElement("div");
    divImg.classList.add("main-element-row");
    divImg.appendChild(imgElement);
    container.appendChild(divImg);

    container.appendChild(createMainElementRowObject(objectData["title"]));
    container.appendChild(createMainElementRowObject(objectData["last-time"]));
    container.appendChild(createMainElementRowObject(objectData["how-often"]));
    container.appendChild(createMainElementRowObject(objectData["place"]));
    container.appendChild(createMainElementRowObject(objectData["price"]));

    let button = document.createElement("button");
    button.classList.add("main-element-row");
    button.id = "main-button"
    button.textContent = "Zapisz się"
    container.appendChild(button);

    return container;
}

function createFormInputElement(labelText, placeholderText, inputType, inputName) {
    let div = document.createElement("div");
    div.classList.add("main-element-row");

    let label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = inputName;

    let input = document.createElement("input");
    input.placeholder = placeholderText;
    input.name = inputName;
    input.type = inputType;
    input.style.padding = "5px"

    div.appendChild(label);
    div.appendChild(input);

    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.width = "90%"
    div.style.height = "15%"
    div.style.alignItems = "center";

    return div;
}

function createFormElement() {
    let form = document.createElement("form");
    form.classList.add("main-element");

    form.appendChild(createFormInputElement("Imię: ", "Wpisz imię...", "text","first-name"));
    form.appendChild(createFormInputElement("Nazw.: ", "Wpisz nazwisko...", "text","last-name"));
    form.appendChild(createFormInputElement("E-mail: ", "Wpisz adres email...", "text","e-mail"));
    form.appendChild(createFormInputElement("Nr tel.: ", "Wpisz nr tel...", "text","first-name"));

    var div = document.createElement("div");
    var cancelButton = document.createElement("button");
    cancelButton.style.padding = "11px 8px 11px";
    cancelButton.style.borderRadius = "15px";
    cancelButton.style.backgroundColor = "#ff0000";
    cancelButton.style.color = "#ffffff";
    cancelButton.style.border = "none";
    cancelButton.style.fontSize = "larger";

    cancelButton.textContent = "Anuluj";
    div.style.display = "flex"
    div.style.justifyContent = "space-around"
    div.style.alignItems = "center";
    div.style.width = "90%";

    var submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Zapisz";
    submitButton.id = "main-button";
    submitButton.style.fontSize = "larger";
    submitButton.style.padding = "10px 20px 10px";
    div.appendChild(submitButton);
    div.appendChild(cancelButton);
    form.appendChild(div);

    return form;
}

function showFormButtonClick(event) {
    animationTarget = event.target.parentElement;
    animationTarget.style.animation = "myAnimHide 2s ease 0s 1 normal forwards";

    form = createFormElement();
    form.style.justifyContent = "space-around";
    animationTarget.parentElement.replaceChild(form, animationTarget);
}

function makeButtonsClickable() {
    var inner_buttons = document.querySelectorAll("#main-button");

    console.log(inner_buttons)

    inner_buttons.forEach(button => button.addEventListener("click", showFormButtonClick))
}

fetch('courses.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        var mainContainer = document.querySelector("#main-container");
        data.courses.forEach(course => {
            mainContainer.appendChild(createMainElementObject(course));
        })
        makeButtonsClickable()
});
    


