let currentUserContacts = [];
let currentSelectedID = [];


async function loadContactsData() {
  await downloadFromServer();
  let item = await backend.getItem(`userID${currentUser["id"]}Contacts`);
  currentUserContacts = item || [];
  await proofContactsAvailable();
  renderContacts();
}

async function proofContactsAvailable() {
  let contact;
  if (noContacts() === true) {
    let newContact = getCurrentUserData(contact)
    setCurrentUserData(newContact)
  }
}


function noContacts() {
  if (currentUserContacts == null || currentUserContacts.length == 0 || currentUserContacts == undefined) {
    return true
  } else {
    return false
  }
}


function getCurrentUserData() {
  let nameInitials = getInitialLetters(currentUser["name"]);
  let initialsUpper = nameInitials.toUpperCase();
  newContact = {
    contactCreatorID: currentUser["id"],
    name: currentUser["name"],
    email: currentUser["email"],
    phone: "Edit your Number",
    initialLetters: initialsUpper,
    color: currentUser["color"],
    contactID: 0,
  };
  return newContact
}


async function setCurrentUserData(newContact) {
  currentUserContacts.push(newContact);
  await backend.setItem(`userID${currentUser["id"]}Contacts`, currentUserContacts);
}


function closeAddNewContact() {
  slideOutAnimation('addContact', 'addContactPopup');
  setTimeout(() => {
    let container = document.getElementById("addContactPopup");
    container.classList.add("d-none");
  }, 750);
}


function openAddNewContact() {
  let container = document.getElementById("addContactPopup");
  container.classList.remove("d-none");
  slideInAnimation('addContact', 'addContactPopup');
}


function closeEditContact() {
  slideOutAnimation('editContact', 'editContactPopup');
  setTimeout(() => {
    let container = document.getElementById("editContactPopup");
    container.classList.add("d-none");
  }, 750);

}


function createTaskFromContacts(area, selectedID) {
  addTaskBoard(area);
  let contact = currentUserContacts.find((u) => u.contactID == selectedID);
  if (contact.contactID == 0) {
    return
  }
  users.push(contact);
  console.log(users);
}


async function createNewContact(event) {
  event.preventDefault();
  let nameInput = tryGetName();
  let emailInput = tryGetEmail();
  let numberInput = tryGetPhone();
  let newColor = addUserColor();
  let nameInitials = getInitialLetters(nameInput);
  let currentContactID = currentUserContacts.length;
  let data = { nameInput, emailInput, numberInput, newColor, nameInitials, currentContactID }
  let newContact = makeDataToContact(data);
  if (proofEmail(emailInput) === true && proofName(nameInput) === true && numberInput.length > 5 && numberInput.length < 16) {
    setNewContact(newContact)
  }

}


function makeDataToContact(data) {
  newContact = {
    contactCreatorID: currentUser["id"],
    name: data.nameInput,
    email: data.emailInput,
    phone: data.numberInput,
    initialLetters: data.nameInitials,
    color: data.newColor,
    contactID: data.currentContactID,
  };
  return newContact
}


async function setNewContact(newContact) {
  currentUserContacts.push(newContact);
  await backend.setItem(`userID${currentUser["id"]}Contacts`, currentUserContacts);
  slideOutAnimation('addContact', 'addContactPopup');
  setTimeout(() => {
    window.location.href = `contacts.html`;
  }, 750);

}


function renderContacts() {
  sortContacts()
  let dropArea = document.getElementById("contactsArea");
  dropArea.innerHTML = "";
  let currentLetter = "";
  for (let i = 0; i < currentUserContacts.length; i++) {
    const contact = currentUserContacts[i];
    let firstLetter = contact.name[0].toUpperCase();
    if (firstLetter !== currentLetter) {
      dropArea.innerHTML += `<span class="firstletter">${firstLetter}</span>`;
      currentLetter = firstLetter;
    }
    dropArea.innerHTML += renderContactsHTML(contact);
  }
}


