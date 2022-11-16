const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 3000;

const bookRouter = require("./routes/book");
const petRouter = require("./routes/pet");


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.q7c9cc6.mongodb.net/myBookStore?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/book", bookRouter);
app.use("/pet", petRouter);
app.listen(PORT, () => console.log(`App is running on ${PORT}`));