// Inner Storage
let project_storage = [];
class project {
  constructor(title, place) {
    // setup
    this.title = title;
    this.place = place;
    this.id = this.place.firstElementChild.innerText = this.title;
    this.tasks;
    // add two buttons
    const edit = document.createElement("i");
    edit.classList.add("bx");
    edit.classList.add("bx-edit-alt");
    // move to text
    edit.addEventListener("click", () => {
      this.place.firstElementChild.contentEditable = "true";
      this.place.firstElementChild.focus();
    });
    this.place.firstElementChild.addEventListener("blur", () => {
      this.title = place.innerText;
      this.place.firstElementChild.contentEditable = "false";
      let index = project_storage.findIndex((pr) => pr.place == place);
      Clearhomepage();
      createTaskPage(index);
    });
    const del = document.createElement("i");
    del.classList.add("bx");
    del.classList.add("bx-trash");
    // removeing
    del.addEventListener("click", () => {
      let index = project_storage.findIndex((pr) => pr.place == place);
      project_storage = project_storage.filter((value) => {
        return value !== project_storage[index];
      });
      Clearhomepage();
      if (index !== 0) {
        createTaskPage(index - 1);
      }
      displayProjectsTitle();
    });
    const icon_wrapper = document.createElement("div");
    icon_wrapper.classList.add("project-icon-wrapper");
    icon_wrapper.append(edit, del);
    this.place.append(icon_wrapper);
  }
  CreateTask(title, priority, date, project) {}
}

// Removeing the enterkey from working
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log(project_storage);
    event.preventDefault();
  }
});
function createTaskPage(index) {
  var template = document.getElementById("template").content;
  var template_content = document.importNode(template, true);
  if (typeof index === "number")
    template_content.querySelector(".project-name").innerText =
      project_storage[index].title;
  else {
    template_content.querySelector(".project-name").innerText = index;
  }
  document.querySelector(".home-page").append(template_content);
}

// sidebar li
let li_list = document.querySelector(".sidebar").querySelectorAll("li");
function ClearLiBg(list) {
  list.forEach((li) => {
    li.classList.remove("li-active");
  });
}
function addEventListenerToli() {
  li_list.forEach(function (li) {
    li.removeEventListener("click", handleClick);
  });
  li_list.forEach(function (li) {
    li.addEventListener("click", handleClick);
  });
}

function handleClick(event) {
  var li = event.currentTarget;
  ClearLiBg(li_list);
  if (!event.target.classList.contains("bx")) {
    Clearhomepage();
    let index = project_storage.findIndex((pr) => pr.place == event.target);
    if (index >= 0) createTaskPage(index);
    else createTaskPage(event.target.querySelector("p").innerText);
  }
  if (!li.classList.contains("addproject-btn")) li.classList.add("li-active");
}
addEventListenerToli();
// sidebar project button dropdown
const addproject_button = document.querySelector(".addproject-btn");
const project_button = document.querySelector(".bx-chevron-down");
const project_list = document
  .querySelector(".sidebar-project-container")
  .querySelector("ul");
const sidebar_project_container = document.querySelector(
  ".sidebar-project-container"
);
project_button.addEventListener("click", () => {
  project_button.classList.toggle("project-button-active");
  sidebar_project_container.classList.toggle(
    "sidebar-project-container-active"
  );
  addproject_button.classList.toggle("addproject-btn-active");
  displayProjectsTitle();
});
addproject_button.addEventListener("click", () => {
  addprojectTitle();
  displayProjectsTitle();
  li_list = document.querySelectorAll("li");
  addEventListenerToli();
});
function addprojectTitle() {
  const project_title = document.createElement("li");
  const project_text = document.createElement("p");
  project_title.append(project_text);
  let p = new project(`Project ${project_storage.length + 1}`, project_title);
  project_storage.push(p);
}
function displayProjectsTitle() {
  while (project_list.firstElementChild)
    project_list.firstElementChild.remove();
  project_storage.forEach((pr) => {
    project_list.append(pr.place);
  });
}
// switchd mode
const swtich_mode = document.querySelector(".switch-mode");
swtich_mode.addEventListener("click", () => {
  document.body.classList.toggle("lightmode");
  if (swtich_mode.firstElementChild.classList.contains("bx-sun")) {
    swtich_mode.firstElementChild.classList.remove("bx-sun");
    swtich_mode.firstElementChild.classList.add("bx-moon");
  } else {
    swtich_mode.firstElementChild.classList.remove("bx-moon");
    swtich_mode.firstElementChild.classList.add("bx-sun");
  }
});
// Clear Page
function Clearhomepage() {
  while (document.querySelector(".home-page").firstElementChild)
    document.querySelector(".home-page").firstElementChild.remove();
}
// Genrate Home page
const home_page = document.querySelector(".home-page").innerHTML;
const home_page_button = document.querySelector(".home-page-button");
home_page_button.addEventListener("click", () => {
  Clearhomepage();
  document.querySelector(".home-page").innerHTML = home_page;
});
