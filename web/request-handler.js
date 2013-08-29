var fs   = require('fs');
var http = require("http");
var url  = require("url");
var path = require('path');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "text/plain"
};


var handlePOST = function(req, res){
  var fullFile = "";

  req.on("data", function(chunk){
    fullFile += chunk;
  });
  req.on("end", function(){
    var urlStuff = fullFile.split("=");

    fs.appendFile(module.exports.datadir, urlStuff[1] + "\n",function(err){

      if(err){
        res.writeHead(404,headers);
        res.end();
      } else {
        res.writeHead(302,headers);
        res.end();
      }
    });
  });
};

var handleGET = function(req,res){
  var pathname = url.parse(req.url,true,true).pathname;
  var toRead;
  if(pathname === '/'){
    toRead = __dirname + "/public/index.html";
  } else {
    toRead = path.dirname(__dirname) + "/data/sites" + pathname;
  }

  fs.readFile(toRead, function(err, data){
    if(err){
      res.writeHead(404,headers);
      res.end();
    } else {
      res.writeHead(200,headers);
      res.end(data);
    }
  });
};

module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

module.exports.handleRequest = function (req, res) {
  var urlDiscover = url.parse(req.url,true,true);
  //if get request run this
  if(req.method === 'GET'){
    handleGET(req,res);
  } else if (req.method === 'POST'){
    handlePOST(req,res);
  } else {
    res.writeHead(404,headers);
    res.end();
  }

  console.log(exports.datadir);
};
