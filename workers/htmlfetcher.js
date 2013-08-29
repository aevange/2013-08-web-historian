// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var fs = require("fs");
var url = require("url");
var path = require("path");
var helpers = require("./lib/html-fetcher-helpers");

var filePath = path.join(path.dirname(__dirname), "/data/sites.txt");


helpers.readUrls(filePath, helpers.downloadUrls);


//* * * * * /Users/hackreactor/.nvm/v0.10.16/bin/node /Users/hackreactor/code/aevange/2013-08-web-historian/workers/htmlfetcher.js