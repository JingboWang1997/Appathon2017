var localData;

$(document).ready(function() {
    $(".searchButton").click(function() {
        console.log("first test");
        $.get('https://appathon2017.azurewebsites.net/resources/', {}, function(data){
        	localData = data;
        	console.log("test"); 
            if (typeof(data.video) == "undefined" ) { 
                console.log('rerun, undefined'); 
            } else { 
                //console.log(data.video[0]); 
                for (var a = 0; a < data.video.length; a++) { 
                    var id = "#video" + a; 
                    $(id).attr("src",data.video[a]); 
                } 
            }
            // console.log(data);
            // console.log("test");
            //console.log(data.video.length);
            //src = 'https://www.youtube.com/embed/' + id;
        });
    });

});

function updateImage() {

    //div.innerHTML = '<img class="cover" src="https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi" alt="image" style="width:100%">';

    var mydiv = document.getElementById('Images');
	while(mydiv.firstChild) {
	  	mydiv.removeChild(mydiv.firstChild);
	}
	if (localData != undefined) {
		console.log("data: " + localData.image.length);
		for (var i = 0; i < localData.image.length; i++) {

			var div = document.createElement("div");
			var img = document.createElement("img");
			div.className = 'floating-box';
			img.src = localData.image[i].toString();
			img.className = "cover";


			div.appendChild(img);
	    	
	    	console.log(localData.image[i]);
			
			mydiv.appendChild(div);
		}
	} else {
		console.log("not working");
	}
}
