let message = document.querySelector('.message')
let button = document.querySelector('.btn')
let todo = document.querySelector('.todo')


let todoList = [];

if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    displyMessages()
}

button.addEventListener('click', function() {
    if(!message.value) return
    let newTodo = {
        todo: message.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo)
    displyMessages()
    localStorage.setItem('todo', JSON.stringify(todoList))
    message.value = ''
});


function displyMessages() {
    let displyMessages = ''
    if(todoList.length === 0) todo.innerHTML = ''
    todoList.forEach(function(item, i) {
        displyMessages += `
        <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `
        todo.innerHTML = displyMessages
    })
}

todo.addEventListener('change', function(event) {
    let idInput = event.target.getAttribute('id')
    let forLabel = todo.querySelector('[for='+ idInput +']')
    let valueLabe = forLabel.innerHTML

    todoList.forEach(function(item) {
        if(item.todo === valueLabe) {
            item.checked = !item.checked
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault()
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML) {
            if(event.ctrlKey || event.metaKey) {
                todoList.splice(i,1)
            }else {
                item.important = !item.important
            }
            displyMessages()
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})