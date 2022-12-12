import express from "express"
import cors from "cors"
import mongoose from "mongoose"

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true,
                                      useUnifiedTopology: true });

const app = express()
app.use(cors())
app.use(express.static("public"))
app.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
});

app.get('/check-db', (_, res) => {
  res.json({ greeting: mongoose.connection.readyState })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})