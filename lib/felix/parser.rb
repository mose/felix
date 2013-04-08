require 'yajl'

module Felix
  module Parser
    extend self

    def read(payload)
      Yajl::Parser.parse(payload, symbolize_keys: true)
    rescue Exception => e
      { ok: false, message: e }
    end

    def write(object)
      Yajl::Encoder.encode(object)
    end

  end
end