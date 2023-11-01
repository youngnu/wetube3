//videoContainer for dataset video._id 
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = document.querySelector("textarea");
const btn = document.querySelector("button")

const handleSubmit = async (event) => {
    event.preventDefault();
    const videoId = videoContainer.dataset.id;
    const text = textarea.value;
    if(text === ""){
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        //express에게 우리가 보내는 것이 json이라고 알려줘야 한다.
        headers: {
            "Content-Type": "application/json"
        },
        //text가 아닌 {text}와 같은 object로 보내면 controller에서 req.body로 접근이 불가능하기에, JSON.Stringify({})로 문자열화하여 객체정보를 전달
        body: JSON.stringify({ text })
    });
    //async await와 함께 window.location.reload()를 쓰면 실시간 반응형 웹을 만들어 줄 수 있다.
    //그러나 window.location.reload()는 말그대로 페이지를 새로고침하는 방법이기때문에, 부하가 많이 걸린다.
    //그래서 JavaScript를 이용하여 fake Comment를 만들어 새로고침없이 내용들이 바로 반영될수 있도록 만들어준다.
    if(response.status === 201){
        textarea.value= "";
        //videoController(서버, 백엔드)에서 CommentSection(클라이언트, 프론트)로 넘겨준 json({newCommentId: comment._id})를 다시받아 해석해주는 부분
        //await response.json()은 서버로부터 받은 JSON형식의 응답 데이터를 해석하여 JS객체로 반환한다.
        const {newCommentId} = await response.json()
        addComment(text, newCommentId)
    }
};

const addComment = (text, id) => {
    //querySelector로 class를 선택할 땐 "."
    const videoComment = document.querySelector(".video_comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video_comment";
    //handleSubmit에서 addComment로 넘겨준 NewCommentId를 datatset.id를 통해 HTML요소 li에 할당
    newComment.dataset.id = id;
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = `${text}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(deleteBtn);
    videoComment.prepend(newComment);
};


form.addEventListener("submit", handleSubmit);