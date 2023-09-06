let videos = [
    {
        title: "First Video",
        description: "Your are the best😉",
        createdAt: "2minutes ago",
        views: 1,
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
    const {id} = req.params
    const video = videos[id-1]
    return res.render("watch", {pageTitle: `Watching ${video.title} video`, video})
};

export const search = (req, res) => {
    return res.render("search", {pageTitle: "Search"})
}

export const getEdit = (req, res) => {
    const {id} = req.params
    const video = videos[id-1]
    return res.render("edit", {pageTitle: "Editing", video})
}

export const postEdit = (req, res) => {
    console.log(req.body)    
}

export const handleUpload = (req, res) => {
    res.send("Upload Your Videos 🤟")
}


export const handleVideoDelete = (req, res) =>{
    res.send("Delete Videos 😎")
}