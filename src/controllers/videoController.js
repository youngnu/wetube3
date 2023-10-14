import Video from "../models/Video";
import User from "../models/User"

export const handleHoem = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt: "desc"});
    return res.render("home", {pageTitle: "HOME", videos});
};

export const handleWatchVideo = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id).populate("owner");
    return res.render("watch", {pageTitle: video.title, video});
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = []
    if(keyword){
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i"),
            },
        })
    }
    return res.render("search", {pageTitle: "Search", videos});
};

export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    return res.render("edit", {pageTitle: "Editing", video});
};

export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id : id})
    if(!video){
        return res.render("404", {pageTitle: "video not found"});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
};

export const postUpload = async (req, res) => {
    const { _id } = req.session.user;
    // const { user: {_id}} = req.session과 같다
    const { path : fileUrl } = req.file
    const { title, description, hashtags } = req.body;
    const newVideo = await Video.create({
        title,
        fileUrl,
        description,
        hashtags: Video.formatHashtags(hashtags),
        meta: {
            views: 0
        },
        owner: _id
    });
    console.log(newVideo)
    const user = await User.findById(_id)
    user.videos.push(newVideo._id)
    user.save()
    return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params
    const video = await Video.findById(id)
    if(!video){
        return res.status(404).render("404", {pageTitle: "Video is not found"})
    };
    await Video.findByIdAndDelete(id);
    return res.redirect('/')
}