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

let checkEmail = (text) => {
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(text) === false) {
    return false;
  }
  return true;
}

let checkPass = (text) => {
    if (text.length <= 5) {
      return false;
    }
    return true;
}

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
  if (checkEmail(response.email)) {
    if (checkPass(response.password)) {
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

        const filePath = path.join(__dirname, '/public/login.html');
        res.sendFile(filePath);
      }
    }
  }

  let responses = {
    email: req.body.email,
    playlistParam: req.body.playlistParam
  };

  const filePath = path.join(__dirname, '/public/index.html');
  res.redirect('back');
});

app.put('/login.html', urlencodedParser, (req, res) => {
  // Prepare output in JSON format

  console.log(response);
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log('Listening on', 3000);
});
