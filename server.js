let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let neo4j = require('neo4j-driver').v1;
let driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12qwer"));
let session = driver.session();

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   session
        .run( 'MERGE (names:Person {names : {nameParam} }) RETURN names.name AS name', {nameParam: 'names'})
        .subscribe({
          onNext: function (record) {
            console.log(record.get('name'));
          },
          onCompleted: function () {
            session.close();
          },
          onError: function (error) {
            console.log(error);
          }
        });

   console.log(response);
   res.end(JSON.stringify(response));
})

// app.post('/process_post', urlencodedParser, function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.body.first_name,
//       last_name:req.body.last_name
//    };
//    console.log(response);
//   //  session
//   //    .run(   'MERGE (name:Person {name : {nameParam} }) RETURN name.name AS name', {nameParam: 'name'})
//   //    .subscribe({
//   //      onNext: function (record) {
//   //        console.log(record.get('name'));
//   //      },
//   //      onCompleted: function () {
//   //        session.close();
//   //      },
//   //      onError: function (error) {
//   //        console.log(error);
//   //      }
//   //    });
//    res.end(JSON.stringify(response));
// })

let server = app.listen(3000)
