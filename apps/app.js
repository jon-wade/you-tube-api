var query="catherine hornby";

$(function(){

    $('#submit').click(function(){
        event.preventDefault();
        query = $('#query').val();
        console.log(query);
        getRequests(query);
    });

});

function getRequests(searchTerm){
    var params = {
        part: "snippet",
        key: "AIzaSyD-SSfvd0lIMI6xwScaT-npjkptHpYKzoc",
        q: searchTerm,
        maxResults: 50,
        //order: "viewCount"
    };
    url="https://www.googleapis.com/youtube/v3/search";
    $.getJSON(url, params, function(data){
        console.log(data.items);
        showResults(data);
    });
}

function showResults(data){
    //placeholder for html output of each result returned
    var html = "";
    //thumbnail object prototype/constructor
    function Thumbnail(url, width, height){
        this.url = url;
        this.width = width;
        this.height = height;
    }

    //iterate through the returned JSON data array
    for (var i=0; i<data.items.length; i++) {
        //console.log(data.items[i].snippet.title);
        //console.log(data.items[i].snippet.publishedAt);
        //console.log(data.items[i].snippet.description);
        //console.log(data.items[i].snippet.thumbnails.high.url);
        //create a thumbnail object for each thumbnail returned
        var thumb = new Thumbnail(data.items[i].snippet.thumbnails.medium.url, data.items[i].snippet.thumbnails.medium.width, data.items[i].snippet.thumbnails.medium.height);
        //console.log("URL= " + thumb.url);
        //console.log("Width= " + thumb.width);
        //console.log("Height= " + thumb.height);
        var videoid = data.items[i].id.videoId;

        html += '<li><a href="https://youtu.be/' + videoid + '" target="_blank" rel="external"><img src="'
                + thumb.url + '" id="tn' + i + '" alt="video image" title="' + data.items[i].snippet.title + ' on YouTube"></a></li>';
    }
    $('#search-results').html(html);
    setThumbnailDimensions(data.items.length);
}

function setThumbnailDimensions(numImages) {
    for (var i = 0; i < numImages; i++) {
        var width = $('#tn' + i).width();
        //console.log(width);
        var height = $('#tn' + i).height();
        //console.log(height);
        if (width != 320) {
            width = width * (180/height);
            //console.log("New width=" + width);
            //console.log("Image " + i + " being adjusted");
            height = 180;
            //console.log("New height= " + height);
            $('#tn' + i).attr('width', width);
            $('#tn' + i).attr('height', height);
        }
    }
}


