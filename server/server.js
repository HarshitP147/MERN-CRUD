import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import users from "./models/users.js";
import generateString from "./utilities/userId.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

console.clear();

app.listen(PORT, () => console.log(`App running on port:${PORT}`));

config();
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (err) => {
    throw err;
});

db.once("open", () => {
    console.log("Connected to database");
});

app.get("/", (req, res) => {
    res.send("Backend Express server running for the CRUD app");
});

const api = express.Router();
app.use("/api/", api);

api.get("/data", async (req, res) => {
    try {
        const data = await users.find();
        res.json(data);
    } catch (err) {
        res.send(500);
        throw err;
    }
});

api.post("/newData", async (req, res) => {
    const body = req.body;

    let email = "no-email-provided";
    if (body.email) {
        email = body.email;
    }

    const uId = generateString(9); // generate a 9 digit string id for each and every user

    const newUser = await users({
        name: body.name,
        user_id: uId,
        email: email,
    });

    try {
        const nUser = await newUser.save();
        res.status(201).send(nUser);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

api.put("/update/:user_id", async (req, res) => {
    const uId = req.params.user_id;
    const body = req.body;

    // so we set the query accordingly
    let newName = body["name"];
    let newEmail = body["email"];

    try {
        if (!newName && !newEmail) {
            // nothing is changed
            res.sendStatus(304);
        } else if (!newName) {
            // we have email changed
            const updateData = await users.where({ user_id: uId }).updateOne({
                email: newEmail,
            });
            let ack = updateData["acknowledged"];
            let st = 204;
            if (!ack) {
                st = 304;
            }
            res.sendStatus(st);
        } else if (!newEmail) {
            // we have name changed
            const updateData = await users.where({ user_id: uId }).updateOne({
                name: newName,
            });
            let ack = updateData["acknowledged"];
            let st = 204;
            if (!ack) {
                st = 304;
            }
            res.sendStatus(st);
        } else {
            // both are changed
            const updateData = await users
                .where({
                    user_id: uId,
                })
                .updateOne({
                    name: newName,
                    email: newEmail,
                });
            let ack = updateData["acknowledged"];
            let st = 204;
            if (!ack) {
                st = 304;
            }
            res.sendStatus(st);
        }
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

api.delete("/:user_id", async (req, res) => {
    const uid = req.params.user_id;
    try {
        const delUser = await users.deleteOne({
            user_id: uid,
        });
        res.status(201).send(delUser["acknowledged"]);
    } catch (err) {
        res.sendStatus(500);
    }
});
