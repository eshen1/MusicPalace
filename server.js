const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver').v1;

const app = express();


const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12qwer'));
const session = driver.session();

const query = 'MERGE (user:User { email:{emailParam} , password: {passwordParam} } )';

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/index.html', (req, res) => {
  const fullPath = path.join(__dirname, '/index.html');

  res.sendFile(fullPath);
});

app.post('/login.html', urlencodedParser, (req, res) => {
  // Prepare output in JSON format
  const response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  session
    .run(query, { emailParam: response.first_name, passwordParam: response.last_name })
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
});

app.listen(3000, function() {
  console.log('Listening on port ', 3000);
});
