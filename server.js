const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());


const config = require('./config');
const user = require('./routes/users');
const bus = require('./routes/buses');
const image = require('./routes/images');
const route = require('./routes/routes');
const ticket = require('./routes/tickets');
const auth = require("./routes/auth");

mongoose
    .connect("mongodb+srv://root:admin1234@cluster0-uxiso.mongodb.net/Atlas?retryWrites=true", { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to db');
    });

app.listen(config.port, () => {
    console.log(`Server is running at ${config.port}`);
});

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/buses", bus);
app.use("/api/images", image);
app.use("/api/routes", route);
app.use("/api/tickets", ticket);

