import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "Join"})
};

export const postJoin = async (req, res) => {
    const {name, email, username, password, password2 } = req.body;
    await User.create({
        name,
        email,
        username,
        password,
    })
    return res.redirect("/login")
};

export const getLogin = (req, res) =>{
    return res.render("login", {pageTitle: "Login"})
}

export const handleLogout = (req, res) => {
    return res.send("I'm Logout 🤣")
};


export const handleUserEdit = (req, res) => {
    res.send("User Editing 👊🏻")
}