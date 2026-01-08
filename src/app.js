const express = require("express");

const { authAdmin } = require("./middlewere/auth");

const app = express();

app.use("/admin", authAdmin)

app.get("/admin/getAllDetails", (req, res) => {
    res.send('you have all data')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})