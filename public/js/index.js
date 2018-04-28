const ACCESS_TOKEN = 'BQCF5GlIdOt-SFUNIL3-VzUJtMO7GWpMHhx1UYZicaKMtohHafML7zbD6KwXdH_tFbnhdCHUxTxTFKcQbWaDKL5ncnakZchbIj56x2C4MUMvNLmsz8V-gPLOAa9iwyUn-sDgEamoHVuedNh3hiVpXQJNSLwYb5MkP4lgBqeO97Jq';

let deviceId = ''
let playlistContent = {};
let trackUri = '';


let checkEmail = (text) => {
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(text) === false) {
    let node = document.createElement("div");
    node.id = 'node';
    let textnode = document.createTextNode("Invalid email");
    node.appendChild(textnode);
    document.getElementById("pass").appendChild(node);
    return false;
  }
  return true;
}

let checkPass = (text) => {
    if (text.length <= 5) {
      let node = document.createElement("div");
      node.id = 'node';
      let textnode = document.createTextNode("Password needs to be length of 6 or more");
      node.appendChild(textnode);
      document.getElementById("pass").appendChild(node);
      return false;
    }
    return true;
}

$('#buttons').click(function() {
  if(document.getElementById('pass').childNodes.length > 3) {
    document.getElementById('pass').removeChild(document.getElementById('pass').childNodes[3]);
  }
  if(checkEmail(document.getElementById('email').value)){
    if (checkPass(document.getElementById('passw').value)) {
      let node = document.createElement("div");
      node.id = 'node';
      let textnode = document.createTextNode("Registered");
      node.appendChild(textnode);
      document.getElementById("pass").appendChild(node);    }
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
          fetch('https://api.spotify.com/v1/me/player/play?device_id=' + deviceId, {
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



$('#searchButton').click(function () {
  window.location.href='#Search';
  let searchQuery = document.getElementById('searchTerm').value;
    $.ajax({
      type: 'GET',
      url: 'https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track&market=us&limit=50&offset=5',
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
  for (let i = 0; (i < 50) && (response.tracks.items[i].uri !== undefined); i++) {
    let result = $('<div/>', {
      id: response.tracks.items[i].uri,
      'class': 'result'
    });

    let albumIcon = $('<img />',
      { 'class': 'songIcon',
        id: response.tracks.items[i].uri,
        src: response.tracks.items[i].album.images[0].url,
        width: '150px',
        height: '150px'
    });

    let $playButton = $('<i/>',
      { 'class': 'fa fa-play-circle-o',
        id: 'playButton'
      });

    let $iconContainer = $('<div/>',
    { 'class': 'albumIconContainer'
    }).append(albumIcon).append($playButton).click(function(){
      trackUri = response.tracks.items[i].uri;
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
    }).append($('<li id=title>'+ title +'<li/>')).append($('<li id=artist>'+' Artist: ' + artist +'<li/>')).append($('<li id=album>'+'Album: ' + album+'<li/>'));

    result.append($iconContainer).append(songInfo);
    result.draggable({
      revert: true
    });
    $('.searchresults').append(result);
    // $('.searchresults').append('<br>');
  }

};
