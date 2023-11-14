import Database from "../../Database/index.js";

function AssignmentsRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const {cid} = req.params;
    const assignments = Database.assignments
    .filter((a) => a.course === cid);
    res.send(assignments);
  });
}

export default AssignmentsRoutes;