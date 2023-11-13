import Database from "../../Database/index.js";

function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", (req, res) => {
    const {cid} = req.params;
    const modules = Database.modules
    .filter((m) => m.course === cid);
    res.send(modules);
  });
  app.post("/api/courses/:cid/modules", (req, res) => {
    const {cid} = req.params;
    const module = req.body;
    Database.modules.push({
      ...module,
      course: cid,
      _id: (Database.modules.length + 1).toString()
    });
    res.send(module);
  });
  app.post("/api/courses/:cid/modules/weeks", (req, res) => {
    const {cid} = req.params;
    const week = req.body;
    Database.modules = Database.modules.map((module) => {
      if (module.course === cid) {
        return {
          ...module,
          weeks: [
            ...module.weeks,
            week
          ]
        }
      }
      return module;
    });
    res.send(week);
  });
  app.delete("/api/modules/:mid/:index", (req, res) => {
    const {mid, index} = req.params;
    Database.modules = Database.modules.map((module, moduleIndex) => {
      if (module._id === mid) {
        return {
          ...module,
          weeks: [
            ...module.weeks.slice(0, index),
            ...module.weeks.slice(index + 1),
          ]
        }
      }
      return module;
    });
    res.sendStatus(204);
  });
  app.put("/api/modules/:mid/:index", (req, res) => {
    const {mid, index} = req.params;
    Database.modules = Database.modules.map((module, moduleIndex) => {
      if (module._id === mid) {
        return {
          ...module,
          weeks: module.weeks.map((week, weekIndex) => {
            if (weekIndex === index) {
              return req.body;
            }
            return week;
          })
        }
      }
      return module;
    });
    res.send(req.body);
  });
}

export default ModuleRoutes;