function sortContacts() {
  currentUserContacts.sort((a, b) => {
    if (a.contactID === 0) return -1;
    if (b.contactID === 0) return 1;
    return a.name.localeCompare(b.name);
  });
}


function openContact(id, selectedID) {
  setFocus(id, selectedID);
  let rightSection = document.getElementById("rightSectionCO");
  rightSection.classList.remove("d-none");
  let contactContainer = document.getElementById("slideContainer");
  contactContainer.classList.remove("d-none");
  let contact = currentUserContacts.find((u) => u.contactID == selectedID);
  renderSelectedContact(contact, selectedID);
}


function renderSelectedContact(contact, selectedID) {
  let initialsSlides = document.getElementById("slideContactsBubble");
  let nameSlide = document.getElementById("slideName");
  let emailSlide = document.getElementById("slideEmail");
  let phoneSlide = document.getElementById("slidePhone");
  let editSlide = document.getElementById("slideEditContact");
  phoneSlide.innerHTML = `<number>+${contact.phone}</number>`;
  emailSlide.innerHTML = `<a class="lightblueColor">${contact.email}</a>`;
  nameSlide.innerHTML = `<span class="slideNameSize">${contact.name}</span>`;
  initialsSlides.innerHTML = `<div style="background:${contact.color}" class="slideContactsBubble">${contact.initialLetters}</div>`;
  contactsAddTask.innerHTML = `<div class="lightblueColor addTaskBtnCO add-task" onclick="createTaskFromContacts('todo', ${selectedID})"> <img src="../assets/img/plusIconBlue.svg">  add task</div>`
  editSlide.innerHTML = renderContactAddTaskHTML(selectedID)
}


function openEditContact(selectedID) {
  slideInAnimation('editContact', 'editContactPopup');
  let popupEditContainer = document.getElementById("editContactPopup");
  popupEditContainer.classList.remove("d-none");
  let contact = currentUserContacts.find((u) => u.contactID == selectedID);
  loadCurrentDataContactEdit(contact, selectedID)
}


function loadCurrentDataContactEdit(contact, selectedID) {
  let contactBubble = document.getElementById("bubbleInEditSection");
  let emailEdit = document.getElementById("editEmail");
  let phoneEdit = document.getElementById("editPhone");
  let nameEdit = document.getElementById("editName");
  nameEdit.value = `${contact.name}`
  emailEdit.value = `${contact.email}`;
  let formatedNumber = contact.phone.split(" ")[0] + contact.phone.split(" ")[1];
  phoneEdit.value = `${formatedNumber}`;
  contactBubble.innerHTML = `<div style="background:${contact.color}" class="slideContactsBubble">${contact.initialLetters}</div>`;
  setTimeout(() => { phoneEdit.type = "number"; }, 100);
  currentSelectedID.push(selectedID);
}


async function saveEdit(event) {
  event.preventDefault();
  let id = currentSelectedID;
  let nameEdit = tryGetName();
  currentUserContacts[id]["name"] = nameEdit;
  let emailEdit = tryGetEmail();
  currentUserContacts[id]["email"] = emailEdit;
  let phoneEdit = tryGetPhone();
  currentUserContacts[id]["phone"] = phoneEdit;
  let nameInitials = getInitialLetters(nameEdit);
  currentUserContacts[id]["initialLetters"] = nameInitials;
  if (proofEditName() === true && proofEditEmail() === true && phoneEdit.length > 5 && phoneEdit.length < 16) {
    await backend.setItem(`userID${currentUser["id"]}Contacts`, currentUserContacts);
    window.location.href = `contacts.html`;
  }
}


function tryGetEmail() {
  let newEmail = document.getElementById("email").value.toLowerCase();
  addContactEmail(newEmail);
  if (newEmail === "") {
    let nameEdit = document.getElementById("editEmail").value.toLowerCase();
    addContactEmail(nameEdit);
    return nameEdit;
  } else {
    return newEmail;
  }
}


function addContactEmail(email) {
  let newEmail = email;
  let emailRegex = getEmailRegEx(newEmail);
  if (!emailRegex.test(newEmail)) {
    proofEmail();
    return;
  } else {
    return newEmail;
  }
}


