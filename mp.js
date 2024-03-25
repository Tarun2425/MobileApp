import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://playground-89b94-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "ShoppingList")

const inputField = document.getElementById("inp-el")
const addButton = document.getElementById("add-button")
const shoppingList = document.getElementById("shop-list")

addButton.addEventListener("click", function(){
    let inputValue =  inputField.value

    push(shoppingListDB, inputValue)

    clearInputField()

})

onValue(shoppingListDB, function(snapshot){
    if(snapshot.exists()){
    let arrayItems = Object.entries(snapshot.val())

    clearShpoingList()

    for(let i=0;i<arrayItems.length;i++){

        let current  = arrayItems[i]
        let id = current[0]
        let value = current[1]

        addItemToList(current)
    }

}else{
    shoppingList.innerHTML = `No items... yet`
}
})

function clearInputField(){
    inputField.value = ""
}

function addItemToList(current){
    let Id = current[0]
    let itemValue  = current[1]
   let newEl = document.createElement("li")
   newEl.textContent = itemValue

   newEl.addEventListener("dblclick", function(){
    let excLocinDB = ref(database, `ShoppingList/${Id}`)
    remove(excLocinDB)
   })
   shoppingList.append(newEl)
}

function clearShpoingList(){
    shoppingList.innerHTML = ""
}