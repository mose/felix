
var connection = new WebSocket('ws://localhost:4005/echo', ['soap', 'xmpp']);

connection.onopen = function () {
  connection.send('Ping'); 
};
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};

var login = document.getElementById("login");
var chat = document.getElementById("chat");

login.onsubmit = function(e) {
  e.preventDefault();
  login.style.display = "none";
  chat.style.display = "block";
}

