var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var google = require('googleapis');
var cors = require('cors')
var API_KEY = 'AIzaSyDONLs1uaIFJZ35I33XPI21BdaQccYKa3s'; // specify your API key here
var arr;
var result;
var videoArr;
var searched = false;
app.get('/',function(req,res) {
    res.sendFile(__dirname + '/public/views/index.html');
});
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let search = function(keyword) {
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
        videoArr = videos;
        for (var a = 0; a < videos.length; a++) {
            videoArr[a] = 'https://www.youtube.com/embed/' + videos[a].id.videoId;
        }
    }
});
}

function hostResources(dictionary) {
    app.get('/resources/', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true);
        console.log(dictionary);
      res.json(dictionary);
    });
}

app.post('', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
	bing_image_search(req.body.word);
    search(req.body.word);
    // console.log("test: " + result);
    // console.log("test2: "+ videoArr);
    // console.log(videos);
    // for (var a = 0; a < videos.length; a++) {
    //     videoArr[a] = videos[a].id.videoId;
    // }
    //console.log(req.body.word);
    app.get('/resources/',(req, res) => {
         res.json({"image": result, "video": videoArr });
    });
    //arr = {"image": result, "video": videoArr };
    // console.log(result);
    // console.log(videoArr);
    //hostResources(arr);
    //res.send("");
    return;
});

app.use(express.static(__dirname + '/public'));

app.listen(port);

// Youtube API
// Search for a specified string.


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
        console.log(body.value.length);
        //console.log(body.value[0].contentUrl);
        for (var i = 0; i < result.length; i++) {
            result[i] = result[i].contentUrl;
        }
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
};

let bing_image_search = function (search) {
  var term = search;
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
