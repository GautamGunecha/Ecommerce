require("dotenv").config();
const app = require("express")();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const colors = require("colors");
const mongoose = require("mongoose");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
});

app.use(helmet());
app.use(xssClean());
app.use(hpp());
app.use(mongoSanitize());
app.use(limiter);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = process.env.MONGODB_URI;
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("connected to MongoDB".yellow)
);

// apis

app.get("/", (req, res) =>
{
    return res.send("Ecommerce Backend Server Connected.");
});

// Auth [All routes under auth directory working fine.]
app.use("/user", require("./routes/auth/userRoute"));
app.use("/admin", require("./routes/auth/adminRoute"));

// Products [Products:- Working Fine, Cart:-  ]
app.use("/products", require("./routes/product/productRoute"));
app.use("/cart", require("./routes/product/cartRoute"));

// Node Error Handler
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running at port: ${port}`.blue));