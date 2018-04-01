let neo4j = require('neo4j-driver').v1;
let driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12qwer"));
let session = driver.session();

session
  .run('CREATE (database:User {email: {emailParam}, password: {passwordParam}) RETURN database', {email: "test@gmail.com", password: "password"})
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
