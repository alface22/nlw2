const numeroDias = 5

const dias = document.querySelectorAll(".available-days div")

for (const dia of dias) {
    const horario = dia.querySelector(".available-time")
    if (horario.innerHTML.length == 1) {
        dia.setAttribute("class", "unavailable-day")
    }
}
