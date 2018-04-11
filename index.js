const ACCESS_TOKEN = 'BQBDsRuqD6EJVN5PztZlTpEzxPfPGm1X7v1ooTSzO8ukNIUZuPG7PoYgCVirQokuhM7vF2itNo420Wg8kodN3c0Ui8unI0fGo_i3N7vJ4jd-gz2qfFnwnk2lOntf9s1F8MsyoiqUEWkTWfef7JWi2S1Dt5TUVHQg0ZyVcsGCaiS0';

let playlistContent = {};
let trackUri = '';

$('#plus').click(function() {
  let newName = prompt('Please enter your music palace Name', 'Music');
  playlistContent[newName] = [];
  if (newName != '') {
    let newPlaylist = $("<a>", {
      id: newName,
      href: '#'+newName,
      text: newName
    }).droppable({
      drop: function(event, ui) {
        playlistContent[newName].push(ui.draggable);
      }
    });

    newPlaylist.click(function() {
      $('.searchresults').empty();
      for (let i = 0; i < playlistContent[newName].length; i++) {
        playlistContent[newName][i].click(function(){
          trackUri = playlistContent[newName][i][0].id;
          fetch('https://api.spotify.com/v1/me/player/play?device_id=12967c87accca1114dff634933e2bea20d79475c', {
            method: 'PUT',
            body: JSON.stringify({ uris: [trackUri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + ACCESS_TOKEN
            },
          });
          console.log(playlistContent[newName][i][0].id);
        })
        $('.searchresults').append(playlistContent[newName][i]);
      }
    });
    $('#playlistNames').append(newPlaylist);
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
        width: '100px',
        height: '100px',
        css: {
          'margin-bottom': '10px'
        }
    }).click(function(){
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
    }).draggable({
      revert: true
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
