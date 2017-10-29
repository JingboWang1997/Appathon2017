// Youtube API
// API key: AIzaSyDONLs1uaIFJZ35I33XPI21BdaQccYKa3s

//Authentication
var google = require('googleapis');
//var $ = require('jQuery');

var API_KEY = 'AIzaSyDONLs1uaIFJZ35I33XPI21BdaQccYKa3s'; // specify your API key here

// Search for a specified string.
function search() {
  //var q = $('#query').val();
  var q = 'dogs';
  var request = google.youtube('v3');
  request.search.list({
    key: API_KEY,
    q: q,
    type: 'video',
    part: 'snippet'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var videos = response.items;
    if (videos.length == 0) {
      console.log('No videos found.');
    } else {
      var id = videos[1].id.videoId;
      var src = 'https://www.youtube.com/embed/' + id;
      console.log(src);
    //   $(function () {
    //      $("#test").src(src);
    //   });
    }
  });
}

function insertVideo(src) {

}

search();
