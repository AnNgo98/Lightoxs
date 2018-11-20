// tiếp theo và quay lại 
  var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  
  x[slideIndex-1].style.display = "block";  
  
}
var myIndex=0;
function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 2}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 4000); // Change image every 2 seconds
  // settime out là không lưu lại bước đi 
  // set interval    
}



// End // tiếp theo và quay lại 
// video //
// autoplay video
function onPlayerReady(event) {
  player.mute();
  event.target.playVideo();
}


function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    player.current_video++;
    if (player.current_video==4)
    {
      carousel();
    }
    else 
    {
      	playVideo();
    }
    
  }
}

var player = document.querySelector('player');

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
      videoId: 'wcJOo2t6rfw',
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