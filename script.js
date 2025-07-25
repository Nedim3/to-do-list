const inputField = document.querySelector(".input-field textarea"),
 todoList = document.querySelector(".todoList"), 
 pendingNumber = document.querySelector(".pending-number"),
 clearButton = document.querySelector(".clear-button");


inputField.addEventListener("keyup",  (e)=> {
    let inputVal = inputField.value.trim();


    if(e.key == "Enter" && inputVal.length > 0){
        let liTag = `<li class="list" onclick = "handleStatuse()">
                <input type="checkbox">
                <span class="task"> ${inputVal}</span>
                <i class="uil uil-trash-alt trash-icon"></i>
            </li>`
        todoList.insertAdjacentHTML("beforeend",liTag);
        inputField.value ="";
    }
});
