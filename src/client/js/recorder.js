const startBtn = document.getElementById("startBtn")


const handleStart = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false, video: {width: 1024, height: 576}
    });
}

startBtn.addEventListener("click", handleStart);