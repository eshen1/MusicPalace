$( ".sidenav a +" ).click(function() {
  var person = prompt("Please enter your music palace Name", "Music");
    if (person != null) {
        let node = document.createElement("div");
        let textnode = document.createTextNode(person);
        node.appendChild(textnode);
        document.getElementById("plus").prepend(node);
    }
});
