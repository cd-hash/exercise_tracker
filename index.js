// import "cors"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.static("public"))
app.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})