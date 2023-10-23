const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");


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
    } 
    // let을 이용해서 global variable을 설정해주고 "input" event가 발생하면, 이곳에서 global 변수의 value를 변경시켜줌
    volumeValue = value;
    //video.volume is HTML element
    video.volume = value;
    //이 조건문으로 Input event 발생되중 video.volume의 값이 0이 되면 더이상 handleMute에 대한 click event가 발생하지 않도록 했다.
    if(video.volume === 0){
        muteBtn.innerText = "Unmute";
        muteBtn.removeEventListener("click", handleMute);
    } else {
        muteBtn.innerText = "Mute";
        muteBtn.addEventListener("click",handleMute);
    }
}

const formatTime = (seconds) => {
    return new Date(seconds*1000).toISOString().substring(11, 19)
}

const handleLoadedMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeLine.max = Math.floor(video.duration);
}

//이 상태로는 loadedmetadata event랑 timeupdate event가 같이 발생하지 않는 오류가 발생한다... 왜? 일시적인 현상이었던걸로.!
const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime);
}

const handleTimeLineUpdate = (event) =>{
    const {target: { value }} = event;
    video.currentTime = value;
}

const handleFullScreen = ( ) => {
    const fullScreen = document.fullscreenElement;
    if(fullScreen){
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screen"
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen"
    }
};

const handleMouseMove = () => {
    videoControls.classList.add("showing")
};

const handleMouseLeave = () => {
    setTimeout(()=>{
        videoControls.classList.remove("showing")
    }, 3000)
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate)
timeLine.addEventListener("input", handleTimeLineUpdate);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoControls.addEventListener("mousemove", handleMouseMove);
videoControls.addEventListener("mouseleave", handleMouseLeave);