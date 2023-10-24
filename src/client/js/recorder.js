const startBtn = document.getElementById("startBtn")
const video = document.getElementById("preview")

let stream;
let recorder

const handleStop = () => {
    startBtn.innerText = "Start Recording"
    startBtn.removeEventListener("click",handleStop)
    startBtn.addEventListener("click", handleStart)
    recorder.stop();
}


const handleStart = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false, video: {width: 1024, height: 576}
    });
    video.srcObject = stream;
    video.play()
    startBtn.innerText = "Stop Recording"
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop)
    recorder = new MediaRecorder(stream)
    recorder.ondataavailable = (event) => console.log("event", event)
    console.log("event1", recorder);
    recorder.start();
    console.log("event2", recorder);
}

startBtn.addEventListener("click", handleStart);