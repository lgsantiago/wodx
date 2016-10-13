const express = require('express') 
const random = require('./randomNumberGenerator') 
const app = express()  
const port = 3000

app.use((request, response, next) => {  
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {  
  response.rounds = random.getRandomInt(3, 6)
  next()
})

app.get('/api/v1/wodx', (request, response) => {  
  response.json({
  	rounds: response.rounds,
  	movements: {},
    message: "Hello from Wodx!"
  })
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})