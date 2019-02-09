var express = require('express')
var server = express()

server.listen(8080);                        // listen for HTTP
server.use('/',express.static('public'));
