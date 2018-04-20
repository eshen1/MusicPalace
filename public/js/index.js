const ACCESS_TOKEN = 'BQAgV-hdBiRV9KjbCGKKngxBmgLF4XaQAjijlQy98w3izEV5fCWGgQylsPOJ6UaKhMf3bMutYAmM0DKjbwebsj5RY9j-yidjwBrdiVCqX5KIeQZvjBzyIdsFgABia1O4L01O1_z81SovsUA6r9cm64w8PxUKBiY4igaKewi_GM8W';

let playlistContent = {};
let trackUri = '';

$('html').on('dragenter dragleave dragover drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

$('#plus').click(function() {
  let newName = prompt('Please enter your music palace Name', 'Music');
  playlistContent[newName] = [];
  if (newName != '') {
    let newPlaylist = $("<div/>", {
      id: newName,
      href: '#'+newName,
      text: newName
    }).droppable();

    $(newPlaylist).on("drop", function(event, ui) {
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
          // trackUri = response.tracks.items[0].uri;
          processResults(response);
          // console.log(response);
        }
    });
});

let processResults = function(response) {
  $('.searchresults').empty();
  for (let i = 0; i < 10; i++) {
    let result = $('<div/>', {
      id: response.tracks.items[i].uri
    });

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
      fetch('https://api.spotify.com/v1/me/player/play?device_id=2608fac21fb586ccd677a9b0bf710111d522b7f7', {
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
    let songInfo = document.createTextNode('Title: ' + title + ', Artist: ' + artist + ', Album: ' + album + '\n');
    result.append(albumIcon);
    result.append(songInfo);
    result.draggable({
      revert: true
    });
    $('.searchresults').append(result);
    $('.searchresults').append('<br>');
  }

};
