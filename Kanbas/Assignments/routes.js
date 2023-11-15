import Database from "../../Database/index.js";

function AssignmentsRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const {cid} = req.params;
    console.log("Get all assignments for course: ", cid);
    const assignments = Database.assignments
    .filter((a) => a.course === cid);
    res.send(assignments);
  });
  app.get("/api/courses/:cid/assignments/:aid", (req, res) => {
    const {cid, aid} = req.params;
    console.log("Get assignment by id: ", aid, " for course: ", cid);
    const assignment = Database.assignments.find((a) => a._id === aid);
    res.send(assignment);
  });
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const {cid} = req.params;
    console.log("Create new assignment for course: ", cid);
    const assignment = req.body;
    Database.assignments.push(assignment);
    res.send(assignment);
  });
  app.put("/api/courses/:cid/assignments/:aid", (req, res) => {
    const {cid, aid} = req.params;
    console.log("Update assignment by id: ", aid, " for course: ", cid);
    const assignment = req.body;
    Database.assignments = Database.assignments.map(
        (a) => a._id === aid ? assignment : a);
    res.sendStatus(204);
  });
  app.delete("/api/courses/:cid/assignments/:aid", (req, res) => {
    const {cid, aid} = req.params;
    console.log("Delete assignment by id: ", aid, " for course: ", cid);
    Database.assignments = Database.assignments.filter(
        (a) => !(a.course === cid && a._id === aid));
    res.sendStatus(204);
  });
}

export default AssignmentsRoutes;