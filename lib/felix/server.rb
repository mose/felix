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

            #ap handshake
          end

          ws.onclose do
            puts "Connection closed"
          end

          ws.onmessage do |msg|
            message = Message.new(msg)
            #ap Parser.write(msg)
            ap message
            ws.send message.output
          end

          ws.onerror do |error|
            if error.kind_of?(EM::WebSocket::WebSocketError)
              puts "Error: #{error}"
            else
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