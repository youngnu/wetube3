let videos = [
    {
        title: "First Video",
        description: "Your are the best😉",
        createdAt: "2minutes ago",
        views: 30,
        id: 1
    },       
    {
        title: "Second Video",
        description: "OMG 🫣",
        createdAt: "2minutes ago",
        views: 400,
        id: 2 
    },
    {
        title: "Third Video",
        description: "This is crazy🤟",
        createdAt: "2minutes ago",
        views: 50,
        id: 3 
    },
    {
        title: "You are so cute 😍",
        description: "Your Very Sexy 😍",
        createdAt: "2minutes ago",
        views: 560,
        id: 4 
    },
]

export const handleHoem = (req, res) => {
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