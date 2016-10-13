const express = require('express') 
const random = require('./helpers/randomNumberGenerator')
const con = require('./config/database').con
const app = express()  
const port = Number(process.env.PORT || 3000);

app.use((request, response, next) => {  
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {  
  response.rounds = random.getRandomInt(3, 6)
  response.movements = random.getRandomInt(3, 6)
  next()
})

app.get('/api/v1/wod', (request, response) => {  
  con.query('SELECT movement FROM wodx.movement AS r1 JOIN (SELECT CEIL(RAND() * (SELECT MAX(id) FROM wodx.movement)) AS id) AS r2 WHERE r1.id >= r2.id ORDER BY r1.id ASC LIMIT '+response.movements,function(err,rows){
    if(err) throw err;

    console.log('Data received from db:\n');
    console.log(rows);
  });

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