var express = require('express');
var solarPanel = express();
var panelState = 'off';
var panelCount = 2;

function togglePanelState(request,response){
  var newPanelState = request.params.newState;
  if (newPanelState.toLowerCase() == "off" || newPanelState.toLowerCase() == "on"){
    panelState = newPanelState.toLowerCase();
    //console.log(newPanelState);
    response.send('The panel state was set to ' + panelState);
  } else {
    response.send('Incorrect parameter for panelState, try [on]/[off]');
  }
  response.end();
}

function checkPanelState(request,response){
  response.send('Current panel state is ' + panelState);
  response.end();
}

function powerInformation(request,response){
  if (panelState == 'on'){
    var power = Math.random()*50+50;
  }else{
    var power = 0;
  }
  var time  = new Date().toUTCString();
  response.send('The panel is generating ' + power.toFixed(1) + ' Watts as of ' + time);
  response.end();

}

function countInformation(request,response){
  response.send('The solar system consists of ' + panelCount + ' panels.');
  response.end();
}

solarPanel.use('/', express.static('public'));
solarPanel.get('/state/:newState', togglePanelState);
solarPanel.get('/state',checkPanelState);
solarPanel.get('/power',powerInformation);
solarPanel.get('/count',countInformation);

solarPanel.listen(8080, function(){
  console.log("Server has been started on " + this.address().port + " port.");
});
