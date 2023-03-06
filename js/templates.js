let animationTimeout;

async function initTemplates() {
  document.getElementById("header").innerHTML = headerHTML();
  if (window.innerWidth <= 1000) {
    animationTimeout = 0;
    document.getElementById("navbar-bottom").innerHTML = navbarMobileHTML();
  } else {
    animationTimeout = 750;
    document.getElementById("sidebar").innerHTML = sidebarHTML();
  }

  getInitialForHeader();
}

window.addEventListener('resize', function () {
  let delay = 250 // delay between calls
  let throttled = false // are we currently throttled? 
  if (!throttled) {
    // actual callback action
    initTemplates();
    // we're throttled!
    throttled = true;
    // set a timeout to un-throttle
    setTimeout(function () {
      throttled = false;
    }, delay);
  }
});

function addTaskCloseTopRight() {
  document.getElementById('headline-addtask').innerHTML = addTaskCloseTopRightHTML();
}

function barBottomHidden() {
  if (window.innerWidth <= 1000) {
    let navbar = document.getElementById('navbar-bottom')
    navbar.classList.add("d-none")
  }
}

function addTaskCloseTopRightHTML() {
  return `
  <div class="headline-addTask">
    <h1>Add Task</h1>
    <img onclick="closeAddTaskBoard(), clearTask()" src="../assets/img/clear.svg" alt="">
  </div>
  `;
}


function headerHTML() {
  return /*html*/ `
<div class="header">
  <span class="header-headline mobile-d-none">
    Kanban Project Management Tool
  </span>
  <a class="mobile-logo" href="../html/summary.html">
    <img class="only-mobile" src="../assets/img/logo.svg">
  </a>
  <div class="help-log-parent">
    <a id="helpIcon" class="help-img mobile-d-none" href="../html/help.html">
      <img src="../assets/img/infoIcon.svg">
    </a>
    <div id="creatTaskBtnMobile" class="log-in"></div>
    <div id="loginContainer" class="log-in">
      <div class="log-in-img">
        <div class="assignBubble noPadding" id="currentUserInitials"> Is </div>
      </div>
      <div id="headerPopupDiv" class="d-none popupSections">
        <a class="popupSection only-mobile" href="../html/help.html">Help</a>
        <p class="popupSection" onclick="goToEdit()">Edit User</p>
        <p class="popupSection" onclick="logout()">Log out</p>
      </div>
    </div>
  </div>
</div>
`
}


function sidebarHTML() {
  return /*html*/ `
<div class="sidebar mobile-d-none">
  <div>
      <div class="parent-logo">
          <a href="../html/summary.html">
            <img src="../assets/img/sideLogo.svg">
          </a>
      </div>
      <div>
          <div id="summarySide">
            <a class="aSide" href="../html/summary.html">
            <div class="d-flex">
              <img class="link-img" src="../assets/img/summaryIcon.svg">
            </div>
            <div>Summary</div>
          </a>
        </div>
        <div id="boardSide">   
          <a class="aSide" href='../html/board.html'>
            <div>
              <img class="link-img" src="../assets/img/bordIcon.svg">
            </div>
            <div>Board</div>
          </a>
        </div>
        <div id="addTaskSide"> 
          <a class="aSide" href="../html/addTask.html">
            <div>
              <img class="link-img" class="marginRight" src="../assets/img/addTaskIcon.svg">
            </div>
            <div>Add Task</div>
          </a>
        </div>
        <div id="contactsSide"> 
          <a class="aSide" href="../html/contacts.html">
            <div>
              <img class="link-img" src="../assets/img/contactsIcon.svg">
            </div>
            <div>Contacts</div>
          </a>
        </div>
      </div>
  </div>
  <div class="notice-parent">
      <div class="notice" id="legalSide">
        <a class="legalNotice" href="../html/legal.html"> 
          <img src="../assets/img/legalIcon.svg">
          <span>Legal Notice</span>
        </a>
      </div>
  </div>
</div>
    `;
}

