document.addEventListener('DOMContentLoaded',function() {

    var loginform = document.getElementById("login"),
        loginpanel = document.getElementById("loginpanel"),
        chatpanel = document.getElementById("chat"),
        inputline = document.getElementById("inputline"),
        welcome = document.getElementById("welcome"),
        messagesboard = document.getElementById("messages"),
        rooms = { central: document.getElementById("central_room") },
        conn = {};

  if (window.MozWebSocket) {
    window.WebSocket = window.MozWebSocket;
  }

  function sanitize(s) {
    entities = { '<' : '&lt;', '>' : '&gt;', '&' : '&amp;' };
    return s.replace(/[<>&]/g, function (m) { return entities[m]; });
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

        newline = document.createElement("div");
        addClass(newline,"line");
        if (data.type === 0) {
          addClass(newline,"system");
        } else {
          time = document.createElement("span");
          addClass(time,"timestamp");

        }

        t = new Time;
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
