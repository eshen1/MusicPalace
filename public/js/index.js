const ACCESS_TOKEN = 'BQDyVYYhhtccDkLKeoW6XCS-W0IflDQsNzTcULbUJ8APThpG8oFWXH9KlKM2RnSTiY59cSe6eY8R8LF8kYmayt32wdsnxsgStMOHEza76IjVgSh15QsdaRdTfo1WC0-wDq31w97vNpfYqcbHiyh4fa3us9GGoXYkEjmczS6ttufa';

let deviceId = ''
let playlistContent = {};
let trackUri = '';

window.onSpotifyWebPlaybackSDKReady = () => {
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(ACCESS_TOKEN); }
  });
  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });
  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });
  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    deviceId = device_id;
  });
  // Connect to the player!
  player.connect();
  $('.sidenav').click(function(){
    player.getCurrentState().then(state => {
      if (state) {
        player.pause();
        return;
      }
    });
  });
};

$('html').on('dragenter dragleave dragover drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

$('#plus').click(function() {
  let newName = prompt('Please enter your music palace Name', 'Music');
  playlistContent[newName] = [];
  if (newName != '') {
    let newPlaylist = $('<div/>', {
      id: newName,
      href: '#'+newName,
      text: newName
    }).droppable();

    $(newPlaylist).on('drop', function(event, ui) {
      event.preventDefault();
      event.stopPropagation();
      alert('added to' + newName);
      playlistContent[newName].push(ui.draggable);
//     event.originalEvent.dataTransfer.dropEffect = "copy";
    });

    newPlaylist.click(function() {
      $('.searchresults').empty();
      for (let i = 0; i < playlistContent[newName].length; i++) {
        playlistContent[newName][i].click(function(){
          trackUri = playlistContent[newName][i][0].id;
          fetch('https://api.spotify.com/v1/me/player/play?device_id=2608fac21fb586ccd677a9b0bf710111d522b7f7', {
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
        processResults(response);
      }
    });
});

let processResults = function(response) {
  $('.searchresults').empty();
  for (let i = 0; i < 10; i++) {
    let result = $('<div/>', {
      id: response.tracks.items[i].uri,
      'class': 'result'
    });

    let albumIcon = $('<img />',
      { 'class': 'songIcon',
        id: response.tracks.items[i].uri,
        src: response.tracks.items[i].album.images[0].url,
        width: '50px',
        height: '50px',
        css: {
          'margin-top': '10px',
          'margin-bottom': '10px'
        }
    }).click(function(){
      trackUri = this.id;
      fetch('https://api.spotify.com/v1/me/player/play?device_id=' + deviceId, {
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
    let songInfo = $('<ul/>',
      { 'class': 'songInfo'
    }).append($('<li>'+'Title: ' + title +'<li/>')).append($('<li>'+' Artist: ' + artist +'<li/>')).append($('<li>'+'Album: ' + album+'<li/>'));

    result.append(albumIcon).append(songInfo);
    result.draggable({
      revert: true
    });
    $('.searchresults').append(result);
    $('.searchresults').append('<br>');
  }

};
