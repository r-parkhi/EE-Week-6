document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const list = document.getElementById("todoList");

  loadList();

  // Add task with enter key
  input.addEventListener("keydown", (e) => {
    if(e.key == "Enter" && input.value.trim() !== "") {
      addTask(input.value.trim())
      input.value = "";
      saveList();
    }
  })

  // Add task function with delete button
  //This function will make more sense when you add the other code
  function addTask(taskText) {
    const li = document.createElement("li"); //creates a new element that will hold the task text

    // Task content
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span); //adds the span with the task text inside the li so that li now contains that info

    // Delete button
    const btn = document.createElement("button"); //creates a button element
    btn.textContent = "❌";
    btn.style.float = "right";
    btn.style.border = "none";
    btn.addEventListener("click", () => { //adds a click event listener
      //removes the whole li
      li.remove()
      //AFTER YOU HAVE ADDED CODE BELOW to update and save the current state of the list 
      saveList();
    });
    li.appendChild(btn); //adds the delete button to li
    list.appendChild(li); //adds the contructed li to the list 
  }


  // localStorage inplementation
  // Save list
  function saveList() {
    const items = Array.from(list.children).map(li => li.querySelector("span").textContent);
    localStorage.setItem("todos", JSON.stringify(items));
  }

  // Load list
  function loadList() {
    const items = JSON.parse(localStorage.getItem("todos") || "[]");
    items.forEach(task => addTask(task));
  }


  // Enable drag-and-drop sorting
  new Sortable(list, {
    animation: 150,
    ghostClass: 'ghost'
  });
});


// clock
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let amPm = "am";
  m = checkTime(m);

  // 12-hour
  if(h > 12) {
    h -= 12;
    amPm = "pm";
  }

  document.getElementById("clock").innerHTML =  h + ":" + m + amPm;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}