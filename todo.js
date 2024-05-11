// Get the input field, button, and lists container
var inputField = document.querySelector('.listadd');
var addButton = document.querySelector('.add');
var listsContainer = document.querySelector('.lists');

// Function to add a new item
function add() {
    var text = inputField.value.trim();
    
        createListItem(text);
        saveToLocalStorage(text);
        inputField.value = '';
    
}

// Function to create a new list item
function createListItem(text) {
    var listItem = document.createElement('div');
    listItem.classList.add('list-item');
    listItem.innerText = text;
    
    listsContainer.appendChild(listItem);

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-sharp fa-solid fa-xmark" style="color: #000000;"></i>';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        deleteListItem(listItem);
        removeFromLocalStorage(text);
    });
    listItem.appendChild(deleteButton);
}

// Function to delete a list item
function deleteListItem(item) {
    listsContainer.removeChild(item);
}

// Function to clear all items from the lists container and local storage
function clearAll() {
    listsContainer.innerHTML = '';
    localStorage.removeItem('todoItems');
}

// Function to save text to local storage
function saveToLocalStorage(text) {
    var items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items.push(text);
    localStorage.setItem('todoItems', JSON.stringify(items));
}

// Function to retrieve items from local storage and display them
function displayStoredItems() {
    var storedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    storedItems.forEach(function(item) {
        createListItem(item);
    });
}

function removeFromLocalStorage(text) {
    var items = JSON.parse(localStorage.getItem('todoItems')) || [];
    var index = items.indexOf(text);
    if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem('todoItems', JSON.stringify(items));
    }
}

window.addEventListener('load', displayStoredItems);
