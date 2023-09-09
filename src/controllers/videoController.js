import Video from "../models/Video"

export const handleHoem = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", {pageTitle: "HOME", videos})
};

export const handleWatchVideo = async (req, res) => {
    const {id} = req.params
    const video = await Video.findById(id)
    return res.render("watch", {pageTitle: `Watching ${video.title} video`, video})
};

export const search = (req, res) => {
    return res.render("search", {pageTitle: "Search"})
}

export const getEdit = async (req, res) => {
    const {id} = req.params
    const video = await Video.findById(id)
    return res.render("edit", {pageTitle: "Editing", video})
}

export const postEdit = async (req, res) => {
    const {id} = req.params
    const {title, description, hashtags} = req.body
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags
    })
    return res.redirect("/")   
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"})
}

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const video = await Video.create({
        title,
        description,
        hashtags,
        meta: {
            views: 0
        }
    });
    console.log(video);
    return res.redirect("/")
}

export const handleVideoDelete = (req, res) =>{
    res.send("Delete Videos 😎")
}