const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeValue = 0.5
video.volume = volumeValue

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
    //그렇다면 이곳에서 최신화된 volumeValue의 값으로 video.volume을 변경해줌 
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeChange = (event) => {    
    const { target : {value}} = event;
    //이 if조건문으로는 "Unmute"인 상태에서 즉 video.muted=true인 상태에서 input의 range를 움직였을 때 실행되는 영역만 정의해준 것이다.
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute"
    }
    // let을 이용해서 global variable을 설정해주고 "input" event가 발생하면, 이곳에서 global 변수의 value를 변경시켜줌
    volumeValue = value;
    //video.volume is HTML element
    video.volume = value;
}

const handleLoadedMetaData = () => {
    totalTime.innerText = Math.round(video.duration);
}

//이 상태로는 loadedmetadata event랑 timeupdate event가 같이 발생하지 않는 오류가 발생한다... 왜? 일시적인 현상이었던걸로.!
const handleTimeUpdate = () => {
    currentTime.innerText= Math.round(video.currentTime);
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate)