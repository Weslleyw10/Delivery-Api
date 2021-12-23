import express from 'express'
import { routes } from './routes/index.routes'

const app = express()

app.use(express.json())
app.use(routes)

app.get("/", (request, response) => {
    response.json("Server is running.")
})

app.listen(8000, () => console.log("Server is running"))