document.addEventListener('DOMContentLoaded',function() {
  var connection;

  var socket = function() {

    connection = new WebSocket('ws://localhost:4005/echo', ['soap', 'xmpp']);

    connection.onopen = function () {
      connection.send('Ping'); 
    };
    connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };
    connection.onmessage = function (e) {
      console.log('Server: ' + e.data);
    };

  };

  document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("loginpanel").style.display = "none";
    document.getElementById("chat").style.display = "block";
  });
  
  document.getElementById("loginpanel").style.display = "none";
  document.getElementById("chat").style.display = "block";

});
