//multer은 Node.js 웹 애플리케이션에서 파일 업로드를 처리하기 위한 미들웨어임. express.js와 함께 자주사용되며, 클라이언트로부터 서버로 파일을 업로드하는 기능을 제공
import multer from "multer";

export const localMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInUser = req.session.user || {}
    next()
};

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return next()
    } else {
        req.flash("error", "Your're Not Login")
        return res.redirect("/")
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next()
    } else {
        req.flash("info", "Logout Please")
        return res.redirect("/")
    }
};

export const avatarUpload = multer({
    dest: "uploads/avatars"
})

export const videoUpload = multer({
    dest: "uploads/videos"
})