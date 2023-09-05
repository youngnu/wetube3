export const handleHoem = (req, res) => {
    const videos = [1, 2, 3, 4, 5, 6]
    return res.render("home", {pageTitle: "HOME", videos})
};

export const handleWatchVideo = (req, res) => {
    return res.send("Watch video 🤟")
};

export const search = (req, res) => {
    res.send("Search Videos!!")
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