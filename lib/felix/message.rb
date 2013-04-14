require "felix/parser"

module Felix
  class Message

    attr_reader :author, :body

    def initialize(content)
      payload = Parser.read(content)
      @author = payload[:who]
      @body = payload[:msg]
    end

    def output
      Parser.write(self)
    end

  end
end