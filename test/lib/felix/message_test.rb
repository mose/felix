require_relative '../../test_helper'

require 'felix/message'

describe Felix::Message do

  it 'can parse a message' do
    Felix::Parser.stubs(:read).
      returns({ who: 'someone', msg: 'another'})
    msg = '{"who":"someone","msg":"another"}'
    message = Felix::Message.new(msg)
    message.author.must_equal 'someone'
    message.body.must_equal 'another'
  end

  it 'can dump a message to json' do
    Felix::Parser.stubs(:write).
      returns('{"author":"someone","body":"another"}')
    msg = '{"who":"someone","msg":"another"}'
    message = Felix::Message.new(msg)
    message.output.must_equal '{"author":"someone","body":"another"}'
  end

end