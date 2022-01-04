document.addEventListener("DOMContentLoaded", () => {
renderBooks()
});

function removeAllChildNodes(parent){
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

function renderBooks(){
    fetch("http://localhost:3000/books")
        .then(response => response.json())
        .then(data => data.forEach(element => {
            listBooks(element)
            }
        ))
}


function listBooks(element){
    const list = document.getElementById("list")
    const li = document.createElement("li")
    li.id = `${element.id}`
    li.innerText = element.title
    list.append(li)
    li.addEventListener("click", () => panelBook(element))
}

function panelBook(elementList){
    const showPanel = document.getElementById("show-panel")
    removeAllChildNodes(showPanel)
    const imgLi = document.createElement("img")
        imgLi.id = `Panel Img ${elementList.id}`
        imgLi.src = elementList.img_url
        showPanel.append(imgLi)
    const panelName = document.createElement("h2")
        panelName.id = `Panel Name ${elementList.id}`
        panelName.innerText = elementList.title
        showPanel.append(panelName)
    const panelSub = document.createElement("h3")
        panelSub.id = `Panel Subtitle ${elementList.id}`
        panelSub.innerText = elementList.subtitle
        showPanel.append(panelSub)
    const panelAuthor = document.createElement('h3')
        panelAuthor.id = `Panel Author ${elementList.id}`
        panelAuthor.innerText = elementList.author
        showPanel.append(panelAuthor)
    const panelDescription = document.createElement("p")
        panelDescription.id = `Panel Description ${elementList.id}`
        panelDescription.innerText = elementList.description
        showPanel.append(panelDescription)
    elementList.users.forEach(x => {
        const panelUsers = document.createElement("li")
        panelUsers.id = `User Like ${x.id}`
        panelUsers.innerText = x.username
        showPanel.append(panelUsers)
    })
    createButton(showPanel, elementList)
}

function createButton(parent, element){
    const button = document.createElement("button")
    button.innerText = "Like"
    parent.append(button)
    button.addEventListener("click", buttonFetch(element))
}

function buttonFetch(e){
    fetch(`http://localhost:3000/books/${e.id}`, {
            method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
