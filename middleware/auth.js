const {getUser} = require("../services/auth")

async function restrictUserLoggedIn(req, res, next) {
    const userId = cookie.user.uid;
    if (!userId) return res.redirect("/login")     
        const user = getUser(userId)
    if (!user) return res.redirect("login")
        req.user = user;
    next()
}
module.exports = {restrictUserLoggedIn}