function navbarMobileHTML() {
  return /*html*/`
      <nav class="only-mobile navbar-bottom">
        <div id="summarySide" class="navbar-sections">
            <a class="nav-section" href="../html/summary.html">
                <img class="nav-section-svg" src="../assets/img/summaryIcon.svg">
                <div>Summary</div>
            </a>
        </div>
        <div id="boardSide" class="navbar-sections">   
            <a class="nav-section" href='../html/board.html'>
                <img class="nav-section-svg" src="../assets/img/bordIcon.svg">
                <div>Board</div>
            </a>
        </div>
        <div id="addTaskSide" class="navbar-sections"> 
            <a class="nav-section" href="../html/addTask.html">
                <img class="nav-section-svg" src="../assets/img/addTaskIcon.svg">
                <div>Add Task</div>
            </a>
        </div>
        <div id="contactsSide" class="navbar-sections"> 
            <a class="nav-section" href="../html/contacts.html">
                <img class="nav-section-svg" src="../assets/img/contactsIcon.svg">
                <div>Contacts</div>
            </a>
        </div>
      </nav>
      `;
}


function addTaskHTML() {
  return /*html*/ `
  <div id="slidePopup" class="addTaskPopup slidePopup d-none">
    <div><p>Task added to board</p></div>
    <svg width="28" height="28" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.9984 2.96561L20.9984 20.9656C20.9979 21.4959 20.787 22.0043 20.412 22.3792C20.0371 22.7542 19.5287 22.9651 18.9984 22.9656L14.9984 22.9656C14.4681 22.9651 13.9597 22.7542 13.5848 22.3792C13.2098 22.0043 12.9989 21.4959 12.9984 20.9656L12.9984 2.96561C12.9989 2.43534 13.2098 1.92694 13.5848 1.55198C13.9597 1.17702 14.4681 0.966137 14.9984 0.965608L18.9984 0.965608C19.5287 0.966137 20.0371 1.17702 20.412 1.55198C20.787 1.92694 20.9979 2.43534 20.9984 2.96561ZM14.9984 20.9656L18.9984 20.9656L18.9984 2.96561L14.9984 2.96561L14.9984 20.9656ZM14.9984 2.96561L14.9984 20.9656C14.9979 21.4959 14.787 22.0043 14.412 22.3792C14.0371 22.7542 13.5287 22.9651 12.9984 22.9656L8.99841 22.9656C8.46814 22.9651 7.95974 22.7542 7.58478 22.3792C7.20983 22.0043 6.99894 21.4959 6.99841 20.9656L6.99841 2.96559C6.99894 2.43532 7.20983 1.92692 7.58478 1.55196C7.95974 1.177 8.46814 0.966119 8.99841 0.965589L12.9984 0.965589C13.5287 0.966118 14.0371 1.177 14.412 1.55196C14.787 1.92692 14.9979 2.43534 14.9984 2.96561ZM8.99841 20.9656L12.9984 20.9656L12.9984 2.96561L8.99841 2.96559L8.99841 20.9656ZM8.99841 2.96559L8.99841 20.9656C8.99788 21.4959 8.787 22.0043 8.41204 22.3792C8.03708 22.7542 7.52868 22.9651 6.99841 22.9656L2.99841 22.9656C2.46814 22.9651 1.95974 22.7542 1.58478 22.3792C1.20983 22.0043 0.998942 21.4959 0.998413 20.9656L0.998412 2.96559C0.998942 2.43532 1.20983 1.92692 1.58478 1.55196C1.95974 1.177 2.46814 0.966119 2.99841 0.965589L6.99841 0.965589C7.52868 0.966119 8.03708 1.177 8.41204 1.55196C8.787 1.92692 8.99788 2.43532 8.99841 2.96559ZM2.99841 20.9656L6.99841 20.9656L6.99841 2.96559L2.99841 2.96559L2.99841 20.9656Z" fill="white"/>
      <path d="M26.9984 2.96583L26.9984 20.9658C26.9979 21.4961 26.787 22.0045 26.412 22.3794C26.0371 22.7544 25.5287 22.9653 24.9984 22.9658L20.9984 22.9658C20.4681 22.9653 19.9597 22.7544 19.5848 22.3794C19.2098 22.0045 18.9989 21.4959 18.9984 20.9656L18.9984 2.96561C18.9989 2.43534 19.2098 1.92716 19.5848 1.5522C19.9597 1.17724 20.4681 0.96636 20.9984 0.965831L24.9984 0.965831C25.5287 0.96636 26.0371 1.17724 26.412 1.5522C26.787 1.92716 26.9979 2.43556 26.9984 2.96583ZM20.9984 20.9656L24.9984 20.9658L24.9984 2.96583L20.9984 2.96561L20.9984 20.9656Z" fill="white"/>
    </svg>
  </div>
  <div class="placeHolderDIV">
    <form class="addTaskContainer" onsubmit="createNewTask(event);">
      <div class="paddLeRe40px" id="headline-addtask">
        <h1>Add Task</h1>
      </div>
      <div class="leftAndRightContainer">    
        <div class="leftSection">
          <div class="inputContainer" title="Please enter a title">
            <b class="padd4px">Title</b> 
            <input id="title" type="text" oninput="proofInput('msgBoxTitleTask')" >
            <div class="transparentDiv">
              <div class="requiredText" id="msgBoxTitleTask"></div>
            </div>  
          </div>
          <div class="inputContainer" title="Please enter a description">
            <b class="padd4px">Description</b>
            <textarea oninput="proofInput('msgBoxDescriptionTask')" id="description" type="text"></textarea>
            <div class="transparentDiv">
              <div class="requiredText" id="msgBoxDescriptionTask"></div>  
            </div>
          </div>
          <div onclick="proofInput('msgBoxCategoryTask')" id="openCategoryContainer" class="inputContainer">
            <span class="padd4px">
              <b>Category</b>
            </span>
            <div id="categoryIsOpen"class="openCategory inputContainer">
              <div class="dropColorContainerSet d-none" id="dropColorContainerSet" title="Please enter a category"></div>
              <span id="selectedCategory" class="selectedCategoryText" onclick="openCategory()">select a category</span>
               <svg onclick="openCategory()" id="arrayCategory" class="openArrayIcon" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.2 0H1.41421C0.523309 0 0.0771403 1.07714 0.707105 1.70711L6.29289 7.29289C6.68342 7.68342 7.31658 7.68342 7.70711 7.29289L13.2929 1.70711C13.9229 1.07714 13.4767 0 12.5858 0H11.8H7H2.2Z" fill="black"/>
                </svg>
            </div>
            <div class="d-none contactContainer" id="category-anim">
                  <span id="newCategory" class="allCategorysContainer newCategory" onclick="newCategory()">new category</span>
                  <span id="allCategorys" class="overflow"></span> 
                </div>
            <div class="transparentDiv">
              <div class="requiredText" id="msgBoxCategoryTask"></div>  
            </div>
          </div>
          <div class="d-none" id="createCategoryContainer">
          <span>
            <b class="padd4px">Category</b>
          </span>
            <div class="newCategoryDiv">
              <input class="createCategoryInput" name="output" oninput="dropColorInInput()" id="createCategory" placeholder="New category name" maxlength="20">             
              <div onclick="closeNewCategory()" class="closeNewCategory">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5011 12.5001L17.7441 17.7431M7.25806 17.7431L12.5011 12.5001L7.25806 17.7431ZM17.7441 7.25708L12.5001 12.5001L17.7441 7.25708ZM12.5001 12.5001L7.25806 7.25708L12.5001 12.5001Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div onclick="setNewCategory()" class="acceptNewCategory">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12.5L10 18.5L20 6.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="dropColorContainer d-none" id="dropColorContainer"></div>
            </div>
            <div class="colorCategoryContainer">
              <div onclick="setColor('LightBlue')" id="categoryLightBlue" class="colorCategoryLightBlue"></div>
              <div onclick="setColor('Red')" id="categoryRed" class="colorCategoryRed"></div>
              <div onclick="setColor('Green')" id="categoryGreen" class="colorCategoryGreen"></div>
              <div onclick="setColor('Orange')" id="categoryOrange" class="colorCategoryOrange"></div>
              <div onclick="setColor('Purple')" id="categoryPurple" class="colorCategoryPurple"></div>
              <div onclick="setColor('Blue')" id="categoryBlue" class="colorCategoryBlue"></div>
            </div>
          </div>
          <div onclick="proofInput('msgBoxAssignedTask')" class="inputContainer" id="inputContainer">
            <b class="padd4px">Assigned to</b> 
            <div onclick="openAssignedTo('arrayAssigned', 'contactDiv', 'contactList', 'contacts', 'contactInitials')" id="contactDiv" class="openCategoryContainer" title="Please choose a contact">Select contact to assign 
              <svg id="arrayAssigned" class="openArrayIcon" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.2 0H1.41421C0.523309 0 0.0771403 1.07714 0.707105 1.70711L6.29289 7.29289C6.68342 7.68342 7.31658 7.68342 7.70711 7.29289L13.2929 1.70711C13.9229 1.07714 13.4767 0 12.5858 0H11.8H7H2.2Z" fill="black"/>
              </svg>
            </div>
              <div class="contactContainer d-none overflow" id="contactList">
                <div id="contacts"></div>
                <div id="selectedContact" class="newCategoryDiv"></div>
              </div>
              <div class="transparentDiv">
                <div class="requiredText" id="msgBoxAssignedTask"></div>
              </div>
            </div>
            <div class="d-flex" id="contactInitials"></div>
          </div>
        <div class="rightSection">
          <div onclick="proofInput('msgBoxDateTask')" class="inputContainer">
            <b class="padd4px">Due date</b> 
            <input id="date" type="date" min="${dateTodayISO()}" title="Please choose a due date">
            <div class="transparentDiv">
              <div class="requiredText" id="msgBoxDateTask"></div>
            </div>
          </div>
          <div onclick="proofInput('msgBoxPrioTask')" class="prio">
            <b class="padd4px">Prio</b>
            <div class="prioBtnContainer">
              <div id="highBtnContainer" class="checkboxContainer">
                <input onclick="setPrioCheckBox('urgent', '')" id="urgentBtn" class="checkboxPosi" type="checkbox"> 
                <span id="highPrioText" class="prioTextPosi">Urgent</span> 
                <svg id="svgHigh" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00026 5.25476C9.19969 5.25443 9.39397 5.31633 9.55451 5.43137L17.123 10.8653C17.2215 10.9361 17.3046 11.025 17.3678 11.127C17.4309 11.2291 17.4727 11.3422 17.4909 11.4599C17.5276 11.6977 17.4656 11.9399 17.3186 12.1333C17.1716 12.3266 16.9516 12.4553 16.7071 12.4909C16.4625 12.5266 16.2134 12.4664 16.0145 12.3234L9.00026 7.2925L1.98602 12.3234C1.88754 12.3942 1.7757 12.4454 1.65687 12.4742C1.53803 12.5029 1.41455 12.5086 1.29345 12.4909C1.17235 12.4733 1.05602 12.4326 0.951088 12.3712C0.846159 12.3099 0.754691 12.229 0.681906 12.1333C0.609122 12.0375 0.556445 11.9288 0.526885 11.8132C0.497325 11.6977 0.491459 11.5776 0.509623 11.4599C0.527789 11.3422 0.569626 11.2291 0.632752 11.127C0.695876 11.025 0.779049 10.9361 0.877524 10.8653L8.44602 5.43137C8.60656 5.31633 8.80083 5.25443 9.00026 5.25476Z" fill="#FF3D00"/>
                <path d="M9.00002 0.499879C9.19945 0.499544 9.39372 0.561447 9.55427 0.676482L17.1228 6.11045C17.3216 6.25336 17.454 6.46724 17.4907 6.70502C17.5273 6.9428 17.4654 7.18501 17.3184 7.37837C17.1714 7.57173 16.9514 7.70039 16.7068 7.73606C16.4623 7.77173 16.2131 7.71147 16.0143 7.56856L9.00002 2.53761L1.98577 7.56856C1.78689 7.71147 1.53777 7.77173 1.2932 7.73606C1.04863 7.70039 0.828657 7.57173 0.681662 7.37837C0.534667 7.18501 0.472695 6.9428 0.509379 6.70502C0.546065 6.46723 0.678402 6.25336 0.87728 6.11044L8.44577 0.676482C8.60631 0.561447 8.80059 0.499544 9.00002 0.499879Z" fill="#FF3D00"/>
                </svg>
              </div><!--required Problem-->
              <div id="normalBtnContainer" class="checkboxContainer">
                <input onclick="setPrioCheckBox('medium', '')" id="mediumBtn" class="checkboxPosi" type="checkbox">
                <span id="normalPrioText" class="prioTextPosi">Medium</span> 
                <svg id="svgNormal" width="18" height="7" viewBox="0 0 18 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5685 6.66658L1.43151 6.66658C1.18446 6.66658 0.947523 6.56773 0.772832 6.39177C0.598141 6.21581 0.5 5.97716 0.5 5.72831C0.5 5.47947 0.598141 5.24081 0.772832 5.06485C0.947523 4.88889 1.18446 4.79004 1.43151 4.79004L16.5685 4.79004C16.8155 4.79004 17.0525 4.88889 17.2272 5.06485C17.4019 5.24081 17.5 5.47947 17.5 5.72831C17.5 5.97716 17.4019 6.21581 17.2272 6.39177C17.0525 6.56773 16.8155 6.66658 16.5685 6.66658Z" fill="#FFA800"/>
                <path d="M16.5685 2.2098L1.43151 2.2098C1.18446 2.2098 0.947523 2.11094 0.772832 1.93498C0.598141 1.75902 0.5 1.52037 0.5 1.27152C0.5 1.02268 0.598141 0.784025 0.772832 0.608065C0.947523 0.432105 1.18446 0.333252 1.43151 0.333252L16.5685 0.333252C16.8155 0.333252 17.0525 0.432105 17.2272 0.608065C17.4019 0.784025 17.5 1.02268 17.5 1.27152C17.5 1.52037 17.4019 1.75902 17.2272 1.93498C17.0525 2.11094 16.8155 2.2098 16.5685 2.2098Z" fill="#FFA800"/>
                </svg>
              </div><!--required Problem-->
              <div id="lowBtnContainer" class="checkboxContainer">
                <input onclick="setPrioCheckBox('low', '')" id="lowBtn" class="checkboxPosi" type="checkbox">
                <span id="lowPrioText" class="prioTextPosi">Low</span> 
                <svg id="svgLow" width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.49974 7.74524C8.30031 7.74557 8.10603 7.68367 7.94549 7.56863L0.376998 2.13467C0.278524 2.06391 0.195351 1.97498 0.132227 1.87296C0.069103 1.77094 0.0272642 1.65784 0.00909954 1.5401C-0.0275856 1.30232 0.0343859 1.06011 0.181381 0.866747C0.328377 0.67339 0.548355 0.544725 0.792923 0.509057C1.03749 0.47339 1.28661 0.533642 1.48549 0.676559L8.49974 5.7075L15.514 0.67656C15.6125 0.605795 15.7243 0.55458 15.8431 0.52584C15.962 0.4971 16.0855 0.491398 16.2066 0.509058C16.3277 0.526719 16.444 0.567397 16.5489 0.628769C16.6538 0.690142 16.7453 0.771007 16.8181 0.866748C16.8909 0.962489 16.9436 1.07123 16.9731 1.18677C17.0027 1.3023 17.0085 1.42236 16.9904 1.5401C16.9722 1.65784 16.9304 1.77094 16.8672 1.87296C16.8041 1.97498 16.721 2.06391 16.6225 2.13467L9.05398 7.56863C8.89344 7.68367 8.69917 7.74557 8.49974 7.74524Z" fill="#7AE229"/>
                <path d="M8.49998 12.5001C8.30055 12.5005 8.10628 12.4386 7.94574 12.3235L0.377242 6.88955C0.178366 6.74664 0.0460289 6.53276 0.00934368 6.29498C-0.0273415 6.0572 0.0346301 5.81499 0.181625 5.62163C0.328621 5.42827 0.548599 5.29961 0.793167 5.26394C1.03773 5.22827 1.28686 5.28853 1.48574 5.43144L8.49998 10.4624L15.5142 5.43144C15.7131 5.28853 15.9622 5.22827 16.2068 5.26394C16.4514 5.29961 16.6713 5.42827 16.8183 5.62163C16.9653 5.81499 17.0273 6.0572 16.9906 6.29498C16.9539 6.53276 16.8216 6.74664 16.6227 6.88956L9.05423 12.3235C8.89369 12.4386 8.69941 12.5005 8.49998 12.5001Z" fill="#7AE229"/>
                </svg>
              </div><!--required Problem-->
          </div>
          <div class="transparentDiv">
            <div class="requiredText" id="msgBoxPrioTask"></div>
          </div>
        </div>
        <div class="inputContainer">
          <b class="padd4px">Subtasks</b> 
          <div oninput="proofInput('msgBoxSubtaskTask')" class="inputContainer">
            <input oninput="setNewSubtask()" id="subtask" placeholder="Add new subtask" type="text" maxlength="20">
            <div id="subtaskInputBtnsContainer" class="subtaskInputBtnsContainer d-none">
              <div onclick="closeNewSubtask()" class="closeNewSubtask">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5011 12.5001L17.7441 17.7431M7.25806 17.7431L12.5011 12.5001L7.25806 17.7431ZM17.7441 7.25708L12.5001 12.5001L17.7441 7.25708ZM12.5001 12.5001L7.25806 7.25708L12.5001 12.5001Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div onclick="acceptNewSubtask()" class="acceptNewSubtask">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12.5L10 18.5L20 6.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="transparentDiv">
            <div class="requiredText" id="msgBoxSubtaskTask"></div>
          </div>
          <div class="subtaskCheckboxArea">
            <div id="subtaskCheckboxArea" class="overflow"> </div>
          </div>
        </div>
      </div>
    </div>
      <div class="addTaskBtns">
        <div class="paddLeRe40px" id="close-add-task">
          <div class="whiteBtn" onclick="clearTask()">Clear
            <svg  width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="clearSvg" d="M12.5011 12.5001L17.7441 17.7431M7.25806 17.7431L12.5011 12.5001L7.25806 17.7431ZM17.7441 7.25708L12.5001 12.5001L17.7441 7.25708ZM12.5001 12.5001L7.25806 7.25708L12.5001 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg></div>
        </div>
          <div>
            <button class="blueBtn">Create Task <img src="../assets/img/check.svg"></button>
          </div>
        </div> 
      </div>
    </form>
  </div>
`;
}


