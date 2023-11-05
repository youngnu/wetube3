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
        //commentSection에서 json형식으로 text를 보내줬기에  req.body.text가 가능
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
    //우린 mongoose.Schema로 Video model을 만들어 줬고, Video model에는 comments요소를 array([])형식으로 만들어줬기에, []에 집어넣으려면 push()를 해줘야 한다.
    video.comments.push(comment._id);
    video.save();
    //json()메서드는 서버에서 클라이언트로 데이터를 전송할 때 주로 사용되는 메서드로, json형식의 데이터를 전송함.
    //json({newComment: comment._id})는 클라이언트가 생성된 댓글의 고유식별자(댓글 id)를 포함하는 JSON 객체를 반환합니다. 이것은 클라이언트가 이후에 댓글을 수정하거나 삭제하는 등의 작업을 할때 필요한 정보입니다
    return res.status(201).json({ newCommentId: comment._id})
} 

export const deleteComment = async (req, res) => {
    const {id} = req.params;
    const comment = await Comment.findById(id);
    //mongoose.Model로 Comment Schema를 설정할때 video를 넣어주었으며, populate를 통해 video와 comment의 관계를 설정해줬다.
    //handlewatch Function에서
    const videoId = comment.video
    const video = await Video.findById(videoId)
    //video.comments.splice(video.comments.indexOf(comment._id), 1)과 같은 기능을 수행해준다... 와우
    video.comments.pull(comment._id)
    await video.save()
    // Delete the comment from the database
    await Comment.deleteOne({_id: id})
    return res.sendStatus(201);
}