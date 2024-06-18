require("express-async-errors")

const AppError = require("./utils/AppError")
const express = require("express")

const routes = require("./routes") // by default routes will load index.js
const app = express()

app.use(express.json())
app.use(routes)
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({ status: "error", message: "Internal server error" })
})

const port = 3333


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const connection = require("./database/mysql");

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});