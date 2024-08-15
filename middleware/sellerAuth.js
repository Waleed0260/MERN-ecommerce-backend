const {getUser} = require("../services/auth")

async function restrictSellerLoggedIn(req, res, next) {
    const userId = cookie.user.sellId;
    if (!userId) return res.redirect("/login")     
        const user = getUser(userId)
    if (!user) return res.redirect("login")
        req.user = user;
    next()
}
module.exports = {restrictSellerLoggedIn}