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
          
          ws.onclose do 
            puts "Connection closed" 
          end
          
          ws.onmessage do |msg|
            puts "Recieved message: #{msg}"
            ws.send "Pong: #{msg}"
          end
          
          ws.onerror do |error|
            if error.kind_of?(EM::WebSocket::WebSocketError)
              puts "Error: #{error}"
            end
          end

        end
      }
    end
    
    def stop

    end

  end
end