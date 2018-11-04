//// Video Slider
//var slideIndex = 1;
//var video1 = document.getElementById('video1');
//var video2 = document.getElementById('video2');
//var video3 = document.getElementById('video3');

//showSlides(slideIndex);

//function plusSlides(n) {
//    showSlides(slideIndex += n);
//}

//function currentSlide(n) {
//    showSlides(slideIndex = n);
//}

//function showSlides(n) {
//    var i;
//    var slides = document.getElementsByClassName("mySlides");
//    var dots = document.getElementsByClassName("dot");
//    if (n > slides.length) { slideIndex = 1 }
//    if (n < 1) { slideIndex = slides.length }
//    for (i = 0; i < slides.length; i++) {
//        slides[i].style.display = "none";
//    }
//    for (i = 0; i < dots.length; i++) {
//        dots[i].className = dots[i].className.replace(" activeSlide", "");
//    }
//    slides[slideIndex - 1].style.display = "block";
//    dots[slideIndex - 1].className += " activeSlide";

//    if (slideIndex == 1 && slideIndex != null) {
//        video1.pause();
//        video1.currentTime = 0;
//        video1.play();
//    }
//    if (slideIndex == 2 && slideIndex != null) {
//        video2.pause();
//        video2.currentTime = 0;
//        video2.play();
//    }
//    if (slideIndex == 3 && slideIndex != null) {
//        video3.pause();
//        video3.currentTime = 0;
//        video3.play();
//    }
    
//}

//video1.onended = function () {
//    plusSlides(1);
//}
//video2.onended = function () {
//    plusSlides(1);
//}
//video3.onended = function () {
//    plusSlides(1);
//}






// Video Slide Youtube


// autoplay video
function onPlayerReady(event) {
    player.mute();
    event.target.playVideo();
}


function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        
        if (player.current_video == 2)
            player.current_video = 0;
        else
            player.current_video++;

        playVideo();
    }
}

var player = document.querySelector('iframe');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '500',
        width: '100%',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'autohide': 1,
            'showinfo': 0, // <- This part here
            'modestbranding' : 0,
            'wmode': 'opaque',
            'rel': 0,
            'loop': 1
        },
        videoId: 'c8E2j2slRk0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    // Create a property on the player object to keep track of the current video index
    player.current_video = 0;
}

$('[data-video]').click(function () {
    player.current_video = $(this).index();
    playVideo();
});

function playVideo() {
    var video_id = $('[data-video]').eq(player.current_video).attr('data-video');
    player.loadVideoById(video_id, 0, "large")
}