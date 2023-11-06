import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    //videoFile은 ㅣet으로 광역함수 되어 있으며, handleStart에서 URL.createObjectURL()을 이용하여 handleDownload로 넘겨짐
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

//ondataavailable은 recoder.stop()뒤에 만들어진 data를 이용가능하게 해준다. recorder.ondataavailable함수가 실행되면서 Blob이란 data파일(event.data)이 나온다.
//evet.data를 통해 Blob event를 받고, URL.creatObjcetURL(event.data)를 통해서 URL을 만들어주면 녹화파일을 사용할 수 있게 된다.
const handleStart = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false, video: {width: 1024, height: 576}
    });
    console.log("stream", stream);
    //srcObject는 보통 JS에서 미디어 요스 (audio, video)의 소스를 지정하는데 사용되는 소석입니다. 
    //이것은 미디어 요소에 미디어 스트림, 오디오 또는 비디오파일의 URL을 설정하고 재생할 때 사용합니다.
    video.srcObject = stream;
    video.play();
    console.log("video.srcObject", video.srcObject);
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream, { mimeType: "video/webm"});
    //ondataavailable은 MediaRecorder과 함께 사용되는 경우가 많으며, 미디어 스트림을 처리하거나 미디어 데이터를 수신하고 처리할때 사용됨
    //recorder.stop()이 실행되면 그 event를 받아 밑의 코드가 실행된다.
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
    recorder.start();
};

startBtn.addEventListener("click", handleStart);