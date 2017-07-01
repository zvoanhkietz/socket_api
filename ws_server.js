var event = require('./libs/event_emitter');
function SocketServer(server) {
    var _io = require('socket.io')(server);
    var _clients = {};

    // on connection
    _io.on('connection', (socket) => {
        socket.on('lisenApp', (data) => {
            var username = data.username;
            var roomId = data.appId;
            socket.username = username;
            socket.room = roomId;
            socket.join(roomId);
            _clients[username] = {
                socketId: socket.id,
                roomId: roomId
            };
        });
    });

    // on connection
    _io.on('disconnect', (socket) => {
        socket.leave(socket.room);
        delete _clients[socket.username];
    });

    // api emit data to client
    event.get('emit.notification').subscribe((appId, users, data) => {
        var socket;
        if (users && users.length > 0) {
            users.forEach((user) => {
                if (user in _clients) {
                    var userInfor = _clients[user];
                    if (userInfor.roomId == appId) {
                        socket = _io.to(userInfor.socketId);
                    }
                }
            });
        } else {
            socket = _io.sockets.in(appId);
        }

        if (socket) {
            socket.emit('updateInfo', data);
        }
    });

}
module.exports = SocketServer;