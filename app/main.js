var electron = require('electron');
var browserWindows = electron.BrowserWindow;
var app = electron.app;

var ipc = electron.ipcMain;


app.on('ready', function(){
    var appWindow, infoWindow;
    appWindow = new browserWindows({
        show: false
    });

    appWindow.loadURL('file://' + __dirname + '/index.html');
    //appWindow.setMenu(null);

    infoWindow = new browserWindows({
        width: 400,
        height: 300,
        frame: false,
        transparent: true,
        show: false
    });

    infoWindow.loadURL('file://' + __dirname + '/info.html');

    appWindow.once('ready-to-show', function(){
        appWindow.show();
    });

    ipc.on('closeInfoWindow', function(event, arg){
        event.returnValue = '';
        infoWindow.hide();
    });
}); 