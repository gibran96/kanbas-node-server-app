import Database from "../../Database/index.js";

function CourseRoutes(app) {
  app.get("/api/courses/:id", (req, res) => {
    const id = req.params.id;
    const course = Database.courses.find((course) => course._id === id);
    res.send(course);
  });
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });
  app.post("/api/courses", (req, res) => {
    const course = req.body;
    Database.courses.push(course);
    res.send(course);
  });
  app.delete("/api/courses/:id", (req, res) => {
    const id = req.params.id;
    Database.courses = Database.courses.filter((course) => course._id !== id);
    res.sendStatus(204);
  });
  app.put("/api/courses/:id", (req, res) => {
    const id = req.params.id;
    const course = req.body;
    Database.courses = Database.courses.map(
        (c) => course._id === id ? {c, ...course} : c);
    res.sendStatus(204);
  });
}

export default CourseRoutes;