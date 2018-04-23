const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver').v1;

const app = express();


const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12qwer'));
const session = driver.session();

const query = 'MERGE (user:User { email:{emailParam} , password: {passwordParam} } )';
const query2 = 'MATCH (n:User) WHERE n.email = "hello" SET n.playlist = {playlistParam}';
let response = {};

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/index.html', (req, res) => {
  const fullPath = path.join(__dirname, '/index.html');

  res.sendFile(fullPath);
});

app.post('/login.html', urlencodedParser, (req, res) => {
  // Prepare output in JSON format
  response = {
    email: req.body.email,
    password: req.body.password,
  };
  if (response.email != undefined && response.password != undefined) {
    session
      .run(query, { emailParam: response.email, passwordParam: response.password })
      .subscribe({
        onNext: (record) => {
          console.log(record.get('name'));
        },
        onCompleted: () => {
          session.close();
        },
        onError: (error) => {
          console.log(error);
        },
      });

    console.log(response);
  }

  let responses = {
    email: req.body.email,
    playlistParam: req.body.playlistParam
  };

  if (responses.playlistParam != undefined) {
    console.log("Do I get called?");
    console.log(response);
    console.log(responses.email + " response.email");
    console.log(responses.playlistParam + " playlist");

    session
      .run(query2, { playlistParam: responses.playlistParam })
      .subscribe({
        onNext: (record) => {
          console.log(record.get('name'));
        },
        onCompleted: () => {
          session.close();
        },
        onError: (error) => {
          console.log(error);
        },
      });
  }

  const filePath = path.join(__dirname, '/public/login.html');
  res.sendFile(filePath);
});

app.put('/login.html', urlencodedParser, (req, res) => {
  // Prepare output in JSON format

  console.log(response);
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log('Listening on', 3000);
});
