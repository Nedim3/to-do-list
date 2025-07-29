const inputField = document.querySelector(".input-field textarea"),
 todoList = document.querySelector(".todoList"), 
 pendingNumber = document.querySelector(".pending-number"),
 clearButton = document.querySelector(".clear-button");

 //check localStorage

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    todoList.innerHTML = "";
    tasksArray.forEach((task, index) => {
        let liTag = `<li class="list ${task.status}" onclick = "handleStatus(this, ${index})">
                <input type="checkbox" ${task.status === "checked" ? "checked" : ""}/>
                <span class="task">${task.name}</span>
                <i class="uil uil-trash-alt trash-icon" onclick="deleteTask(this, ${index})"></i>
            </li>`;
        todoList.insertAdjacentHTML("beforeend", liTag);
    });
    allTasks();
}

function displayDate(){
    const date = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    document.querySelector("#date").innerHTML = date.toLocaleDateString("en-US", options);
}

//we will call this function while adding, deleting and checking-unchecking the task
function allTasks(){
    let tasks=document.querySelectorAll(".pending");

    //if tasks length i 0 then pending num text content will be nom if not then pending num value will be task's lenght
    pendingNumber.textContent = tasks.length === 0 ? "no" : tasks.length;    

    let allList = document.querySelectorAll(".list");
    if(allList.length > 0){
        clearButton.style.pointerEvents = "auto";
        todoList.style.marginTop = "20px";
        return;
    }
    clearButton.style.pointerEvents = "none";
    todoList.style.marginTop = "0px";

}


inputField.addEventListener("keyup", (e) => {
    let inputVal = inputField.value.trim();

    if (e.key == "Enter" && inputVal.length > 0) {
        tasksArray.push({ name: inputVal, status: "pending" });
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
        inputField.value = "";
        renderTasks();
    }
});


//checking and unchecking the checkbox while we click on the task

function handleStatus(e, index){
    const checkbox = e.querySelector("input");
    checkbox.checked = !checkbox.checked;
    e.classList.toggle("pending");

    // Update status in array
    tasksArray[index].status = checkbox.checked ? "checked" : "pending";

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    allTasks();
}
// deleting all the tasks while we click on the icon
function deleteTask(e, index){
    e.parentElement.remove();
    tasksArray.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    allTasks();
}
// deleting all the tasks while we click on the clear button

clearButton.addEventListener("click", () => {
    tasksArray = [];
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    renderTasks();
});
displayDate();
renderTasks();