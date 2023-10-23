const startBtn = document.getElementById("startBtn")
const video = document.getElementById("preview")


const handleStart = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false, video: {width: 1024, height: 576}
    });
    video.srcObject = stream;
    video.play()
}

startBtn.addEventListener("click", handleStart);