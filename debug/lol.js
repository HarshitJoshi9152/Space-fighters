const http = require("http");
const fs = require("fs");
const path = require("path");
const events = require("events");
// const chalk = require('chalk');

const PORT = process.env.PORT || 8080;
const HOSTNAME = "127.0.0.1";
const blockedURLs = ["/favicon.ico"];

const log = console.log;

const loader = new events.EventEmitter();

http
  .createServer((req, res) => {
    log(`${req.method} request for ${req.url}`);

    if (blockedURLs.includes(req.url)) {
      res.writeHead(404, "not found");
      res.end();
    }
    // response code

    // if(filePaths.includes(req.url)){
    // 	// we will have to use resourcesToLoad list.
    // 	let ext = /(?!.*[.](?:html|class|js|css)$).*/.exec(req.url)[0]
    // 	// let ext = req.url.match(/^(.*\.(?!(htm|html|class|js)$))?[^.]*$/i);
    //	log(ext, 'lolloololololo')
    //	res.writeHead(200, {'content-type':`text/${ext}`});
    //	res.end(loadedResources[filePaths.indexOf(req.url)])
    // }

    // parse url and passing the pathname
    const index = checkForExistence(req.url);
    if (index) {
      // code
      let ext = /(?!.*[.](?:html|class|js|css)$).*/.exec(req.url)[0];
      log(ext, "lolloololololo");
      res.writeHead(200, { "content-Type": `${ext}` });
      res.end(loadedResources[index].data);
    } else {
      res.writeHead(200, "OK", { "content-type": "text/html" });
      res.end("Hi");
    }
  })
  .listen(PORT, HOSTNAME, () => {
    log("Server is up and running on", HOSTNAME, "at", PORT);
    log(
      `\x1b[91mVisit ${HOSTNAME + ":" + PORT} to play space-fighters.\x1b[0m`
    );
  });

const resourcesToLoad = [];
const filePaths = [];
const loadedResources = [];

function checkForExistence(url) {
  // what if there is a hash at the end of the url or query parameters
  // for (const i in resourcesToLoad) {
  // 	if (resourcesToLoad.hasOwnProperty(i)) {
  // 		const name = resourcesToLoad[i];
  // 		if (name.endsWith(url)) {
  // 			log(name, 'somethign ')
  // 			return i;
  // 		}
  // 	}
  // }
  for (let i = 0; i < loadedResources.length; i += 2) {
    log(loadedResources[i]);
    const fileObj = loadedResources[i];
    with (fileObj) {
      if (fileName.endsWith(url)) {
        log(fileName, "somethign ");
        return i + 1;
      }
    }
  }
  return false;
}

// loading
function lol(folder = "") {
  fs.readdir(
    path.resolve(__dirname, `public/${folder + "/"}`),
    (err, files) => {
      err ? log(err) : log(files);

      for (let file of files) {
        fs.stat(__dirname + `/public/${folder + "/"}` + file, (err, stat) => {
          err ? log(err) : null;

          if (stat.isDirectory()) {
            lol(file);
            // recursively call this function again
            return;
          }
          resourcesToLoad.push(__dirname + `/public/${folder + "/"}` + file);
        });
      }
    }
  );
}
lol();

function loadResource(pathURl) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathURl, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function loadAllResources(resourcesToLoad) {
  return new Promise((resolve) => {
    promisesList = [];
    for (const i in resourcesToLoad) {
      promisesList.push(
        new Promise((resolve, reject) => {
          if (resourcesToLoad.hasOwnProperty(i)) {
            const fileName = resourcesToLoad[i];
            loadResource(fileName).then(
              (data) => {
                resolve({
                  data,
                  fileName,
                });
                // loadedResources.push(data)
              },
              (err) => {
                reject(err);
              }
            );
          }
        })
      );
    }
    resolve(promisesList);
  });
}

loader.once("start loading", () => {
  loadAllResources(resourcesToLoad).then(
    Promise.all(promisesList).then((fileObj) => {
      log(fileObj.data, fileObj.fileName);
      loadedResources.push(fileObj.fileName);
      loadedResources.push(fileObj.data.toString());
    })
  );
});

processedNames = false;
setInterval(() => {
  if (resourcesToLoad.length === 6 && !processedNames) {
    loader.emit("start loading");
    for (const i in resourcesToLoad) {
      // we are looping over resourcesToLoad therefore filePaths will have same indexes as resourcesToLoad
      if (resourcesToLoad.hasOwnProperty(i)) {
        const name = resourcesToLoad[i];
        filePaths.push(name.slice(name.lastIndexOf("/")));
      }
    }
    processedNames = true;
    log(filePaths);
  }
}, 100);
