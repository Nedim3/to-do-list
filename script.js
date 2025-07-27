const inputField = document.querySelector(".input-field textarea"),
 todoList = document.querySelector(".todoList"), 
 pendingNumber = document.querySelector(".pending-number"),
 clearButton = document.querySelector(".clear-button");

//we will call this function while adding, deleting and checking-unchecking the task
function allTasks(){
    let tasks=document.querySelectorAll(".pending");

    //if tasks length i 0 then pending num text content will be nom if not then pending num value will be task's lenght
    pendingNumber.textContent = tasks.length === 0 ? "no" : tasks.length;    

    let allList = document.querySelectorAll(".list");
    if(allList.length > 0){
        todoList.style.marginTop = "20px";
        return
    }
    clearButton.style.pointerEvents = "auto";
    todoList.style.marginTop = "0px";

}


inputField.addEventListener("keyup",  (e)=> {
    let inputVal = inputField.value.trim();


    if(e.key == "Enter" && inputVal.length > 0){
        let liTag = `<li class="list pending" onclick = "handleStatus(this)">
                <input type="checkbox"/>
                <span class="task"> ${inputVal}</span>
                <i class="uil uil-trash-alt trash-icon" onclick="deleteTask(this)"></i>
            </li>`
        todoList.insertAdjacentHTML("beforeend",liTag);
        inputField.value ="";
        allTasks();
    }
});

//checking and unchecking the checkbox while we click on the task

function handleStatus(e){
    const checkbox = e.querySelector("input"); // getting checkbox
    checkbox.checked = checkbox.checked ? false : true;
    e.classList.toggle("pending");
    allTasks();
}
// deleting all the tasks while we click on the icon
function deleteTask(e){
    e.parentElement.remove();
    allTasks();
}
// deleting all the tasks while we click on the clear button

clearButton.addEventListener("click", () => {
    todoList.innerHTML = "";
    allTasks();
})