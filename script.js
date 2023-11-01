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
    button.addEventListener("click", showFormButtonClick)
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
    input.id = inputName;

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
    form.appendChild(createFormInputElement("Nr tel.: ", "Wpisz nr tel...", "text","phone-number"));

    var div = document.createElement("div");
    var cancelButton = document.createElement("button");
    cancelButton.style.padding = "11px 8px 11px";
    cancelButton.style.borderRadius = "15px";
    cancelButton.style.backgroundColor = "#ff0000";
    cancelButton.style.color = "#ffffff";
    cancelButton.style.border = "none";
    cancelButton.style.fontSize = "larger";
    cancelButton.type = "button";
    cancelButton.addEventListener("click", cancelButtonClick);

    cancelButton.textContent = "Anuluj";
    div.style.display = "flex"
    div.style.justifyContent = "space-around"
    div.style.alignItems = "center";
    div.style.width = "90%";

    var submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Zapisz";
    submitButton.id = "main-button";
    submitButton.style.fontSize = "larger";
    submitButton.style.padding = "10px 20px 10px";
    submitButton.addEventListener("click", submitButtonClick);
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
    form.id = animationTarget.id;
    animationTarget.parentElement.replaceChild(form, animationTarget);
}

function cancelButtonClick(event) {
    let containerForm = event.target.parentElement.parentElement;
    containerForm.parentElement.replaceChild(createMainElementObject(containersMap.get(containerForm.id)), containerForm);
}

function validateForm(firstName, lastName, mailAddress, phoneNumber, info) {
    const firstNameValidation = /^[a-z ,.'-]+$/i;
    const lastNameValidation = /^[a-z ,.'-]+$/i;
    const mailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneValidation = /^\d{9}$/;

    var validName = firstNameValidation.test(firstName);
    var validLastName = lastNameValidation.test(lastName);
    var validMail = mailValidation.test(mailAddress);
    var validPhone = phoneValidation.test(phoneNumber);

    console.log(validName);

    let notUsed = true;

    if (!validName) {
        alert("Wprowadzono nieprawidłowe imię!");
    } else if (!validLastName) {
        alert("Wprowadzono nieprawidłowe Nazwisko!");
    } else if (!validMail) {
        alert("Wprowadzono nieprawidłowy adres email!");
    } else if (!validPhone) {
        alert("Wprowadzono nieprawidłowy nr telefonu!");
    } else {
        info["enrolled"].forEach(person => {
            if (person["first-name"] == firstName && person["last-name"] == lastName) {
                alert("Osoba o takim imieniu i nazwisku już jest zapisana!");
                notUsed = false;
            } else if (person["mail"] == mailAddress) {
                alert("Adres email został już wykorzystany!");
                notUsed = false;
            } else if (person["phone"] == phoneNumber) {
                alert("Numer telefonu został już wykorzystany!");
                notUsed = false;
            }
        });
    }

    return validName && validLastName && validMail && validPhone && notUsed;

}

function submitButtonClick(event) {
    let containerForm = event.target.parentElement.parentElement;
    let courseInfo = containersMap.get(containerForm.id);

    let firstNameValue = containerForm.querySelector("#first-name").value;
    let lastNameValue = containerForm.querySelector("#last-name").value;
    let mailAddressValue = containerForm.querySelector("#e-mail").value;
    let phoneNumberValue = containerForm.querySelector("#phone-number").value;

    console.log(firstNameValue);

    if (validateForm(firstNameValue, lastNameValue, mailAddressValue, phoneNumberValue, courseInfo)) {
        courseInfo["enrolled"].push({
            "first-name": firstNameValue,
            "last-name": lastNameValue,
            "mail": mailAddressValue,
            "phone": phoneNumberValue
        })
        containerForm.parentElement.replaceChild(createMainElementObject(containersMap.get(containerForm.id)), containerForm);
    }
}

const containersMap = new Map();

fetch('courses.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        var mainContainer = document.querySelector("#main-container");
        data.courses.forEach(course => {
            containersMap.set(course["name"], course);
            mainContainer.appendChild(createMainElementObject(course));
        })
});
    


