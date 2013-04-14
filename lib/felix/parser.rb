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
      encoder.encode(object)
    end

    def encoder
      @@_encoder ||= Yajl::Encoder.new
    end

  end
end