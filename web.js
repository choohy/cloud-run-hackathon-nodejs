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

  playerLocations.forEach((opponent) => {
    switch(direction) {
      case "N": {
        if (playerLocation[y] == opponent[y]) {
          if(playerLocation[x] > opponent[x]){
            action = toss;
            return;
          }
          else {
            action = right;
            return;
          }
        }
      }
      case "E": {
        if (playerLocation[x] == opponent[x]) {
          if (playerLocation[y] < opponent[y]) {
            action = toss;
            return;
          } else {
            action = right;
            return;
          }
        }
      }
      case "S": {
        if (playerLocation[y] == opponent[y]) {
          if (playerLocation[x] < opponent[x]) {
            action = toss;
            return;
          } else {
            action = right;
            return;
          }
        }
      }
      case "W": {
        if (playerLocation[x] == opponent[x]) {
          if (playerLocation[y] > opponent[y]) {
            action = toss;
            return;
          } else {
            action = right;
            return;
          }
        }
      }
      default: {
        if (playerLocation[x] == 10 || playerLocation[x] == 0) {
          action = right;
          return;
        } else if (playerLocation[y] == 10 || playerLocation[y] == 0) {
          action = right;
          return;
        } 
        action = forward;
      }
    }
  });

  // switch(direction) {
  //   case "N":
  //     if (y < 10)
  //       action = 0;
  //     else {
  //       if (x < 1)
  //         action = 3;
  //       else  
  //         action = 2;
  //     }
  //   case "S":
  //     if (y > 0)
  //       action = 0;
  //     else
  //       action = 2;
  //   case "W":
  //     if (x > 0)
  //       action = 0;
  //     else
  //       action = 2;
  //   case "E":
  //     if (x < 10)
  //       action = 3;
  //     else
  //       action = 2;
  // }
  // TODO add your implementation here to replace the random response
  res.send[moves[action]];
  // res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
