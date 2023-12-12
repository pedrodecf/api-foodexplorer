require("express-async-errors")
require("dotenv/config")

const AppError = require("./utils/AppError")

const cors = require("cors")

const express = require("express")
const routes = require("./routes")

const uploadConfig = require("./config/upload")

const cookieParser = require("cookie-parser")

const migrationsRun = require("./database/sqlite/migrations")
migrationsRun()

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173/"],
    credentials: true,
  })
)
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))
app.use(routes)
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }
  console.log(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

app.listen(PORT, () => {
  console.log(`Iniciando API na porta ${PORT}`)
})
