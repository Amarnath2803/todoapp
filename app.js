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
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = todo.text;
            
            // replace span with input 
            li.replaceChild(editInput,textSpan);
            editInput.focus();

            function saveedit() {
                const newtext = editInput.value.trim();
                if(newtext){
                    todo.text = newtext;
                }

                //restoring span
                textSpan.textContent = todo.text;
                li.replaceChild(textSpan, editInput);
                li.replaceChild(textSpan,editInput);
                saveTodos();
            }
            editInput.addEventListener("keydown" , (e) => {
                if(e.key === "Enter"){
                    saveedit();
                }
            });
            //save when clicked outside
            editInput.addEventListener("blur", saveedit)
        });
        // it will complete the todo task if they click on the task
        textSpan.addEventListener("click",() => {
            todo.completed = !todo.completed;
            checkbox.checked = todo.completed;

            if(todo.completed){
                textSpan.style.textDecoration = "line-through";
            }else{
                textSpan.style.textDecoration = "none"
            }
            saveTodos();
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