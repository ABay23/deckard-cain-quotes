const express = require('express')
const app = express()
const PORT = 4000

app.listen(PORT, (req, res) => {
  console.log(`Stay awhile and listen to the  server ${PORT}! ...`)
  console.log('Stay awhile and listen... Server is running as intended...')
})
