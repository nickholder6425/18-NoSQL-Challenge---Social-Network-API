const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// if MONGODB_URI exists, connect to that DB
// otherwise short-circuit to local MongoDB server's DB
// MongoDB finds and connects to DB if exists or creates if it doesn't
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,  // Deprecated option, but may be needed for older versions of Mongoose
    useCreateIndex: true,
});


// log mongo queries being executed
mongoose.set("debug", true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));