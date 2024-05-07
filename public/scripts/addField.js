const addButton = document.querySelector("#add-time")

const removeButton = document.querySelector(".remove-time")

removeButton.onclick = function() {
    removeButton.parentNode.remove()
}

addButton.addEventListener("click", () => {
    const newFieldContainer = document.querySelector("template").content.cloneNode(true)


    const newRemoveButton = newFieldContainer.querySelector(".remove-time")
    newRemoveButton.onclick = function() {
        newRemoveButton.parentNode.remove()
    }


    const fields = newFieldContainer.querySelectorAll("input")
    fields.forEach(field => {
        field.value = ""
    })

    const form = document.querySelector("#schedule-items")
    form.appendChild(newFieldContainer)
})
