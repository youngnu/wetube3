const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;

const handleStop = () => {
    startBtn.innerText = "Start Recording";
    startBtn.removeEventListener("click",handleStop);
    startBtn.addEventListener("click", handleStart);
    recorder.stop();
};

//ondataavailable은 recoder.stop()뒤에 만들어진 data를 이용가능하게 해준다. recorder.ondataavailable함수가 실행되면서 Blob이란 파일이 나온다.
//evet.data를 통해 Blob event를 받고, URL.creatObjcetURL(event.data)를 통해서 URL을 만들어주면 녹화파일을 사용할 수 있게 된다.
const handleStart = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false, video: {width: 1024, height: 576}
    });
    video.srcObject = stream;
    video.play();
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        console.log("event", event);
        console.log("evet.data", event.data);
        const video = URL.createObjectURL(event.data);
        console.log("video", video)
    }
    console.log("event1", recorder);
    recorder.start();
    console.log("event2", recorder);
};

startBtn.addEventListener("click", handleStart);