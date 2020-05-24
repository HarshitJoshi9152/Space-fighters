// codenotworking

const path = require("path");
const fs = require("fs");
log = console.log;
const names = [];

function collectFileNamesRecursively(path) {
  fs.readdir(path, (err, files) => {
    err ? log(err) : log(files);

    // replacing paths
    for (const index in files) {
      const file = files[index];
      files[index] = path.resolve(path, file);
    }
    for (let file of files) {
      fs.stat(file, (err, stat) => {
        err ? log(err) : null;
        if (stat.isDirectory()) {
          collectFileNamesRecursively(file);
        }
        names.push(file);
      });
    }
  });
}
collectFileNamesRecursively(path.join(__dirname, "../public"));

/**
 * C:\backup\Documents\html\javaScript\projects\space-fighters\debug\codenotworking.js:17
                        files[index] = path.resolve(path, file);
                                            ^

TypeError: path.resolve is not a function
    at fs.readdir (C:\backup\Documents\html\javaScript\projects\space-fighters\d
ebug\codenotworking.js:17:24)
    at FSReqWrap.oncomplete (fs.js:139:20)
 */
