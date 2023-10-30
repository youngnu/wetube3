//videoContainer for dataset video._id 
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = document.querySelector("textarea");
const btn = document.querySelector("button")

const handleSubmit = (event) => {
    event.preventDefault();
    const videoId = videoContainer.dataset.id;
    const text = textarea.value;
    fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        body: text,
    });
}


form.addEventListener("submit", handleSubmit);