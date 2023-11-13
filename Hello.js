function HelloRoutes(app) {
  app.get('/', (req, res) => {
    res.send('Welcome to web development');
  });

  app.get('/about', (req, res) => {
    res.send('This is about page');
  });

  app.get('/hello', (req, res) => {
    res.send('Hello World!');
  });
}

export default HelloRoutes;