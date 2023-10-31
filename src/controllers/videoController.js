import Video from "../models/Video";
import User from "../models/User"
import Comment from "../models/Comment"

export const handleHoem = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt: "desc"}).populate("owner");
    return res.render("home", {pageTitle: "HOME", videos});
};

//populate()메서든 두 schema사이의 관계를 설정할때 사용하며, populate()안의 인수는 해당 model을 보면 된다. 지금 Video 모델에서는 "owner"도 "comments"도 schema의 필드로 들어가 있다.
//watch.pug로 렌더링 해주면서 video를 보내주고 있다. 여기에는 populate되어 있는 owner정보와 comments에 대한 정보도 포함되어있다.
//그 결과 watch.pug에서는 video.owner과 video.comments를 쓸 수 있다.
export const handleWatchVideo = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id).populate("owner").populate("comments");
    console.log(video)
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

export const createComment = async (req, res) => {
    const {
        params: {id},
        body: {text},
        session: {user}
    } = req;
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        owner: user._id,
        video: id
    })
    video.comments.push(comment._id);
    video.save();
    return res.sendStatus(201);
} 