document.addEventListener('DOMContentLoaded',function() {

    var loginform = document.getElementById("loginform"),
        loginpanel = document.getElementById("loginpanel"),
        logininput = document.getElementById("logininput"),
        username = document.getElementById("username"),
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
      conn = new WebSocket('ws://localhost:4005', ['soap', 'xmpp']);

      conn.onopen = function () {
        conn.send('Ping');
        welcome.textContent = "Server is available.";
      };

      conn.onmessage = function (e) {
        console.log('Server: ' + e.data);
        var message = JSON.parse(e.data);
        newline = document.createElement("div");
        addClass(newline,"line");
        if (e.data.type === 0) {
          addClass(newline,"system");
        }
        time = document.createElement("span");
        addClass(time,"timestamp");
        t = new Date().getTime();
        time.appendChild(document.createTextNode(t));
        newline.appendChild(time);
        messagesboard.getElementById("central_room").appendChild(newline);
      };

      conn.onclose = function (e) {

      };

      conn.onerror = function(err) {
        logininput.style.display = "none";
        removeEvent(loginform, 'submit');
        welcome.textContent = "Server is not available.";
        console.log('WebSocket Error ' + err);
      }

    }
  }

  if (window.WebSocket === undefined) {
    loginform.innerHTML = "Your browser is not compatible with websockets. Please upgrade.";
  } else {
    addEvent(loginform, 'submit', function (e) {
      e.preventDefault();
      if (!(/^[-_\.a-z0-9]{2,}$/i).test(username.value)) {
        welcome.innerHTML = "Your User Name needs to be alphanumeric, without space of weird characters.";
      } else {
        console.log(conn);
        if (conn.readyState === 1) {
          loginpanel.style.display = "none";
          chatpanel.style.display = "block";
          inputline.focus();
        }
      }
    });
    addEvent(inputline, 'keydown', function (e) {
      var keycode = ('which' in e) ? e.which : e.keyCode;
      if (keycode ===  13) { // enter key
        e.preventDefault();
        conn.send({ msg: inputline.value });
        inputline.value = "";
      }
    });
    openConnection();
  }

});
