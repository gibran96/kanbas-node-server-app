import express from 'express';
import HelloRoutes from "./Hello.js";
import cors from 'cors';
import Lab5 from "./Labs/Lab5.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import "dotenv/config.js";

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));
app.use(express.json());

CourseRoutes(app);
Lab5(app);
HelloRoutes(app);
ModuleRoutes(app);
app.listen(process.env.port || 4000);