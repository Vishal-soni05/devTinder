const authAdmin = (req, res, next) => {
    const token = 'xyz';
    const isAdminauthrized = 'xyz' === token;
    if (!isAdminauthrized) {
        res.status(400).send("you are not authrized")
    }
    next();
}

module.exports = { authAdmin }