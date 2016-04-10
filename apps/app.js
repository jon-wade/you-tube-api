var query="catherine hornby";

$(function(){

    $('#overlay').hide();
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
        maxResults: 48
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
        //create a thumbnail object for each thumbnail returned
        var thumb = new Thumbnail(data.items[i].snippet.thumbnails.medium.url, data.items[i].snippet.thumbnails.medium.width, data.items[i].snippet.thumbnails.medium.height);
        //get videoid from a different part of the returned object
        var videoid = data.items[i].id.videoId;


        //commented code belows allows each of the video thumbnails to be clicked to go through to watch on YouTube
        //html += '<li><a href="https://youtu.be/' + videoid + '" target="_blank" rel="external"><img src="'
        //    + thumb.url + '" id="tn' + i + '" alt="video image" title="' + data.items[i].snippet.title + ' on YouTube"></a></li>';

        //this version has no anchor links and is used to create the lightbox affect
        html += '<li><img src="' + thumb.url + '" id="tn' + i + '" alt="video image" name="' + videoid + '"></li>';
    }

    //display the search results on the page
    $('#search-results').html(html);

    //some thumbnails come back as non-standard sizes, so need to be made consistent (same height, different widths, same aspect ratio)
    setThumbnailDimensions(data.items.length);

    //lightbox functionality when thumbnail clicked
    $('li').click(function(){
        //scroll to top of page to display the lightbox when a thumbnail clicked
        window.scrollTo(0,0);
        //show lightbox and dim the main content and pull in the youtube video as an iframe
        $('#overlay').show();
        $('#body').css('opacity', '0.2');
        $('#overlay').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + $(this).children().attr('name') + '" frameborder="0" allowfullscreen></iframe>');
        //hide the lightbox and stop playback when ??? clicked
        $('#overlay').click(function(){
            $(this).children().remove();
            $(this).hide();
            $('#body').css('opacity', '1');
        });
    });
}

//function to sort out the inconsistent image sizing
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


