export const localMiddleware = (req, res, next) => {
    console.log(req.session)
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInuUser = req.session.user
    next()
}