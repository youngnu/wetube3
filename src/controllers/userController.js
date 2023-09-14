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
    const user = await User.findOne({username});
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

export const handleLogout = (req, res) => {
    return res.send("I'm Logout 🤣")
};


export const handleUserEdit = (req, res) => {
    res.send("User Editing 👊🏻")
}