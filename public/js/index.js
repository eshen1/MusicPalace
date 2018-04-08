const ACCESS_TOKEN = 'BQAiL4aUg-UemajC0pM-nkPNllV81y8A4CnXh9-CLvu1JlITlcAPT1AUjXsja5sSL3dxBEq1Txd-050zSd3CNO1Hc0KR6C3HxWwx30lhwdCKMAq_YpXhHHyfUwg7VO9Mv4PmJBOY9k-IJxaoYCHUlCcPKPrhs4skaSa9OXdG2A';

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

  // $.ajax({
  //     type: 'PUT',
  //     url: 'https://api.spotify.com/v1/me/player/play?device_id=12967c87accca1114dff634933e2bea20d79475c',
  //     headers: {
  //         'Authorization': 'Bearer ' + ACCESS_TOKEN,
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: {
  //       // "context_uri": "spotify:track:5bknBRjKJZ643DAN2w8Yoy"
  //       'uris': [trackUri]
  //     },
  //     success: function (data) {
  //       console.log(data);
  //     }
  // });

fetch('https://api.spotify.com/v1/me/player/play?device_id=11fa90569f6835f58f814ed7321732fad88ca13c', {
  method: 'PUT',
  body: JSON.stringify({ uris: [trackUri] }),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + ACCESS_TOKEN
  },
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

      let title = response.tracks.items[i].name;
      let artist = response.tracks.items[i].artists[0].name;
      let album = response.tracks.items[i].album.name;

      let result = document.createTextNode('Title: ' + title + ', Artist: ' + artist + ', Album: ' + album + '\n');
      $('#searchresults').append(albumIcon);
      $('#searchresults').append(result);
      $('#searchresults').append('<br>');
    }
};
