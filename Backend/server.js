const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const apiRouter = require('./api/api');

const app = express();
const PORT = process.env.PORT || 5555;
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', apiRouter);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connection to MongoDB established!"))
    .catch(error => console.error("❌ MongoDB Connection Failed:", error))

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
})