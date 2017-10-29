var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var google = require('googleapis');
var API_KEY = 'AIzaSyDONLs1uaIFJZ35I33XPI21BdaQccYKa3s'; // specify your API key here
var result;
var videoArr = [];
var arr;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('', function(req, res) {
	//console.log(req.body.word);
	bing_image_search(req.body.word);
	for (var i = 0; i < result.length; i++) {
        result[i] = result[i].contentUrl;
    }
    search(req.body.word);
    arr = {"image": result, "video": videoArr };
    hostResources(arr);
	//res.send(arr);
});

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(port);

// Youtube API
// Search for a specified string.
function search(keyword) {
  var q = keyword;
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
      for(var a = 0; a < videos.length; a++) {
          videoArr[a] = videos[a].id.videoId;
      }
    }
});
}

function hostResources(dictionary) {
    app.get('/resources', function(req, res){
      res.send(dictionary);
    });
}
search();


'use strict';

let https = require('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the subscriptionKey string value with your valid subscription key.
let subscriptionKey = '061cc495fdf54b1ca1161bc604b6d533';

// Verify the endpoint URI.  At this writing, only one endpoint is used for Bing
// search APIs.  In the future, regional endpoints may be available.  If you
// encounter unexpected authorization errors, double-check this host against
// the endpoint for your Bing Search instance in your Azure dashboard.
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';

let term = 'puppies';

let response_handler = function (response) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        body = JSON.parse(body);
        result = body.value;
        //console.log(body.value[0].contentUrl);
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
};

let bing_image_search = function (search) {
  console.log('Searching images for: ' + term);
  let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(search),
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    let req = https.request(request_params, response_handler);
    req.end();
}

let collectData = function () {
    var keyword = document.getElementById("keyword").value;
    console.log(keyword);
    response_handler;
}

if (subscriptionKey.length === 32) {
    bing_image_search(term);
} else {
    console.log('Invalid Bing Search API subscription key!');
    console.log('Please paste yours into the source code.');
}
