const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 4000
const dbName = 'deckard-cain-quotes'
var db, collection

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

dotenv.config({ path: './config/config.env' })

MongoClient.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.error(err)
    } else {
      db = client.db(dbName)
      console.log(`Connected to DB ${dbName}...`)
    }
  }
)

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

app.post('/quotes', (req, res) => {
  db.collection('quotes')
    .insertOne(req.body)
    .then((result) => {
      // if (err) {
      //   return console.log(err)
      // } else {
      console.log('saved')
      res.redirect('/')
      // }
    })

    .catch((error) => console.error(error))
})

app.get('/', (req, res) => {
  db.collection('quotes')
    .find()
    .toArray()
    .then((result) => {
      res.render('index.ejs', { quotes: result })
    })

    .catch((error) => console.error(error))
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
    .findOneAndUpdate(
      { name: 'Deckard' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      {
        upsert: true,
      }
    )
    .then((result) => {
      res.json('success')
    })
    .catch((error) => console.error(error))
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes')
    .deleteOne({
      name: req.body.name,
    })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json('Deleted quote')
    })
    .catch((error) => console.error(error))
})

app.listen(process.env.PORT || PORT, (req, res) => {
  console.log(`Stay awhile and listen to the  server ${PORT}! ...`)
})
