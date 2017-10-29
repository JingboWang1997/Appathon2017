$(document).ready(function() {
    $(".searchButton").click(function() {
        console.log("first test");
        $.get('http://127.0.0.1:3000/resources/', {}, function(data){
            console.log(data);
            console.log("test");
            //console.log(data.video.length);
            //src = 'https://www.youtube.com/embed/' + id;
        });
    });

});
