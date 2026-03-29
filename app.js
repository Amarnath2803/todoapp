// selecting the dom elemenet

const input = document.getElementById('todo-input');
const addbtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

//trying the load the todos if they are stored in todos array 
const saved = localStorage.getItem('todos'); // this is will get the todo
const todos = saved? JSON.parse(saved) : [];

function saveTodos(){
    //save the todas of array to the local storage 
    localStorage.setItem('todos',JSON.stringify(todos)); //this will set the element
}

//create a dom node for the todo object and append it to the list
function createTodonode(todo , index){
    const li = document.createElement('li');

    //checkbox to toggle completion 
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed; // this  will convert either true or the flase 
    checkbox.addEventListener("change", ()=>{
        todo.completed = checkbox.checked;

        //visual feedback 
        textSpan.style.textDecoration =todo.completed? 'line-through' : "";
        saveTodos(); // we changed the todos so we have to save it 
    })

    //text of the todo 
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }
        //if any one double type the todo 
        textSpan.addEventListener("dblclick" , ()=> {
            const newText = prompt("edit todo" , todo.text);
            if(newText !== null){
                todo.text = newText.trim(); // it will remove the extra space and the duplicate stuff
                textSpan.textContent = todo.text;
                saveTodos(); //cause we want to save the todos into the local storage
            }
        })

        //delete todo 
        const delbtn = document.createElement('button');
        delbtn.textContent = "delete";
        delbtn.addEventListener('click' , () => {
            todos.splice (index,1); //it will remove the index - 1 
            render();
            saveTodos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delbtn);
        return li;
    }

//render the whole todo list from the array 
//this function will display the todo details after adding or the deleteing the todo
function render () {
    list.innerHTML = '';

    //recreate the each item 
    todos.forEach((todo,index) => {
        const node = createTodonode(todo, index);
        list.appendChild(node)
    });
}

function addtodo (){
    const text = input.value.trim();
    if(!text){
        return;
    }
    //push the new todo object 

    todos.push({text, completed:false});
    input.value = "";
    render();
    saveTodos();
}

addbtn.addEventListener("click", addtodo);

input.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        addtodo();
    }
})
render();