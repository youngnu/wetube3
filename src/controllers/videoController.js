import Video from "../models/Video";
import User from "../models/User"

export const handleHoem = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt: "desc"}).populate("owner");
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
        }).populate("owner")
    }
    return res.render("search", {pageTitle: "Search", videos});
};

export const getEdit = async (req, res) => {
    const {id} = req.params;
    const {user: {_id}} = req.session;
    const video = await Video.findById(id);
    if(String(video.owner) !== String(_id)){
        req.flash ("error", "Login first")
        return res.status(403).redirect("/")
    }
    return res.render("edit", {pageTitle: "Editing", video});
};

export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {user: {_id}} = req.session;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id : id})
    if(!video){
        return res.render("404", {pageTitle: "video not found"});
    }
    if(String(video.owner) !== String(_id)){
        req.flash("error", "Login First")
        return res.status(403).redirect("/") 
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
    const user = await User.findById(_id)
    user.videos.push(newVideo._id)
    user.save()
    req.flash("success", "upload success")
    return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const {user: {_id}} = req.session;
    const video = await Video.findById(id)
    if(!video){
        return res.status(404).render("404", {pageTitle: "Video is not found"})
    };
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/")
    }
    await Video.findByIdAndDelete(id);
    req.flash("success", "Delete Success")
    return res.redirect('/')
};

//이 방식만으로는 video.meta.views에 +1을 해주진 못한다. 왜일까? 그건 바로 post Request를 못보내주고 있기 때문이다. apiRouter의 URL을 살펴봐라
export const registerView = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    };
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
}