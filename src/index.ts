import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./db/models";
import routers from "./routes/web";

const app = express();

const port = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routers);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
