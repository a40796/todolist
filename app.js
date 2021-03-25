let add = document.querySelector("form button");
let section = document.querySelector("section")
add.addEventListener("click", e => {
    // console.log(e);

    // == prevent form form being submitted ==
    e.preventDefault();

    // == get the input values == 
    // console.log(e.target.parentElement);
    let form = e.target.parentElement;
    // console.log(form.children);
    let todoText = form.children[0].value;
    // console.log(todoText);
    let todoMonth = form.children[1].value;
    let todoDay = form.children[2].value;
    // console.log(todoText,todoMonth,todoDay)

    if (todoText === "") {
        alert("please enter some text");
        return;
    }

    // == create and todoitem == 
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text")
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + "/" + todoDay;
    todo.appendChild(text);
    todo.appendChild(time);

    //create green check and red trash can
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");

    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    trashButton.addEventListener("click", e => {
        // console.log(e.target);
        let todoItem = e.target.parentElement;
        // console.log(todoItem);
        // todoItem.remove();
        todoItem.addEventListener("animationend", () => {
            let txt = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if (item.todoText == txt) {
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })

            todoItem.remove();
            //remove from localstorage
        })
        todoItem.style.animation = "scaleDown 0.3s forwards"

    })

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards"

    //create an object
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDay: todoDay
    }

    //store data into an array of object
    let myList = localStorage.getItem("list");
    // console.log(myList)
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]))
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }

    console.log(JSON.parse(localStorage.getItem("list")));
    //clear the text input
    form.children[0].value = "";
    section.appendChild(todo);


})

let myList = localStorage.getItem("list");
if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {
        //create a todo
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoMonth + "/" + item.todoDay;
        todo.appendChild(text);
        todo.appendChild(time);

        //create green check and red trash can
        let completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        completeButton.addEventListener("click", e => {
            let todoItem = e.target.parentElement;
            todoItem.classList.toggle("done");

        })

        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

        trashButton.addEventListener("click", e => {
            // console.log(e.target);
            let todoItem = e.target.parentElement;
            // console.log(todoItem);
            // todoItem.remove();
            todoItem.addEventListener("animationend", () => {
                //remove from localstorage
                let txt = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    if (item.todoText == txt) {
                        myListArray.splice(index, 1);
                        localStorage.setItem("list", JSON.stringify(myListArray));
                    }
                })
                todoItem.remove();
            })
            todoItem.style.animation = "scaleDown 0.3s forwards"

        })
        todo.appendChild(completeButton);
        todo.appendChild(trashButton);
        section.appendChild(todo);
    })
}