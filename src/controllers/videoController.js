export const handleHoem = (req, res) => {
    const videos = [1, 2, 3, 4, 5, 6]
    return res.render("home", {pageTitle: "HOME", videos})
};

export const handleWatchVideo = (req, res) => {
    return res.render("watch", {pageTitle: "Watch"})
};

export const search = (req, res) => {
    return res.render("search", {pageTitle: "Search"})
}

export const handleUpload = (req, res) => {
    res.send("Upload Your Videos 🤟")
}

export const handleEditVideo = (req, res) => {
    res.send("Edit Vdieos😁")
}

export const handleVideoDelete = (req, res) =>{
    res.send("Delete Videos 😎")
}