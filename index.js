

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

$('#search').click(function () {
  let searchQuery = document.getElementById('searchTerm').value;
  console.log(searchQuery);
  let access_token = 'BQDwmevy00RX5_mtzbbqIAP7S3CrKc9JknXuoEbmobZzv0Vo7BMQZmGys4UhH-AAND0Yjo3p40vbv7FWv1ydLzE0AzBqmgMsp4OzQAKdu8O97IM-YVgFdirJ3gMr0E3t-91aVraQpuSnexIwYgKrxijTzvKovHxArp-jz_SIgtT3';
    $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track&market=us&limit=10&offset=5',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
          processResults(response);
          //$('#searchresults').append(data.tracks.items[0].album.images[0].url);
          console.log(response);
        }
    });
});

let processResults = function(response) {
    $('#searchresults').empty();
    // Object.keys(scorelist).forEach(function(key) {
    //     scores += '<br>' + key + ': ' + scorelist[key];
    // });
    let albumIcon = new Image();
    albumIcon.src = response.tracks.items[0].album.images[0].url;
    albumIcon.style.width = '100px';
    albumIcon.style.height = '100px';
    $('#searchresults').append(albumIcon);
    $('#searchresults').append(response.tracks.items[0]);
};
