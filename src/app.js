const express = require("express");

const connectDB = require('./config/database')
const bcrypt = require("bcrypt")
const User = require("./models/user");
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {

        const { firstName, emailId, password } = req.body;
        if (!emailId || !password || !firstName) {
            return res.status(400).json({
                message: "FirstName Email and password are required"
            });
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
            });
        }

        //  Check existing user
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Save user
        const user = new User({
            firstName,
            emailId,
            password: hashedPassword
        });
        await user.save();
        res.send("New Instence created!...")
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }

});

app.post("/login", async (req, res) => {
    try {

        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        //  Check if user exists
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        //  Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        } else {
            res.status(200).json({
                message: "Login successful",
            });
        }

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})


app.get("/user", async (req, res) => {
    // const user = req.body.emailId
    try {
        const users = await User.find({});
        res.send(users)
    } catch {
        res.status(404).send('something went wrong')
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId)
        res.send(user)
    } catch {
        res.status(404).send('something went wrong')
    }
});

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data)
        res.send(updatedUser)

    } catch {
        res.status(404).send('something went wrong')
    }
})



connectDB()
    .then(() => {
        console.log("DataBase connection established...");
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000')
        })
    })
    .catch(err => {
        console.log("Database cannot be connected", err)
    });