function renderNewCategoryHTML() {
  let createCategory = document.getElementById("createCategory").value;
  let color = currentCategoryColor[0];
  categoryColor.push({ color });
  return `
  <div class="selectedCategoryPosi">
    <span>${createCategory}</span>
    <div style="border: 2px solid ${color};cursor:auto" class="colorCategory${color}"></div>
  </div>`;
}


function renderCategorysHTML(c, category, color) {
  return `
  <div class="allCategorysContainer newCategory">
    <div onclick="chooseCategory('${category}','${color}')" id="category${c}" class="newCategory width100">${category}</div> 
    <div class="categoryTextColorPosi">
    <div style="border: 2px solid ${color};cursor:auto" class="colorCategory${color}"></div>
    </div>
    <div onclick="deleteCategory(${c})">X</div>
  </div>`;
}


function chooseCategoryHTML(category, color) {
  return `
  <div class="categoryTextColorPosi">
    <span onclick="openCategory()">${category}</span>
    <div class="categoryTextColorPosi">
      <div style="border: 2px solid ${color};cursor:auto" class="colorCategory${color}"></div>
    </div>
  </div>`;
}


function renderOldCategoryHTML(category, color) {
  return `
  <div class="selectedCategoryPosi">
    <span>${category}</span>
    <div style="border: 2px solid ${color};cursor:auto" class="colorCategory${color}"></div>
  </div>`;
}


