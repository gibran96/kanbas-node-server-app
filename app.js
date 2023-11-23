import express from 'express';
import HelloRoutes from "./Hello.js";
import cors from 'cors';
import Lab5 from "./Labs/Lab5.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import "dotenv/config.js";
import AssignmentsRoutes from "./Kanbas/Assignments/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import {MongoClient, ServerApiVersion} from "mongodb";

//mongoose.connect("mongodb://localhost:27017/kanbas");
const dbUrl = process.env.DB_CONNECTION_STRING
    || "mongodb://localhost:27017/kanbas";
mongoose.connect(dbUrl);
const app = express();
app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
}));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    secure: true,
    sameSite: "none"
  };
}
app.use(session(sessionOptions));
app.use(express.json());

CourseRoutes(app);
Lab5(app);
HelloRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);
UserRoutes(app);

const client = new MongoClient(
    dbUrl,
    {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ping: 1});
    console.log(
        "Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

app.listen(process.env.port || 4000, () => {
  console.log("Server is running...");
});