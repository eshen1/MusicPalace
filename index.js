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

// $('#search').click(function () {
//     $.ajax({
//         type: "GET",
//         url: "https://api.spotify.com/v1/search?q=Muse%20blackout&type=track%2Cartist",
//         dataType: "xml",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('Authorization', 'Bearer' + 'BQAs1GwetZFUhWmAPZUS_RRZlPsJKFLiT2T_6ZvekdDydtxSlmmSOKXDGnNsvZVX81PEDRlpXGXTeZfAAq-bJqeu0shwh_ULGEVzMWH9pFgt6vTxD3S_p340705rRSI5OZ7FOMMopvSNILoEPJ-moJfyxIXSlCo');
//         },
//         success: function (xml) {
//             console.log(xml);
//             console.log('yes');
//         }
//     });
// });

// $('#search').click(function () {
//   let clientID = '0442afbef13c432d8d617507b9ba89ab';
//   let clientSecret = '2b100f45ee0e43b1ab61a6607238618e';
//     $.ajax({
//         type: "POST",
//         url: "https://accounts.spotify.com/api/token",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
//             xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
//             xhr.setRequestHeader("Authorization", "Basic " + btoa(clientID + ':' + clientSecret));
//         },
//         //dataType: "json",
//         data: {"grant_type": "client_credentials"},
//         // success: function (xhr) {
//         //     console.log(xhr.status);
//         //     console.log(xhr.statusText);
//         //     console.log(xhr.response);
//         // }
//
//     });
// });

$('#search').click(function() {
  let clientID = '0442afbef13c432d8d617507b9ba89ab';
  let clientSecret = '2b100f45ee0e43b1ab61a6607238618e';
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://accounts.spotify.com/api/token");
  xhr.setRequestHeader('Authorization', 'Basic' + btoa(clientID + ':' +clientSecret));
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.send();
  console.log(xhr.status);
  console.log(xhr.statusText);
  console.log(xhr.response);
//  $('#searchresults').append(xhr.response);
});

// $('#search').click(function() {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", "https://api.spotify.com/v1/search?q=Muse%20blackout&type=track", false);
//   xhr.setRequestHeader('Authorization', 'Bearer' + 'BQAVTivzRI871w6BhJSy0yHDLjHLVNmPPnbFIoj4QlDecYv1pJlsciZaR9dKUgE5R7iGzBGcDdxOcecM2SjOdVrGqy9xLf2Zv1qv-MTFYFt2-ARunyl77DOYaNXwRIQgxOH-l5FM5XIAOtm2L2FbllHw_em_gODBhsRnA3aUdg');
//   xhr.send();
//   console.log(xhr.status);
//   console.log(xhr.statusText);
//   console.log(xhr.response);
// //  $('#searchresults').append(xhr.response);
// });
