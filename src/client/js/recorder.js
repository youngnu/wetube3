const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
    startBtn.innerText = "Recording Again"
    startBtn.removeEventListener("click", handleDownload)
    startBtn.addEventListener("click", handleStart)
};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click",handleStop);
    startBtn.addEventListener("click", handleDownload);
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
    recorder = new MediaRecorder(stream, { mimeType: "video/webm"});
    recorder.ondataavailable = (event) => {
        console.log("event", event);
        console.log("evet.data", event.data);
        videoFile = URL.createObjectURL(event.data);
        console.log("videoFile", videoFile)
        console.log("video.srcObject", video.srcObject)
        // 미디어장치와의 연결을 끊기
        video.srcObject = null
        console.log("video.srcObject", video.srcObject)
        console.log("video.src", video.src)
        // 비디어 요소와 vidoeFile의 blob URL을 연결하여 비디오 재생
        video.src = videoFile
        console.log("video.src", video.src)
        //반복해서 recorder 재생
        video.loop = true 
        video.play()
    }
    console.log("event1", recorder);
    recorder.start();
    console.log("event2", recorder);
};

startBtn.addEventListener("click", handleStart);