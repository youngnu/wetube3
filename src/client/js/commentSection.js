//videoContainer for dataset video._id 
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = document.querySelector("textarea");
const btn = document.querySelector("button")

const handleSubmit = (event) => {
    event.preventDefault();
    const videoId = videoContainer.dataset.id;
    const text = textarea.value;
    if(text === ""){
        return;
    }
    fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        //express에게 우리가 보내는 것이 json이라고 알려줘야 한다.
        headers: {
            "Content-Type": "application/json"
        },
        //object로 보내면 controller에서 req.body로 접근이 불가능하기에, JSON.Stringify({})로 객체정보를 전달
        body: JSON.stringify({ text })
    });
    textarea.value= "";
}


form.addEventListener("submit", handleSubmit);