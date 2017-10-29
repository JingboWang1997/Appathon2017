$(document).ready(function() {
	// $(".searchButton").click(function() {
	// 	var keyword = document.getElementById("keyword").value;
	//     console.log(keyword);
	// });

    $(".searchButton").click(function(){
        //console.log("first test");
        $.get('http://127.0.0.1:3000/video', {}, function(data){
            console.log(data);
        });
    });

});
