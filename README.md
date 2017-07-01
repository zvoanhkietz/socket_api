# Notification API
Api notification using websocket.io to notify.
You can send message by http request or websocket

## Installing Notification API via npm

You can install Notification API into your project using
[npm](https://www.npmjs.com/). For existing applications you can run the following:

``` bash
$ git clone git@github.com:zvoanhkietz/socket_api.git
$ npm install
```

## Starting Notification API via npm

``` bash
// for linux
$ PORT=80  npm start

// for window
$ set PORT=80 & npm start
```

## Get token

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

## Client waiting a notification

Client (index.html)
```html
<script src="{cdn}/socket.io/socket.io.js"></script>
<script>
  var socket = io('http://localhost');
  var socket = io.connect('http://localhost');

  socket.on('connect', function(){
      socket.emit('lisenApp', {appId: 1234, username: 'aaaa'});
  });
  
  socket.on('updateInfo', (data) => {
      console.log(data)
  });
</script>
```

## Client using API push a notification
For example: I'm using jQuery
```js
// specify user to notify
$.post('http://localhost/api/v1/notification/emit?appId=1234&users[]=aaaa', {data: [{a:1}, {a:2}]}, (res) => {
  console.log(res);
});

// broacast all of user in app
$.post('http://localhost/api/v1/notification/emit?appId=1234', {data: [{a:1}, {a:2}]}, (res) => {
  console.log(res);
});
```
