var electron = require('electron');
var browserWindows = electron.BrowserWindow;
var app = electron.app;


app.on('ready', function(){
    var appWindow;
    appWindow = new browserWindows();
    appWindow.loadURL('http://raybo.org');
}); 