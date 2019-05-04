const express = require('express')
const app = express()

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port)
console.log('Listening on port ' + port)
