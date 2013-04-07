require 'em-websocket'
require 'awesome_print'

module Felix
  class Server
    
    def initialize
      @handler = Felix::Handler.new
    end
    
    def start
      EM.run {
        
        EM::WebSocket.run(:host => Config.host, :port => Config.port) do |ws|

          ws.onopen do |handshake|
            puts "WebSocket connection open"
            ap handshake
          end
          
          ws.onclose do 
            puts "Connection closed" 
          end
          
          ws.onmessage do |msg|
            message = Message.new(msg)
            ws.send message.output
            puts "Recieved message: #{message.body}"
            ap ws
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