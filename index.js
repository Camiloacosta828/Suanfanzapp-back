const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const personController = require("./api/PersonController")
const pool = require("./config/mysqldev");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type, Accept,Access-Control-Allow-Requested-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
  res.header("Allow", "GET,POST,OPTIONS,PUT,DELETE");
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('newMsg', (msg) => {
    console.log(`Emitiendo nuevo mensaje: ${msg.content}`);
    io.emit('newMsg', msg);
  });
});


http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

app.get('/person', personController.persons);
app.post('/person/login', personController.login);
app.post('/person/save', personController.save);

module.exports = app;