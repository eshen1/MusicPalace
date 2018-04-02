const ACCESS_TOKEN = 'BQAC8M0GWAR37VDtfO4DaRSHP4NkaN-Zwnd_kGsNVy8o81kJZxSgCufg30iu0YUZKyZ00FLCFZpbOP4JI2D4Y6z4eTkkSTa63XQHKwSUa925tirzV268dh5qd4oqfxIJqb8BUJ_1TGSsF3NgO-Gu5f2GSDzxMbsu141h4biUN271';

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

fetch('https://api.spotify.com/v1/me/player/play?device_id=12967c87accca1114dff634933e2bea20d79475c', {
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
