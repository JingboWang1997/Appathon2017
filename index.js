var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/action', function(req, res) {
	console.log("test+++++++++++++++++++++++++++++++++++++++++++++++");
	console.log(req.body.word);
	res.send("test");
 	//	console.log('You sent the name "' + req.body.name + '".');
});

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

// http.listen(port, function(){
//     console.log('listening on *:' + port);
// });
app.listen(port);

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
        // console.log('\nRelevant Headers:\n');
        // for (var header in response.headers)
            // header keys are lower-cased by Node.js
            // if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
            //      console.log(header + ": " + response.headers[header]);
        body = JSON.parse(body);
        // console.log('\nJSON Response:\n');
        //console.log(body.value);
        for (var i = 0; i < body.value.length; i++) {
            console.log(body.value[i].contentUrl);
        }
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