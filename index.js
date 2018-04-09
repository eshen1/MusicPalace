const ACCESS_TOKEN = 'BQCaqtGAZgnl0noxguvCfDuSa8-vdZK5eNWNlzOmfJk0V1aWKodphG5l7dPEJXeYH0jJomgBlaoGrqG4VOmJspk6jGaW8pf8b7-uvTiKz80_rDoLTRCvOSOvDhQJX2ZdR5OeVBt0H0RhvJ5TOUS9c-TVg7cHkkMSJ6MBx7BCBeKy';

$('#plus').click(function() {
  let newName = prompt('Please enter your music palace Name', 'Music');
    if (newName != null) {
         console.log(newName);
        let newPlaylist = $("<a>", {
          id: newName,
          href: '#'+newName,
          text: newName
        });
        $('#playlistNames').append(newPlaylist);
    }
});

$('#playlistNames').click(function() {
  $('.searchresults').empty();
  // TODO populate with songs for this playlist.
});

// TODO as each playlist is made, append empty jquery object, hidden
// TODO when song dropped on playlist, it is added to that jquery object


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
  window.location.href='#Search';
  let searchQuery = document.getElementById('searchTerm').value;
    $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track&market=us&limit=10&offset=5',
        headers: {
            'Authorization': 'Bearer ' + ACCESS_TOKEN
        },
        success: function (response) {
          // trackUri = response.tracks.items[0].uri;
          processResults(response);
          // console.log(response);
        }
    });
});

let processResults = function(response) {
    $('.searchresults').empty();
    for (let i = 0; i < 10; i++) {
      let albumIcon = $('<img />',
        { 'class': 'songIcon',
          id: response.tracks.items[i].uri,
          src: response.tracks.items[i].album.images[0].url,
          draggable: 'true',
          width: '100px',
          height: '100px',
          css: {
            'margin-bottom': '10px'
          }
        });

      albumIcon.click(function(){
        trackUri = this.id;
        fetch('https://api.spotify.com/v1/me/player/play?device_id=12967c87accca1114dff634933e2bea20d79475c', {
          method: 'PUT',
          body: JSON.stringify({ uris: [trackUri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN
          },
        });
        console.log(this.id);
      });

      let title = response.tracks.items[i].name;
      let artist = response.tracks.items[i].artists[0].name;
      let album = response.tracks.items[i].album.name;

      let result = document.createTextNode('Title: ' + title + ', Artist: ' + artist + ', Album: ' + album + '\n');
      $('.searchresults').append(albumIcon);
      $('.searchresults').append(result);
      $('.searchresults').append('<br>');
    }
};
