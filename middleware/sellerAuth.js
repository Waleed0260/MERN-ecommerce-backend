const {getUser} = require("../services/auth")

async function restrictSellerLoggedIn(req, res) {
    const userId = req.cookies.sellId;
    if (!userId) return res.redirect("/login")     
        const user = getUser(userId)
    if (!user) return res.redirect("login")
        req.user = user;
}
module.exports = {restrictSellerLoggedIn}