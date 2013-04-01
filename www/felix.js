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