function tryGetPhone() {
  let newPhone = document.getElementById("phone").value;
  let newNumber = setPhoneNumber(newPhone);
  if (newPhone === "" || newNumber == newPhone) {
    let phoneEdit = document.getElementById("editPhone").value;
    let editNumber = setPhoneNumber(phoneEdit);
    return editNumber;
  }
  if (newPhone.length < 4) {
    return false;
  } else {
    return newNumber;
  }
}


function setPhoneNumber(numberInput) {
  let phoneNumber = numberInput.replace(/\D/g, "");
  phoneNumber = `${phoneNumber}`;
  phoneNumber = phoneNumber.replace(/(\d{4})(\d{1})/, "$1 $2");
  return phoneNumber;
}


function tryGetName() {
  let name = document.getElementById("name").value.toLowerCase();
  let newName = addContactName(name);
  if (name === "" || newName === name) {
    let nameEdit = document.getElementById("editName").value.toLowerCase();
    let editName = addContactName(nameEdit);
    return editName;
  } else {
    return newName;
  }
}


function addContactName(name) {
  let newName = name.replace(/\b\w/g, (l) => l.toUpperCase());
  return newName;
}


function proofEditName() {
  let regName = /^[\wäöüÄÖÜ]+(?: [\wäöüÄÖÜ]+)+$/;
  let name = document.getElementById("editName").value;
  if (!regName.test(name)) {
    document.getElementById("editName").focus();
    document.getElementById("editName").classList.add("falseInput");
    return false;
  } else {
    document.getElementById("editName").classList.remove("falseInput");
    return true;
  }
}


function proofEditEmail() {
  let regEmail = getEmailRegEx();
  let email = document.getElementById("editEmail").value;
  if (!regEmail.test(email)) {
    document.getElementById("editEmail").focus();
    document.getElementById("editEmail").classList.add("falseInput");
    return false;
  } else {
    document.getElementById("editEmail").classList.remove("falseInput");
    return true;
  }
}


function proofPhone(id) {
  const phoneInput = document.getElementById(id);
  const phoneError = document.getElementById("phoneError");
  if (phoneInput.value.length < 5) {
    setMinTextForInput(id, phoneError)
    return false;
  } else if (phoneInput.value.length > 14) {
    setMaxTextForInput(id, phoneError)
    return false;
  } else {
    setNoneTextForInput(id, phoneError)
    return true;
  }
}


function setMinTextForInput(id, phoneError) {
  document.getElementById(id).focus();
  document.getElementById(id).classList.add("falseInput");
  phoneError.innerText = "Phone number min 5 Numbers";
}


function setMaxTextForInput(id, phoneError) {
  document.getElementById(id).focus();
  document.getElementById(id).classList.add("falseInput");
  phoneError.innerText = "Phone number max 15 Numbers";
}


function setNoneTextForInput(id, phoneError) {
  phoneError.innerText = "";
  document.getElementById(id).classList.remove("falseInput");
}


function clearContactsInputs() {
  let name = document.getElementById("name");
  name.value = "";
  let email = document.getElementById("email");
  email.value = "";
  let phone = document.getElementById("phone");
  phone.value = "";
  closeAddNewContact()
}

// Responsive //


function backToContacts() {
  let rightContactContainer = document.getElementById('rightSectionCO')
  rightContactContainer.classList.add('d-none')
}


function myFunction(x) {
  let textPosi = document.getElementById('textPosi')
  let textPosiRE = document.getElementById('textPosiRE')
  let sectionHidden = document.getElementById('rightSectionCO')
  if (x.matches) { // If media query matches
    textPosi.classList.add('d-none')
    textPosiRE.classList.remove('d-none')
    sectionHidden.classList.add('d-none')
    console.log("1+");
  } else {
    textPosi.classList.remove('d-none')
    textPosiRE.classList.add('d-none')
    sectionHidden.classList.remove('d-none')
  }
}

setTimeout(() => {
  let x = window.matchMedia("(max-width: 1000px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
}, 100);