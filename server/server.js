const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.status(200).send("Hello")
})

const port = 5000

app.listen(port, () => {
  console.log(`You are listening to the port ${port}`)
})