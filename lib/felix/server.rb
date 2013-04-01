require 'em-websocket'

module Felix
  class Server
    def initialize
    end
    def run
      EM.run {
        EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|
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