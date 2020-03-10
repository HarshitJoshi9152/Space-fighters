const http = require("http");
const fs = require("fs");

const HOSTNAME = "127.0.0.1";
const PORT = 8080;

let gameServer = http.createServer((req, res)=>
{
    const { method, url } = req;

    console.log(`${method} request for ${url}`)

    if(url == "/")
    {
        index = fs.readFileSync("./index.html","utf8");
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");
        res.end(index);
    }
    else if(url == "/main.js")
    {
        script = fs.readFileSync("./main.js","utf8");
        res.statusCode = 200;
        res.setHeader("content-type", "text/js");
        res.end(script);
    }
    else if (url == "/player.js")
    {
        script = fs.readFileSync("./player.js","utf8");
        res.statusCode = 200;
        res.setHeader("content-type", "text/js");
        res.end(script);        
    }
    else if (url == "/bullet.js")
    {
        script = fs.readFileSync("./bullet.js","utf8");
        res.statusCode = 200;
        res.setHeader("content-type", "text/js");
        res.end(script);        
    }
    else
    {
        res.statusCode = 404;
        res.setHeader("content-type","text/html");
        res.end("not found");
    }

    // res.end(`<h1>${url} ${method}</h1>`);
})

gameServer.listen(PORT, HOSTNAME, ()=>
{
    console.log("Server is up and running on", HOSTNAME, "at", PORT);
})