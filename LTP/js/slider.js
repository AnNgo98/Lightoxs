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
            'autoplay': 0,
            'controls': 1,
            'autohide': 1,
            'showinfo': 0, // <- This part here
            'modestbranding' : 0,
            'wmod': 'opaque',
            rel: 0
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