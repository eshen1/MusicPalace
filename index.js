$( ".sidenav a +" ).click(function() {
  let person = prompt("Please enter your music palace Name", "Music");
    if (person != null) {
        let node = document.createElement("div");
        let textnode = document.createTextNode(person);
        node.appendChild(textnode);
        document.getElementById("plus").prepend(node);
    }
});
// <script type="text/javascript">
//     function showHomePage(homepage){
//     document.getElementById(homepage).style.display = 'block';
//     }
//   </script>

$("#buttons").click(function() {
  document.getElementById('homepage').style.display = 'block';
  document.getElementById('loginpage').style.display = 'none';
});

// $(document).ready(function(){
//     $("button").click(function(){
//       document.getElementById('homepage').style.display = 'block';
//     	document.getElementById('homepage').style.visibility = 'visible';
//     });
// });

$('#search').click(function() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/2.0/?method=album.getinfo&api_key=947d8c62467598874b98abe12a96a637&artist=Cher&album=Believe");
  xhr.send();
  console.log(xhr.status);
  console.log(xhr.statusText);
});