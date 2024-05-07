import express from "express"
const server = express()

import { pageLanding, pageStudy, pageGiveClasses, saveClasses, transitionPage, listPage } from "./pages.js"

import nunjucks from "nunjucks"
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server
    .use(express.urlencoded({ extended: true }))
    .use(express.static("public"))
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .get("/transition-page", transitionPage)
    .post("/save-classes", saveClasses)
    .post("/list", listPage)
    .listen(5000)
