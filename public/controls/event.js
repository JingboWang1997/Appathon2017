$(document).ready(function() {
    $(".searchButton").click(function() {
        console.log("first test");
        $.get('http://127.0.0.1:3000/resources/', {}, function(data){
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
        });
    });

});
