export const localMiddleware = (req, res, next) => {
    console.log(req.session)
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInUser = req.session.user
    next()
}