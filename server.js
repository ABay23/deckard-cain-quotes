const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 4000

app.set('view engine', 'ejs')

dotenv.config({ path: './config/config.env' })

const connectDB = async () => {
  const conn = await MongoClient.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true },
    (err, client) => {
      if (err) return console.error(err)
      console.log('Connected to DB...')
      const db = client.db('deckard-cain-quotes')
      const quotesCollection = db.collection('quotes')
      app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
      })

      app.post('/quotes', (req, res) => {
        quotesCollection
          .insertOne(req.body)
          .then((result) => {
            res.redirect(307, '/')
          })
          .catch((error) => console.error(error))
      })
    }
  )
}
connectDB()

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, (req, res) => {
  console.log(`Stay awhile and listen to the  server ${PORT}! ...`)
  console.log('Stay awhile and listen... Server is running as intended...')
})
