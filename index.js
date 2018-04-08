const ACCESS_TOKEN = 'BQBnfDnhoM_cCcKsBOyPUbCtIwEK5B1e2KIunXPzcr_LZYXGsbubKBUDZuqk-vPMe2tK5XtJ8N34uiYp1ZIOmyQsnaBJVpIo2vdPh2HKpGqD3C1EamSevA1UpLsCirxeKrRc0YVCGxMYj0HqeWLOrECTKSGHjNrREM7OJl5_H6Uo';

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
          height: '100px'
        });

      $(albumIcon).css('margin-bottom', '10px');
      albumIcon.click(function(){
        trackUri = this.id
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
