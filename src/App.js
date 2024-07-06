const express = require("express");
const path = require("path");
const app = express();

require("./db/connect");
const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));

app.get("/", (req, res) => {
    res.sendFile(path.join(static_path, "index.html"));
});

app.post("/register", async (req, res) => {
    try {
        const { password, confirmpassword, firstname, lastname, email, gender } = req.body;
        console.log(req.body); 
        console.log(`Password: ${password}`);
        console.log(`Confirm Password: ${confirmpassword}`);
        
        if (password === confirmpassword) {
            const registerEmployee = new Register({
                firstname,
                lastname,
                email,
                gender,
                password,
                confirmpassword
            });
            const registered = await registerEmployee.save();
            res.status(201).sendFile(path.join(static_path, "index.html"));
        } else {
            res.status(400).send("Passwords do not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});
