const ACCESS_TOKEN = 'BQAEFTd8txfdoBp7jDlDH5KRrkafZsU5kUKqy66rh8v3obKpZYTKZG0A9t0HdtBddiriX_3Q2xWeSnjRqdo7R0YmnT_u2OUkuM2fCE6XcCLAnNJfACOTB0EC8TxmmjNDqow5hpWObvO0Br0_Hb8QDAgMLYxjjciKsIxpLwyxz_dY';

let deviceId = '';
const playlistContent = {};
let trackUri = '';
let trackIndex = 0;

const checkEmail = (text) => {
  const re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(text) === false) {
    const node = document.createElement('div');
    node.id = 'node';
    const textnode = document.createTextNode('Invalid email');
    node.appendChild(textnode);
    document.getElementById('pass').appendChild(node);
    return false;
  }
  return true;
};

const checkPass = (text) => {
  if (text.length <= 5) {
    const node = document.createElement('div');
    node.id = 'node';
    const textnode = document.createTextNode('Password needs to be length of 6 or more');
    node.appendChild(textnode);
    document.getElementById('pass').appendChild(node);
    return false;
  }
  return true;
};

$('#buttons').click(() => {
  if (document.getElementById('pass').childNodes.length > 3) {
    document.getElementById('pass').removeChild(document.getElementById('pass').childNodes[3]);
  }
  if (checkEmail(document.getElementById('email').value)) {
    if (checkPass(document.getElementById('passw').value)) {
      const node = document.createElement('div');
      node.id = 'node';
      const textnode = document.createTextNode('Registered');
      node.appendChild(textnode);
      document.getElementById('pass').appendChild(node);
    }
  }
});

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
//  player.addListener('player_state_changed', state => { console.log(state); });
  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    deviceId = device_id;
  });
  // Connect to the player!
  player.connect();
  $('.play').click(() => {
    player.getCurrentState().then((state) => {
      if (state) {
        if (state.paused === true) {
          document.querySelector('.play').innerHTML = 'pause';
        }
        if (state.paused === false) {
          document.querySelector('.play').innerHTML = 'play_arrow';
        }
        player.togglePlay();
      }
    });
  });

  // play next song when current song has ended
  player.addListener('player_state_changed', (state) => {
    if ((state.position === 0) && (state.paused === true)
    && (state.restrictions.disallow_pausing_reasons)) {
      trackIndex += 1;
      if (trackIndex >= $('.searchresults').children().length) {
        trackIndex = 0;
      }
      trackUri = $('.searchresults').children().eq(trackIndex)[0].id;
      play();
    }
  });

  // api call to play a track
  let play = () => {
    fetch('https://api.spotify.com/v1/me/player/play?device_id=' + deviceId, {
      method: 'PUT',
      body: JSON.stringify({ uris: [trackUri] }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ACCESS_TOKEN
      },
    });
    document.querySelector('.play').innerHTML = 'pause';
    document.getElementById('playerIcon').src = document.getElementById(trackUri).getAttribute('imageSrc');
    document.querySelector('#playerTitle').innerHTML = document.getElementById(trackUri).getAttribute('trackTitle');
    document.querySelector('#playerArtist').innerHTML = document.getElementById(trackUri).getAttribute('trackArtist');
  }

  $('.next').click(() => {
    trackIndex += 1;
    if (trackIndex >= $('.searchresults').children().length) {
      trackIndex = 0;
    }
    trackUri = $('.searchresults').children().eq(trackIndex)[0].id;
    play();
  });

  $('.prev').click(() => {
    trackIndex -= 1;
    if (trackIndex < 0) {
      trackIndex = $('.searchresults').children().length - 1;
    }
    trackUri = $('.searchresults').children().eq(trackIndex)[0].id;
    play();
  });


  // prevent default behavior for drag and drop
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
        href: `#${newName}`,
        text: newName,
        css: { height: '50px'}
      }).droppable();

      $(newPlaylist).on('drop', (event, ui) => {
        event.preventDefault();
        event.stopPropagation();
        alert(`added to${newName}`);
        playlistContent[newName].push(ui.draggable);
      });

      newPlaylist.click(() => {
        $('.searchresults').empty();
        for (let i = 0; i < playlistContent[newName].length; i++) {
          playlistContent[newName][i].click(() => {
            trackUri = playlistContent[newName][i][0].id;
            trackIndex = $(this).index();
            console.log(trackIndex);
            play();
          });
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

  $('#searchButton').click(() => {
    window.location.href = '#Search';
    const searchQuery = document.getElementById('searchTerm').value;
    $.ajax({
      type: 'GET',
      url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&market=us&limit=50&offset=5`,
      headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN
      },
      success (response) {
        processResults(response);
      }
    });
  });

  let processResults = (response) => {
    $('.searchresults').empty();
    for (let i = 0; (i < 50) && (response.tracks.items[i].uri !== undefined); i++) {
      const result = $('<div/>', {
        id: response.tracks.items[i].uri,
        class: 'result',
        imageSrc: response.tracks.items[i].album.images[0].url,
        trackTitle: response.tracks.items[i].name,
        trackArtist: response.tracks.items[i].artists[0].name
      });

      const albumIcon = $(
        '<img />',
        {
          class: 'songIcon',
          id: response.tracks.items[i].uri,
          src: response.tracks.items[i].album.images[0].url,
          width: '150px',
          height: '150px'
        }
      );

      const $playButton = $(
        '<i/>',
        {
          class: 'fa fa-play-circle-o',
          id: 'playButton'
        }
      );

      const $iconContainer = $(
        '<div/>',
        {
          class: 'albumIconContainer'
        }
      ).append(albumIcon).append($playButton).click(() => {
        trackUri = response.tracks.items[i].uri;
        trackIndex = i;
        play();
      });

      const title = response.tracks.items[i].name;
      const artist = response.tracks.items[i].artists[0].name;
      const album = response.tracks.items[i].album.name;
      const songInfo = $(
        '<ul/>',
        { class: 'songInfo' }
      ).append($(`<li id=title>${title}<li/>`)).append($(`${'<li id=artist>' + 'Artist: '}${artist}<li/>`)).append($(`${'<li id=album>' + 'Album: '}${album}<li/>`));

      result.append($iconContainer).append(songInfo);
      result.draggable({
        revert: true
      });
      $('.searchresults').append(result);
    }
  };
};
