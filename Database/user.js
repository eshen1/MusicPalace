let insertUser = function(querys) {
  let neo4j = require('neo4j-driver').v1;
  let driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12qwer"));
  let session = driver.session();
  const query = querys;

  session
    .run(query, {nameParam: 'name'})
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
};

$("#button2").click(function() {
  let item = document.getElementById('userInfo').value;
  let query = 'MERGE (name:Person {name : {nameParam} }) RETURN name.name AS name';
  insertUser(query);
  console.log("Here");
});
