require 'em-websocket'

module Felix
  class Server
    def initialize
    end
    def start
      EM.run {
        EM::WebSocket.run(:host => Config.host, :port => Config.port) do |ws|
          ws.onopen do |handshake|
            puts "WebSocket connection open"
          end
          ws.onclose { puts "Connection closed" }
          ws.onmessage do |msg|
            puts "Recieved message: #{msg}"
            ws.send "Pong: #{msg}"
          end
        end
      }
    end
  end
end