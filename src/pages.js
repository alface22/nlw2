import { db } from "./database/db.js"

import { subjects, weekdays, getSubject, convertHoursToMinutes,  convertMinutesToHours } from "./utils/format.js"

import { createProffy } from "./database/createProffy.js"

export function pageLanding(req, res)
{
    return res.render("index.html")
}

export async function pageStudy(req, res)
{
    const filters = req.query

    const Db = await db
    const numberOfProffys = await Db.all(`SELECT COUNT(*) as total FROM proffys`)


    if(!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays, numberOfProffys })
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    const diasDisponiveis = `
        SELECT class_schedule.*, proffys.name
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        JOIN class_schedule ON (class_schedule.class_id = classes.id)
        WHERE classes.subject = '${filters.subject}'
    `

    try {
        const proffys = await Db.all(query)
        proffys.map(proffy => {
            proffy.subject = getSubject(proffy.subject)
        })

        const days = await Db.all(diasDisponiveis)
        days.map(day => {
            day.weekday = weekdays[day.weekday]
            day.time_to = convertMinutesToHours(day.time_to)
            day.time_from = convertMinutesToHours(day.time_from)

        })

        return res.render("study.html", { proffys, filters, subjects, weekdays, days, numberOfProffys })
    } catch(error) {
        console.log(error)
    }
}

export function pageGiveClasses(req, res)
{
    return res.render("give-classes.html", { subjects, weekdays })
}

export function saveClasses(req, res)
{
    try {
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday
        queryString += "&time=" + req.body.time

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
}

export function transitionPage(req, res)
{
    const informacoes = [
        req.query.subject,
        req.query.weekday,
        req.query.time
    ]

    return res.render("transition-page.html", { informacoes: informacoes })
}

export async function listPage(req, res)
{
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const Db = await db
        await createProffy(Db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/transition-page" + queryString)
    } catch (error) {
        console.log(error)
    }
}
