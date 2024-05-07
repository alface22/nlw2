export const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Potuguês",
    "Química",
]

export const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

export function convertHoursToMinutes(time)
{
    const [hour, minutos] = time.split(":")
    return Number((hour * 60)) + Number(minutos)
}

export function getSubject(subjectNumber)
{
    const position = +subjectNumber - 1
    return subjects[position]
}

export function convertMinutesToHours(time) {
    const hours = Math.floor(time / 60)
    const minutes = time % 60;
    let finalTime = hours + 'h'

    if (minutes != 0) {
        finalTime += minutes
    }
    return finalTime
}
