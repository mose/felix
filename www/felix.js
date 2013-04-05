document.addEventListener('DOMContentLoaded',function() {

    var loginform = document.getElementById("login"),
        loginpanel = document.getElementById("loginpanel"),
        chatpanel = document.getElementById("chat"),
        inputline = document.getElementById("inputline"),
        welcome = document.getElementById("welcome"),
        conn = {},
        entities = { '<' : '&lt;', '>' : '&gt;', '&' : '&amp;' };

  if (window.MozWebSocket) {
    window.WebSocket = window.MozWebSocket;
  }

  function openConnection(login) {
    console.log(conn);
    if (conn.readyState === undefined || conn.readyState > 1) {
      conn = new WebSocket('ws://localhost:4005');    
      conn.onopen = function () {
        welcome.textContent = "Server is available.";
      };
      conn.onmessage = function (e) {
        var message = JSON.parse(e.data);
        console.log(message);
      };
      conn.onclose = function (e) {
      };
      conn.onerror = function(err) {
        removeEvent(loginform, 'submit');
        welcome.textContent = "Server is not available.";
      }
    }
  }

  if (window.WebSocket === undefined) {
    loginform.innerHTML("Your browser is not compatible with websockets. Please upgrade.");
  } else {
    addEvent(loginform, 'submit', function (e) {
      e.preventDefault();
      if (conn.readyState === 1) {
        loginpanel.style.display = "none";
        chatpanel.style.display = "block";
        inputline.focus();
      }
    });

    openConnection();  
  }

});
