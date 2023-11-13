//multer은 Node.js 웹 애플리케이션에서 파일 업로드를 처리하기 위한 미들웨어임. express.js와 함께 자주사용되며, 클라이언트로부터 서버로 파일을 업로드하는 기능을 제공
import multer from "multer";
//multer-S3s는 Node.js 웹 애플리케이션에서 AWS에 파일을 업로드를 처리하기 위한 미들웨어이다.
//multer과 마찬가지로 express와 자주 쓰이며 , Router에 미들웨어를 전달해주는 것으로 실현된다. multer과 마찬기졸 req.file로 객체정보에 접근가능하다.
//그러나 경로부분은 조금 다르다. 일반서버에서 이뤄지는 multer의 경우 file.path로 경로확인 가능하지만,
//클라우드서버에서 이뤄지는 것이기에 경로는 file.location에 나타난다. 
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const isCloudtype = process.env.NODE_ENV === "production"

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    }
});

const s3VideoUploader = multerS3({
    s3: s3,
    bucket: 'wetube12/videos',
    acl: 'public-read'
})

const s3ImageUploader = multerS3({
    s3: s3,
    bucket: 'wetube12/images',
    acl: 'public-read'
})

export const localMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInUser = req.session.user || {}
    res.locals.isCloudtype = isCloudtype;
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
    dest: "uploads/avatars",
    storage: isCloudtype? s3ImageUploader: undefined
});

export const videoUpload = multer({
    dest: "uploads/videos",
    storage: isCloudtype? s3VideoUploader: undefined
});