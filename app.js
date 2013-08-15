
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')
  


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*
app.get('/', routes.index);
app.get('/users', user.list);
*/




var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

 io = io.listen(server);


app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});
app.get('/2', function (req, res) {
  res.sendfile(__dirname + '/index2.html');
});




// 連線
io.sockets.on('connection', function (socket) {
 
    // 偵聽 send 事件
    socket.on('send', function (data) {
 
        // 然後我們依據 data.act 做不同的動作
        switch ( data.act )
        {
            // 這個是使用者打開手機網頁後發生的事件
            case "enter":
            io.sockets.emit('get_response', data);
            console.log("Sending getEnter");
            break;
 
            // 這個是使用者在手機網頁中點擊按鈕，讓電腦網頁背景變色的事件
            case "changebg":
            io.sockets.emit('get_response', data);
            console.log("Sending changeBg");
            break;

            case "move_Right":
            io.sockets.emit('get_response', data);
            console.log("Sending move_Right");
            break;

            case "move_Left":
            io.sockets.emit('get_response', data);
            console.log("Sending move_Left");
            break;

            case "move_Up":
            io.sockets.emit('get_response', data);
            console.log("Sending move_Up");
            break;

            case "move_Down":
            io.sockets.emit('get_response', data);
            console.log("Sending move_Down");
            break;            

            case "rotate_r":
            io.sockets.emit('get_response', data);
            console.log("Sending rotate_r");
            break;               

            case "rotate_l":
            io.sockets.emit('get_response', data);
            console.log("Sending rotate_l");
            break;         


            case "auto":
            io.sockets.emit('get_response', data);
            console.log("Sending auto");
            break;  

            case "stop":
            io.sockets.emit('get_response', data);
            console.log("Sending stop");
            break;              
        }
 
    });
 
});


