const express = require('express') 
const random = require('./helpers/randomNumberGenerator')
const con = require('./config/database').con
const app = express()  
const port = Number(process.env.PORT || 3000);
const reps = [10,12,15,18,20];

app.get('/', (request, response) => {  
  response.send('Nothing here')
})

app.use((request, response, next) => {  
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {  
  response.rounds = random.getRandomInt(3, 6);
  response.numberOfMovements = random.getRandomInt(3, 5);
  response.movements = [];
  response.reps = [];
  next()
})

app.get('/api/v1/wod', (request, response) => {  
  con.query('SELECT movement FROM wodx.movement ORDER BY RAND() LIMIT '+response.numberOfMovements,
    function(err,rows){
    if(err) throw err;

    for (var i = 0; i < rows.length; i++) {
      response.movements[i] = rows[i].movement;
      response.reps[i] = reps[random.getRandomInt(0, 5)];
    };

    response.json({
      rounds: response.rounds,
      movements: response.movements,
      reps: response.reps
    })

  });
})

app.use((request, response, next) => {  
  response.videos = [];
  next()
})

app.get('/api/v1/videos', (request, response) => {  

  if(request.query.qty == null){
    limit = 42;
  }
  else{
    limit = request.query.qty;
  }

  con.query('SELECT video FROM wodx.video ORDER BY RAND() LIMIT '+ limit,
    function(err,rows){
    if(err) throw err;

    for (var i = 0; i < rows.length; i++) {
      response.videos[i] = rows[i].video;
    };

    response.jsonp({
      videos: response.videos,
      message: "Video links"
    })

  });
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})