function renderNewSubtaskHTML(subtask, i) {
  return `
  <div class="subtaskPosi">
    <input class="checkboxSize" id="subtask${i}" onclick="checkSubtask(event,'${subtask}')" type="checkbox">
    <div class="subtaskTextPosi" onclick="checkSubtastText(${i})">${subtask}</div>
  </div>
  `;
}


function renderSelectContactHTML(color, initialLetters) {
  return `
  <div class="assignBubble">
    <div class="slide-in-bottom" style="background: ${color};">${initialLetters}</div>
  </div>`;
}


function renderOpenAssignedToHTML(assignedData, checked, i, contactInitialsID) {
  let contactName = assignedData.contactName
  let contactColor = assignedData.contactColor
  let contactInitials = assignedData.contactInitials
  return `
  <div id="contact${i}" class="contact">
    <input id="contactCheckbox${i}" onclick="selectContact('${contactName}','${contactColor}','${contactInitials}',${i}, '${contactInitialsID}')" class="checkboxSize" type="checkbox" ${checked ? "checked" : ""}> 
    <div class="assignedContactName"  onclick="selectContactName(${i},'${contactName}')">${contactName}</div>
  </div>
  `;
}


function renderContactsHTML(contact) {
  return ` 
  <div onclick="openContact('contactContainer', ${contact.contactID})" id="contactContainer${contact.contactID}" class="contactContainerCo contactContainerhover">
    <div id="contactBubble${contact.contactID}" class="contactsBubble" style="background:${contact.color}; border: 2px solid ${contact.color}">
      <div style="color: white">${contact.initialLetters}</div>
    </div>
    <div>
     <div class="contactName">${contact.name}</div>
     <a class="lightblueColor">${contact.email}</a>
    </div>
  </div>
    `;
}


function renderContactAddTaskHTML(selectedID) {
  return `
  <div onclick="openEditContact(${selectedID})"class="slideContactInfo">
    <svg class="penSVGMobile" width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="penEditImg" d="M2.87121 22.0156L7.69054 24.9405L20.3337 4.10842C20.6203 3.63628 20.4698 3.02125 19.9977 2.73471L16.8881 0.847482C16.4159 0.56094 15.8009 0.711391 15.5144 1.18353L2.87121 22.0156Z" fill="#2A3647"/>
      <path class="penEditImg" d="M2.28614 22.9794L7.10547 25.9043L2.37685 28.1892L2.28614 22.9794Z" fill="#2A3647"/>
    </svg>
    <p class="testRE">Edit Contact</p>
  </div>
  `
}