const ACCESS_TOKEN = 'BQBFGJ9vi--erbXfWn3cPrIlXB17oX2_r-LT0AJaqhbvFSzurw559oh4O_KP_angBpoPA2Qu4hzmw3TbCWeX7-ewzyj5inToYKdFsSB49wVYpms4RjgdB18WxIA8juc8QzCIkompN0Le-5_-7fD38W5GKZZQsBtcnXAIoiegezRI';

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

$('html').on('dragenter dragleave dragover drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

$('#plus').click(() => {
  const newName = prompt('Please enter your music palace Name', 'Music');
  playlistContent[newName] = [];
  if (newName !== '') {
    const newPlaylist = $('<div/>', {
      id: newName,
      href: `#, ${newName}`,
      text: newName,
    }).droppable();

    $(newPlaylist).on('drop', (event, ui) => {
      event.preventDefault();
      event.stopPropagation();
      alert('added to' + newName);
      playlistContent[newName].push(ui.draggable);
      //     event.originalEvent.dataTransfer.dropEffect = "copy";
    });

    newPlaylist.click(() => {
      $('.searchresults').empty();
      for (let i = 0; i < playlistContent[newName].length; i += 1) {
        playlistContent[newName][i].click(() => {
          trackUri = playlistContent[newName][i][0].id;
          fetch('https://api.spotify.com/v1/me/player/play?device_id=2608fac21fb586ccd677a9b0bf710111d522b7f7', {
            method: 'PUT',
            body: JSON.stringify({
              uris: [trackUri]
            }),
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

$('#buttons').click(() => {
  document.getElementById('homepage').style.display = 'block';
  document.getElementById('loginpage').style.display = 'none';
});

const processResults = (response) => {
  $('.searchresults').empty();
  for (let i = 0; i < 10; i += 1) {
    const result = $('<div/>', {
      id: response.tracks.items[i].uri,
    });

    const albumIcon = $('<img />', {
      class: 'songIcon',
      id: response.tracks.items[i].uri,
      src: response.tracks.items[i].album.images[0].url,
      width: '100px',
      height: '100px',
      css: {
        'margin-bottom': '10px'
      }
    }).click(() => {
      trackUri = this.id;
      fetch('https://api.spotify.com/v1/me/player/play?device_id=' + deviceId, {
        method: 'PUT',
        body: JSON.stringify({
          uris: [trackUri]
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + ACCESS_TOKEN
        },
      });
      console.log(this.id);
    });

    const title = response.tracks.items[i].name;
    const artist = response.tracks.items[i].artists[0].name;
    const album = response.tracks.items[i].album.name;
    const songInfo = document.createTextNode(`Title: ${title}, Artist: ${artist}, Album: ${album}`);
    result.append(albumIcon);
    result.append(songInfo);
    result.draggable({
      revert: true,
    });
    $('.searchresults').append(result);
    $('.searchresults').append('<br>');
  }
};

$('#searchButton').click(() => {
  window.location.href = '#Search';
  const searchQuery = document.getElementById('searchTerm').value;
  $.ajax({
    type: 'GET',
    url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&market=us&limit=10&offset=5`,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    success: (response) => {
      // trackUri = response.tracks.items[0].uri;
      processResults(response);
      // console.log(response);
    },
  });
});
