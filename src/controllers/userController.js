import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "Join"})
};

export const postJoin = async (req, res) => {
    const {name, email, username, password, password2 } = req.body;
    const usernameExist = await User.exists({username})
    const emailExist = await User.exists({email})
    if(password !== password2){
        return res.render("join", {pageTitle: "Join", errorMessage: "Password not Match"})
    }
    if(usernameExist){
        return res.status(400).render("join", {pageTitle: "Join", errorMessage: "username already exist"})
    };
    if(emailExist){
        return res.status(400).render("join", {pageTitle: "Join", errorMessage: "email already exist"})
    };
    try{
        await User.create({
            name,
            email,
            username,
            password,
        })
        return res.redirect("/login")
    }catch(error){
        return  res.status(400).render("join", {pageTitle: "Join", errorMessage : error._message})
    }
};

export const getLogin = (req, res) =>{
    return res.render("login", {pageTitle: "Login"})
}

export const postLogin = async (req, res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username, socialOnly:false});
    if(!user){
        return res.status(404).render("404", {pageTitle: "Wrong", errorMessage: "You need to Join"})
    };
    const passwordmatch = await bcrypt.compare(password, user.password)
    if(!passwordmatch){
        return res.status(404).render("404", {pageTitle: "Wrong", errorMessage: "Password confrim"})
    };
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/")
}

export const startGithubLogin = (req, res) => {
    const baseUrl =  "https://github.com/login/oauth/authorize"
    const config = {
        client_id: "8508aa87809e77889bfa",
        allow_signup: false,
        scope: "read:user user:email"
    }
    const params = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${params}`
    return res.redirect(finalUrl)
}

export const finshGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id: "8508aa87809e77889bfa",
        client_secret: "da158d214ed2ec119e73f0a265a0d274104e4a9d",
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${params}`
    const data = await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
    })
    const json = await data.json()
    console.log(json)
    if("access_token" in json){
        const {access_token} = json;
        const userRequest = await fetch("https://api.github.com/user",{
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
        })
        const userData = await userRequest.json()
        console.log(userData)
        const emailData = await(
            await fetch("https://api.github.com/user/emails", {
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
        })
        ).json()
        const emailObj = emailData.find(
            (email) => email.primary ===true && email.verified===true
        )
        if(!emailObj){
            return res.redirect("/login");
        }
       let user = await User.findOne({ email : emailObj.email})
        if(!user){
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                email: emailObj.email,
                username: userData.login,
                password: "",
                socialOnly: true,
            })        
        }
        req.session.user = user;//session을 이용하여 user정보 넣기
        req.session.loggedIn = true; //session을 이용하여 LoggedIn=true값 넣기
        return res.redirect("/")
    } else {
        return res.redirect("/login")
    }
};


export const handleLogout = (req, res) => {
    req.session.destroy()
    return res.redirect("/")
};


export const getEdit = (req, res) => {
    return res.render("edit-profile", {pageTitle: "Edit Profile"})
}

export const postEdit = async (req, res) => {
    const { user: {_id}} = req.session
    const {name, email, username} = req.body
    const updateUser = await User.findByIdAndUpdate(
        _id, 
        {
        name,
        email,
        username,
        },
        { new: true } // findbyidandupdate() give after update applied
    );
    req.session.user = updateUser
    return res.redirect("/users/edit") // do not render pug template
}