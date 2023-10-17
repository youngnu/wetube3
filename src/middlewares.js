import multer from "multer";

export const localMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInUser = req.session.user || {}
    next()
};

export const protectorMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return res.redirect("/")
    } else {
        return next()
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next()
    } else {
        return res.redirect("/")
    }
};

export const avatarUpload = multer({
    dest: "uploads/avatar"
})

export const videoUpload = multer({
    dest: "uploads/videos"
})