var fs = require("fs");
var url = require("url");
var path = require("path");
var http = require("http");

var filePath = path.dirname(path.dirname(__dirname)) + "/data/sites/";


exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, 'utf8', function(err, buffer){
    var data = buffer.split('\n');
    cb(data);
  });
};

exports.downloadUrls = function(urls){
  for (var i = 0; i < urls.length; i++) {
    downloadUrl(urls[i]);
  }
};

var downloadUrl = function(url){
  var options = {
    host: url,
    port: 80,
    method: 'GET'
  };

  http.get(options, function(res){
    var fullHTML = "";

    res.on('data', function(chunk){
      res.setEncoding('utf8');
      fullHTML += chunk;
    });

    res.on('end', function(){
      //now want to write "BODY" to file in sites with the file name matching the url
      //wite to file
      fs.writeFile(filePath + url, fullHTML, function(err){
        err && console.log(err);
      });

      console.log("done!");
    });
  });
};
