# Notification API
Using websocket.io to notify a message.
You can also send a message by using http request or websocket

## Installing via npm

You can install Notification API into your project using
[npm](https://www.npmjs.com/). For existing applications you can run the following:

``` bash
$ git clone git@github.com:zvoanhkietz/socket_api.git
$ npm install
```

## Running via npm

``` bash
# for linux
$ PORT=80  npm start

# for window
$ set PORT=80 & npm start
```

## Get a token to authenticate

1. Request:
```
Method: POST
URL: /users/authenticate?username=username&password=1234
```

2. Response:
```js
{
   success: true,
   message: "Enjoy your token!",
   token: "eyJhbGciO..."
}
```

## Clients are waiting a notification

Client (index.html)
```html
<script src="{cdn}/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('connect', function(){
      socket.emit('lisenApp', {appId: 1234, username: 'aaaa'});
  });
  
  socket.on('updateInfo', (data) => {
      console.log(data)
  });
</script>
```

## Client using the http request to push a notification
For example I'm using jquery
```js
var token = "eyJhbGciO...";
// specify user to notify
$.post('http://localhost/api/v1/notification/emit?appId=1234&users[]=aaaa&token=' + token, {data: [{a:1}, {a:2}]}, (res) => {
  console.log(res);
});

// broadcast all of users in app
$.post('http://localhost/api/v1/notification/emit?appId=1234&token=' + token, {data: [{a:1}, {a:2}]}, (res) => {
  console.log(res);
});
```
