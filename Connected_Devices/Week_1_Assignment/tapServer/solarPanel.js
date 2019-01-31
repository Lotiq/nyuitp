var express = require('express');
var solarPanel = express();
var panelState = 'off';

function getTime(request,response){
  var now = new Date();

  response.send(now);
  response.end();
}

function togglePanelState(request,response){
  var newPanelState = request.params;
  console.log(newPanelState);
  response.send('there');
  response.end();
  //response.send(now);
  //response.end();
}

function checkPanelState(request,response){
  response.send('Here');
  response.end();
}

//server.get('/age',checkAge);
solarPanel.use('/',express.static('public'))
solarPanel.get('/states/:newstate', togglePanelState)
solarPanel.get('/state',checkPanelState);
solarPanel.listen(8080);
