
var exec = require('child_process').exec;
var resolveP = require('resolve');


class UpdateController {



  constructor() {
    this.package = null;

  }

  installPackage(name) {
    let that = this;
    return new Promise(function (resolve, reject) {
      that.execConsoleCommand('npm install ' + name).then(
        () => {
          that.package = require(name);
          resolve(that.package);
        })

    });

  }

  removePackage(name) {
    let that=this;
    return new Promise(function (resolve, reject) {
      var path = resolveP.sync(name)
      console.log("Path to module found:", path);
      if (require.cache[path]) {
        delete require.cache[path];
        that.execConsoleCommand('npm remove ' + name).then(() => {
          that.package = null;
          resolve(name);
        });
      }
    });

  }


  execConsoleCommand(command) {
    return new Promise(function (resolve, reject) {
      let v;
      v = exec(command, (error, stdout, stderr) => {

        if (error !== null) {
          console.log('exec error ' + error);
          reject(false);
        } else {
          console.log("-------- OUTPUT --------\n", stdout, "\n-------- ERRORS --------\n", stderr, "\n----------------");
          //this.package = require(name);
          resolve(true);
        }
      });

    });
  }

}

module.exports = UpdateController;
