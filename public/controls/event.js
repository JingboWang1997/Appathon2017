var localData;

$(document).ready(function() {
    $(".searchButton").click(function() {
        //console.log("first test"); //appathon2017.azurewebsites.net
        $.get('http://127.0.0.1:3000/resources/', {}, function(data){
        	localData = data;
            if (typeof(data.video) == "undefined" ) {
                console.log('rerun, undefined');
            } else {
                //console.log(data.video[0]);
                for (var a = 1; a < data.video.length + 1; a++) {
                    var id = "#video" + a;
                    $(id).attr("src",data.video[a-1]);
                }
                for (var b = 1; b < 17; b++) {
                    var id1 = "#img" + b;
                    $(id1).attr("src", data.image[b-1]);
                }
            }

        });
    });

});

// function updateImage() {
//
//     //div.innerHTML = '<img class="cover" src="https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi" alt="image" style="width:100%">';
//
//     var mydiv = document.getElementById('Images');
// 	while(mydiv.firstChild) {
// 	  	mydiv.removeChild(mydiv.firstChild);
// 	}
// 	if (localData != undefined) {
// 		console.log("data: " + localData.image.length);
// 		for (var i = 0; i < localData.image.length; i++) {
//
// 			var div = document.createElement("div");
// 			var img = document.createElement("img");
// 			div.className = 'floating-box';
// 			img.src = localData.image[i].toString();
// 			img.className = "cover";
//
//
// 			div.appendChild(img);
//
// 	    	console.log(localData.image[i]);
//
// 			mydiv.appendChild(div);
// 		}
// 	} else {
// 		console.log("not working");
// 	}
// }
