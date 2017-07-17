var UpdateController = require("./updateController");

let u = new UpdateController();
u.installPackage("express").then((express) => {
  let app = express()
  app.get('/', function (req, res) {
    res.send('Hello World!');
  })

  let server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });

  setTimeout(()=>{
    console.log(app);
    server.close();
    /*app.close();
    app = null;
    */
    u.removePackage("express");
    console.log("REMOVING PACKAGES");
  },10000);
});