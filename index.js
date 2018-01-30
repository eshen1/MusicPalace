$( ".sidenav a +" ).click(function() {
  var person = prompt("Please enter your music palace Name", "Music");
    if (person != null) {
        let node = document.createElement("div");
        let textnode = document.createTextNode(person);
        node.appendChild(textnode);
        document.getElementById("plus").prepend(node);
    }
});

$('#search').click(function() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/2.0/?method=album.getinfo&api_key=YOUR_API_KEY&artist=Cher&album=Believe");
  xhr.send();
  console.log(xhr.status);
  console.log(xhr.statusText);
});
