const ACCESS_TOKEN = 'BQB7FID3SxQ7HxwvBTwyCe8gBYjU85PgyNSLi9W9LHkideBV7vsfVAKn5cB8ofPFl3uUEPfihuH9m9w3tPGzVX1yVQrgAuxNRUxKqL__65-VckuNG9doBqQt7DNqzQtNCJe_WvNVd9paWqTkgOjf4qFtmxpplNTugclxs6dPrmPL';


$( '.sidenav a +' ).click(function() {
  let person = prompt('Please enter your music palace Name', 'Music');
    if (person != null) {
        let node = document.createElement('div');
        let textnode = document.createTextNode(person);
        node.appendChild(textnode);
        document.getElementById('plus').prepend(node);
    }
});
// <script type='text/javascript'>
//     function showHomePage(homepage){
//     document.getElementById(homepage).style.display = 'block';
//     }
//   </script>

$('#buttons').click(function() {
  document.getElementById('homepage').style.display = 'block';
  document.getElementById('loginpage').style.display = 'none';
});

// $(document).ready(function(){
//     $('button').click(function(){
//       document.getElementById('homepage').style.display = 'block';
//     	document.getElementById('homepage').style.visibility = 'visible';
//     });
// });


// $('#search').click(function () {
//   let clientID = '0442afbef13c432d8d617507b9ba89ab';
//   let clientSecret = '2b100f45ee0e43b1ab61a6607238618e';
//     $.ajax({
//         type: 'POST',
//         url: 'https://accounts.spotify.com/api/token',
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': 'true',
//             'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
//         },
//         dataType: 'jsonp',
//         data: {'grant_type': 'client_credentials'},
//         // success: function (xhr) {
//         //     console.log(xhr.status);
//         //     console.log(xhr.statusText);
//         //     console.log(xhr.response);
//         // }
//     });
// });

// $('#search').click(function() {
//   let clientID = '0442afbef13c432d8d617507b9ba89ab';
//   let clientSecret = '2b100f45ee0e43b1ab61a6607238618e';
//   let xhr = new XMLHttpRequest();
//   xhr.open('POST', 'https://accounts.spotify.com/api/token');
//   xhr.setRequestHeader('Authorization', 'Basic' + btoa(clientID + ':' +clientSecret));
//   xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//   xhr.send();
//   console.log(xhr.status);
//   console.log(xhr.statusText);
//   console.log(xhr.response);
// //  $('#searchresults').append(xhr.response);
// });

// $('#search').click(function() {
//   let access_token = 'BQALR57LX1rC2eaq7aE8dCD28HfMKepITm0_i6HWK9Vn118NOk7RXhh6dv3gWnDxZI8H_KrKbRWss_CHJXVZq57SwB8_2LxWPD0TOzgv9QX-k-aH82Mjl7V9g5hZri7tpP0E80CVZQLgd7ZnurthdIFbYIJx_FAw5CKTMDugoA';
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://api.spotify.com/v1/search?q=live&type=track&market=us&limit=10&offset=5', false);
//   xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
//   xhr.send();
//   // console.log(xhr.status);
//   // console.log(xhr.statusText);
//   // console.log(xhr.response);
//   $('#searchresults').append(xhr.response);
//   console.log(xhr.response);
// });
let trackUri = '';
$('#searchButton').click(function () {
  let searchQuery = document.getElementById('searchTerm').value;
  console.log(searchQuery);
  // let access_token = 'BQCg3z_RqMGAmGE5zO7H0fHpFpJOjntGQH7ysRb9uU4gpFvjrSgluwrfTQ6WyIPv5mSWcOnLpATQIs54PimE-jvyfKtjeJ7U7Dq5H6xLoYZK1MQqCNupFGScTO47ARIJoPJkmfji2RyjXN5SxNXxqQjlGuDPsGTcDI73yZ--M1BQ';
    $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track&market=us&limit=10&offset=5',
        headers: {
            'Authorization': 'Bearer ' + ACCESS_TOKEN
        },
        success: function (response) {
          trackUri = response.tracks.items[0].uri;
          processResults(response);
          console.log(response);
        }
    });
});

$('#searchresults').click(function(){

  // $.ajax({
  //     type: 'PUT',
  //     url: 'https://api.spotify.com/v1/me/player/pause?device_id=12967c87accca1114dff634933e2bea20d79475c',
  //     headers: {
  //         'Authorization': 'Bearer ' + ACCESS_TOKEN,
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     }
  // });

$.ajax({
    type: 'PUT',
    url: 'https://api.spotify.com/v1/me/player/play?device_id=12967c87accca1114dff634933e2bea20d79475c',
    headers: {
        'Authorization': 'Bearer ' + ACCESS_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: {
      // "context_uri": "spotify:album:4LH4d3cOWNNsVw41Gqt2kv"
      'uris': [ 'trackUri' ]
    },
    success: function (data) {
    console.log(data);
    }
});


console.log(trackUri);


});

let processResults = function(response) {
    $('#searchresults').empty();
    for (let i = 0; i < 10; i++) {
      let albumIcon = new Image();

      albumIcon.src = response.tracks.items[i].album.images[0].url;
      albumIcon.style.width = '100px';
      albumIcon.style.height = '100px';
      albumIcon.style.marginBottom = '10px';

      let result = document.createTextNode('Title: ' + response.tracks.items[i].name + ', Artist: ' + response.tracks.items[i].artists[0].name + ', Album: ' + response.tracks.items[i].album.name + '\n');
      $('#searchresults').append(albumIcon);
      $('#searchresults').append(result);
      $('#searchresults').append('<br>');
    }

};
