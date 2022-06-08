const express = require("express")
const colors = require("colors");
const dotenv = require("dotenv").config({ path: "./.env" })
const connectDB = require("./config/db")
const cors = require("cors")
const offerRoutes = require("./routes/offerRoutes")
const userRoutes = require("./routes/userRoutes")
const port = process.env.PORT || 8000
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/offers", offerRoutes)
app.use("/api/users", userRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))


