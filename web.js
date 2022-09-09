const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

const gameURL = "https://cloud-run-hackathon-nodejs-w3hsbubvpa-uc.a.run.app/"
app.post('/', function (req, res) {
  console.log(req.body);
  const moves = ['F', 'T', 'L', 'R'];
  const action = 1;
  const arena = req.body["arena"];
  const myLocation = arena["state"][gameURL]
  const direction = myLocation["direction"];
  const x = myLocation["x"];
  const y = myLocation["y"];
  const opponents = arena["state"]



  switch(direction) {
    case "N":
      if (y < 10)
        action = 0;
      else {
        if (x < 1)
          action = 3;
        else  
          action = 2;
      }
    case "S":
      if (y > 0)
        action = 0;
      else
        action = 2;
    case "W":
      if (x > 0)
        action = 0;
      else
        action = 2;
    case "E":
      if (x < 10)
        action = 0;
      else
        action = 2;
  }  
  action = 3;
  // TODO add your implementation here to replace the random response
  res.send[moves[action]];
  // res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
