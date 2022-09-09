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
  const myX = myLocation["x"];
  const myY = myLocation["y"];
  const x = 0;
  const y = 1;
  const forward = 0;
  const toss = 1;
  const left = 2;
  const right = 3;
  const players = arena["state"];
  const playerLocations = [];
  const playerLocation = [myX, myY];
  players.forEach(element => {
    if (element[x]!=playerLocation[0] && element[y]!=playerLocation[1])
      playerLocations.push([element[x], element[y]]);
  });
try{
  playerLocations.forEach((opponent) => {
    if (playerLocation[x] == opponent[x]){
      if (playerLocation[y] - opponent[y] > 3) {
        switch(direction) {
          case "N": {
            if (playerLocation[y] - opponent[y] < 4) {
              action = toss;
            }
            else {
              action = forward;
            }
          }
          case "W":
            action = right;
          case "E":
            action = left;
          case "S":
            action = right;
        }
      } else if (opponent[y] - playerLocation[y] > 3) {
        switch(direction) {
          case "N":
            action = right;
          case "W":
            action = left;
          case "E":
            action = right;
          case "S": {
            if (opponent[y] - playerLocation[y] < 4) {
              action = toss;
            }
            else {
              action = forward;
            }
          }
        }
      }
      throw 'Break';
    }
    if (playerLocation[y] == opponent[y]){
      if (playerLocation[x] - opponent[x] > 3) {
        switch(direction) {
          case "N": 
            action = left
          case "W":{
            if (playerLocation[x] - opponent[x] < 4) {
              action = toss;
            }
            else {
              action = forward;
            }
          }
          case "E":
            action = right;
          case "S":
            action = right;
        }
        break;
      } else if (opponent[x] - playerLocation[x] > 3) {
        switch(direction) {
          case "N":
            action = right;
          case "W":
            action = left;
          case "E": {
            if (opponent[x] - playerLocation[x] < 4) {
              action = toss;
            }
            else {
              action = forward;
            }
          }
          case "S": {
            action = left;
          }
        }
      }
      throw 'Break';
    }
  });
} catch (e) {
  if (e !== 'Break') throw e
}

  if (playerLocation[x] == 10 || playerLocation[x] == 0) {
    action = right;
  } else if (playerLocation[y] == 10 || playerLocation[y] == 0) {
    action = right;
  } else
    action = forward;
  
  // TODO add your implementation here to replace the random response
  res.send[moves[action]];
  // res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
