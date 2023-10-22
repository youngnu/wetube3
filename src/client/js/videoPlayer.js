const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

video.volume = 0.5

const handlePlayClick = () => {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    };
    playBtn.innerText = video.paused ? "Play" : "Pause";
}

const handleMute = () => {
    if(video.muted){
        video.muted = false
    } else {
        video.muted = true
    };
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : 0.5;
}

const handleVolumeChange = (event) => {    
    const { target : {value}} = event;
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute"
    }
    //video.volume is HTML element
    video.volume = value;
}


playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);