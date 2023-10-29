const form = document.getElementById("commentForm");
const textarea = document.querySelector("textarea");
const btn = document.querySelector("button")

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(textarea.value)
}


form.addEventListener("submit", handleSubmit);