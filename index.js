import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import mongoose from "mongoose"
import { userCreateRouter } from "./routes/user.js"

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// set up basic express app with necessary middlewares
const app = express()
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
});

app.get('/check-db', (_, res) => {
  res.json({
    greeting: mongoose.connection.readyState
  })
})

app.use(userCreateRouter)


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})